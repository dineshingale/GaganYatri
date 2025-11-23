from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException
import time
import sys
import os

# --- CONFIGURATION ---
# UPDATED FOR SELF-CONTAINED DOCKER
# Since Node and Python run in the SAME container, we use 'localhost'.
base_url = 'http://localhost:3000'

# Get Headless mode from Env Var (Default to True for safety in CI/CD)
is_headless = os.getenv('HEADLESS_MODE', 'true').lower() == 'true'

print(f"Starting Test on: {base_url}")
print(f"Headless Mode: {is_headless}")

chrome_options = Options()

if is_headless:
    chrome_options.add_argument("--headless=new") 

# --- CRITICAL FOR JENKINS & DOCKER ---
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--window-size=1920,1080")
chrome_options.add_argument('--ignore-certificate-errors')
chrome_options.add_experimental_option('excludeSwitches', ['enable-automation'])
chrome_options.add_experimental_option('useAutomationExtension', False)

driver = webdriver.Chrome(options=chrome_options)

# Anti-detection
driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")

try:
    # 1. Open the website using the dynamic URL
    full_url = f"{base_url}/book-now"
    print(f"Navigating to {full_url}...")
    driver.get(full_url)
    
    time.sleep(2) # Allow initial render

    # --- Wait for a stable element that appears before the trip options ---
    wait = WebDriverWait(driver, 10)
    
    # --- CHECK IF APP IS RUNNING ---
    try:
        wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
    except:
        print("CRITICAL: Could not load the page body. Is the localhost server running?")
        raise

    wait.until(EC.presence_of_element_located((By.XPATH, "//*[text()='Select Adventure']")))
    print("Website opened and main content area has loaded successfully.")

    # 2. Trip to Mars Logic
    print("Waiting for 'Trip to Mars' button...")
    trip_to_mars_element = driver.find_element(By.XPATH, "//*[text()='Trip to Mars']")
    driver.execute_script("arguments[0].scrollIntoView({block: 'center', inline: 'center'});", trip_to_mars_element)
    time.sleep(1)
    driver.execute_script("arguments[0].parentElement.click();", trip_to_mars_element)
    print("Clicked 'Trip to Mars'.")

    # 3. Falcon Logic
    print("Waiting for 'Falcon' button...")
    falcon_element = wait.until(EC.presence_of_element_located((By.XPATH, "//*[text()='Falcon']")))
    driver.execute_script("arguments[0].parentElement.click();", falcon_element)
    print("Clicked 'Falcon'.")

    # 4. Chennai Logic
    print("Waiting for 'Chennai, India' button...")
    chennai_element = wait.until(EC.presence_of_element_located((By.XPATH, "//*[text()='Chennai, India']")))
    driver.execute_script("arguments[0].parentElement.click();", chennai_element)
    print("Clicked 'Chennai, India'.")
   
    wait.until(EC.presence_of_element_located((By.XPATH, "//*[text()='Trip to Mars']")))

    # 5. Next Button
    next_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[normalize-space()='Next' and not(@disabled)]")))
    next_button.click()
    print("Clicked the third 'Next' button.")

    # 6. Fill Passenger 1
    print("Filling passenger form...")
    wait.until(EC.visibility_of_element_located((By.XPATH, "//*[normalize-space()='Passenger Details']")))
    
    driver.find_element(By.XPATH, "//input[@placeholder='Enter full name']").send_keys("John Doe")
    driver.find_element(By.XPATH, "//input[@placeholder='Enter phone number']").send_keys("1234567890")
    driver.find_element(By.XPATH, "//input[@placeholder='Enter age']").send_keys("30")
    driver.find_element(By.XPATH, "//label[contains(normalize-space(.), 'Male')]/input[@type='radio']").click()

    # Leader Checkbox
    checkbox_xpath = "//label[contains(normalize-space(.), 'Set them as your leader')]/input[@type='checkbox']"
    leader_checkbox = wait.until(EC.element_to_be_clickable((By.XPATH, checkbox_xpath)))
    leader_checkbox.click()
    print("Checked 'Set them as your leader'.")

    # Leader Details
    leader_email_input = wait.until(EC.visibility_of_element_located((By.XPATH, "//input[@placeholder=\"Enter leader's email\"]")))
    leader_email_input.send_keys("dineshingale2003@gmail.com")
    
    leader_address_input = wait.until(EC.visibility_of_element_located((By.XPATH, "//input[@placeholder=\"Enter leader's address\"]")))
    leader_address_input.send_keys("123 Space Lane, Cosmos City")

    # 7. Add Passenger 2
    print("Adding a new passenger...")
    add_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(normalize-space(), 'Add Passenger')]")))
    add_btn.click()
    
    wait.until(EC.visibility_of_element_located((By.XPATH, "(//input[@placeholder='Enter full name'])[last()]")))

    driver.find_element(By.XPATH, "(//input[@placeholder='Enter full name'])[last()]").send_keys("Jane Smith")
    driver.find_element(By.XPATH, "(//input[@placeholder='Enter phone number'])[last()]").send_keys("0987654321")
    driver.find_element(By.XPATH, "(//input[@placeholder='Enter age'])[last()]").send_keys("28")

    try:
        female_radio_last = wait.until(EC.element_to_be_clickable((By.XPATH, "(//label[contains(normalize-space(.), 'Female')]/input[@type='radio'])[last()]")))
        female_radio_last.click()
    except Exception:
        try:
            driver.find_element(By.XPATH, "(//label[contains(normalize-space(.), 'Female')])[last()]/input").click()
        except Exception:
            print("Warning: Could not select 'Female' radio for second passenger.")

    # 8. Submit
    submit_button_xpath = "//button[normalize-space()='Submit All Passengers']"
    submit_btn = wait.until(EC.element_to_be_clickable((By.XPATH, submit_button_xpath)))
    driver.execute_script("arguments[0].click();", submit_btn)
    print("Clicked 'Submit All Passengers'.")

    # 9. Verify Success
    print("Waiting for booking confirmation...")
    success_message_xpath = "//*[contains(text(), 'Booking Confirmation')]"
    wait.until(EC.visibility_of_element_located((By.XPATH, success_message_xpath)))
    
    print("\nSUCCESS: Booking confirmation message appeared!")
    sys.exit(0) # Explicit Success

except Exception as e:
    print("\nSCRIPT FAILED: An error occurred.")
    print(f"Error details: {e}")
    
    # Save artifacts for Jenkins
    driver.save_screenshot("error_screenshot.png")
    with open("error_page_source.html", "w", encoding="utf-8") as f:
        f.write(driver.page_source)
        
    print("Artifacts saved: error_screenshot.png, error_page_source.html")
    driver.quit()
    sys.exit(1) # Explicit Failure

finally:
    try:
        driver.quit()
    except:
        pass