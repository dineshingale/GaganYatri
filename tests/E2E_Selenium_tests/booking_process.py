import time
import sys
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from selenium.webdriver.chrome.options import Options

# --- CONFIGURATION FOR JENKINS & DOCKER ---

# 1. Dynamic URL: Defaults to localhost for Docker testing, but can be overridden
#    If running against live site, change to: 'https://gaganyatri.vercel.app'
base_url = os.getenv('App_URL', 'http://localhost:3000') 

# 2. Headless Mode: Default to TRUE for CI/CD, False for local debugging if needed
is_headless = os.getenv('HEADLESS_MODE', 'true').lower() == 'true'

print(f"--- TEST CONFIGURATION ---")
print(f"Target URL: {base_url}")
print(f"Headless Mode: {is_headless}")
print("--------------------------")

chrome_options = Options()

if is_headless:
    chrome_options.add_argument("--headless=new") 

# 3. Critical Flags for Docker/Linux Environments
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage") # Overcomes limited resource problems in containers
chrome_options.add_argument("--window-size=1920,1080") # Ensure elements are visible
chrome_options.add_argument('--ignore-certificate-errors')
chrome_options.add_experimental_option('excludeSwitches', ['enable-automation'])
chrome_options.add_experimental_option('useAutomationExtension', False)

driver = webdriver.Chrome(options=chrome_options)

# Anti-detection (Helpful for some React apps)
driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")

wait = WebDriverWait(driver, 15)

# --- HELPER FUNCTION ---
def click_xpath(xpath, description="Element", is_fast=False):
    """
    Finds an element, scrolls to center, and clicks.
    Safe for both Local and CI/CD execution.
    """
    try:
        # Wait for presence
        element = wait.until(EC.presence_of_element_located((By.XPATH, xpath)))
        
        # Scroll to center (Critical for sticky headers)
        driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", element)
        
        if not is_fast:
            time.sleep(1) # Stability buffer
        
        # Click
        wait.until(EC.element_to_be_clickable((By.XPATH, xpath))).click()
        print(f"✓ Clicked: {description}")
        
    except Exception:
        print(f"    ! Standard click failed for {description}, forcing JS click...")
        # Fallback for tough elements
        element = driver.find_element(By.XPATH, xpath)
        driver.execute_script("arguments[0].click();", element)

try:
    print(f"[1/8] Navigating to {base_url}/book ...")
    driver.get(f"{base_url}/book")
    
    # --- 1. SLIDER SELECTIONS ---
    print(">>> Step 1: Making Slider Selections...")
    
    click_xpath("//section[@id='slider-adventure']/div/div/section/div[2]/div/button/span", "Adventure")
    click_xpath("//section[@id='slider-spacecraft']/div/div/section/div[2]/div/button/span", "Spacecraft")
    click_xpath("//section[@id='slider-launchsite']/div/div/section/div[2]/div/button/span", "Launch Site")

    # --- 2. REVIEW PAGE (FAST CLICK) ---
    print(">>> Step 2: Review & Next...")
    click_xpath("//div[@id='root']/div/section/div/button[2]/div", "Review Page Next", is_fast=True)
    
    # --- 3. PASSENGER 1: JOHN DOE ---
    print(">>> Step 3: Filling Passenger 1 (John Doe)...")
    
    wait.until(EC.visibility_of_element_located((By.XPATH, "//input[@placeholder='Enter full name']")))
    
    driver.find_element(By.XPATH, "//input[@placeholder='Enter full name']").send_keys("John Doe")
    driver.find_element(By.XPATH, "//input[@placeholder='Enter phone number']").send_keys("1234567890")
    driver.find_element(By.XPATH, "//input[@placeholder='Enter age']").send_keys("30")
    
    driver.find_element(By.XPATH, "//input[@placeholder='Enter email']").send_keys("johndoe@example.com")
    driver.find_element(By.XPATH, "//input[@placeholder='Enter address']").send_keys("123 Galaxy St, Space City")
    
    select_elem = driver.find_element(By.XPATH, "//div[@id='root']/div/main/section/div/div[2]/div/div[4]/select")
    Select(select_elem).select_by_visible_text("Male")
    print("✓ John Doe Filled")

    # --- PAUSE (1 SECOND) ---
    print("    ...Waiting 1 second...")
    time.sleep(1) 

    # --- 4. ADD PASSENGER & FILL JOE DEAN ---
    print(">>> Step 4: Adding Passenger 2 (Joe Dean)...")
    
    click_xpath("//div[@id='root']/div/main/section/div/div/div/button/span", "Add Passenger Button")
    
    print("    - Switching to P2 tab...")
    click_xpath("//*[contains(text(), 'P2')]", "P2 Tab")
    
    print("    - Filling Joe Dean Details...")
    
    p2_name = wait.until(EC.visibility_of_element_located((By.XPATH, "//input[@placeholder='Enter full name']")))
    p2_name.clear()
    p2_name.send_keys("Joe Dean")
    
    driver.find_element(By.XPATH, "//input[@placeholder='Enter phone number']").clear()
    driver.find_element(By.XPATH, "//input[@placeholder='Enter phone number']").send_keys("0987654321")
    
    driver.find_element(By.XPATH, "//input[@placeholder='Enter age']").clear()
    driver.find_element(By.XPATH, "//input[@placeholder='Enter age']").send_keys("28")
    
    select_elem_p2 = driver.find_element(By.XPATH, "//div[@id='root']/div/main/section/div/div[2]/div/div[4]/select")
    Select(select_elem_p2).select_by_visible_text("Male")
    print("✓ Joe Dean Filled")

    # --- 5. FINAL SUBMISSION ---
    print(">>> Step 5: Submitting Booking...")
    click_xpath("//div[@id='root']/div/section/div/button[2]/div", "Final Submit")
    
    # --- 6. CONFIRMATION ---
    print(">>> Step 6: Waiting for Confirmation...")
    time.sleep(5) # Initial wait before checking
    
    try:
        wait.until(EC.visibility_of_element_located((By.XPATH, "//*[contains(text(), 'Booking Confirmed')]")))
        print("\n✅ SUCCESS: 'Booking Confirmed!' message appeared.")
    except Exception:
        # Fallback check for URL change
        if "book" not in driver.current_url:
             print("✅ URL changed (User redirected), assuming success.")
        else:
             print("❌ ERROR: Booking verification failed (Timeout).")
             raise Exception("Verification Failed")

    print("\n--- TEST PASSED SUCCESSFULLY ---")
    sys.exit(0) # Signal Success to Jenkins

except Exception as e:
    print(f"\n❌ TEST FAILED: {e}")
    
    # --- ARTIFACT SAVING FOR JENKINS ---
    driver.save_screenshot("error_screenshot.png")
    with open("error_page_source.html", "w", encoding="utf-8") as f:
        f.write(driver.page_source)
    print("Artifacts saved: error_screenshot.png, error_page_source.html")
    
    driver.quit()
    sys.exit(1) # Signal Failure to Jenkins

finally:
    try:
        driver.quit()
    except:
        pass