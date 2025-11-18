from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
# NOTE: If your Jenkins server is Linux, it is usually safer to use Chrome/Chromium.
# If you stick with Edge, ensure 'msedgedriver' is installed on the Jenkins machine.
from selenium.webdriver.edge.options import Options 
import time


edge_options = Options()

# --- NEW: CRITICAL FOR JENKINS ---
# These three lines make the browser invisible so it works on a server
edge_options.add_argument("--headless=new") 
edge_options.add_argument("--no-sandbox")
edge_options.add_argument("--disable-dev-shm-usage")
# ---------------------------------

edge_options.add_argument('--ignore-certificate-errors')
edge_options.add_experimental_option('excludeSwitches', ['enable-automation'])
edge_options.add_experimental_option('useAutomationExtension', False)


# Initialize the Edge WebDriver with the specified options
# Make sure you have msedgedriver installed and in your PATH
# or specify the path to it.
driver = webdriver.Edge(options=edge_options)

# --- Hide the "navigator.webdriver" flag from the website ---
driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")


try:
    # 1. Open the website
    print("Opening gaganyatri.vercel.app/book-now...")
    driver.get('https://gaganyatri.vercel.app/book-now')
    
    # Give the page a moment for initial scripts to load
    time.sleep(2)

    # --- Wait for a stable element that appears before the trip options ---
    wait = WebDriverWait(driver, 30)
    wait.until(EC.presence_of_element_located((By.XPATH, "//*[text()='Select Adventure']")))
    print("Website opened and main content area has loaded successfully.")

    # 2. Wait for the site to load, scroll to, and click "Trip to Mars"
    print("Waiting for 'Trip to Mars' button...")
    trip_to_mars_element = driver.find_element(By.XPATH, "//*[text()='Trip to Mars']")
    
    # Use JavaScript to scroll the element into view
    driver.execute_script("arguments[0].scrollIntoView({block: 'center', inline: 'center'});", trip_to_mars_element)
    print("Scrolled to 'Trip to Mars'.")
    
    # Add a brief pause for any on-scroll animations to complete
    time.sleep(1)
    
    # 3. Click on the PARENT of "Trip to Mars" using JavaScript
    # This is more robust as it doesn't require finding a second element.
    driver.execute_script("arguments[0].parentElement.click();", trip_to_mars_element)
    print("Clicked 'Trip to Mars'.")

    # 4. Wait for the next page and "Falcon"
    print("Waiting for 'Falcon' button...")
    falcon_element = wait.until(EC.presence_of_element_located((By.XPATH, "//*[text()='Falcon']")))
    
    # 5. Click on the PARENT of "Falcon" using JavaScript
    driver.execute_script("arguments[0].parentElement.click();", falcon_element)
    print("Clicked 'Falcon'.")

    # 6. Wait for the next page and "Chennai, India"
    print("Waiting for 'Chennai, India' button...")
    chennai_element = wait.until(EC.presence_of_element_located((By.XPATH, "//*[text()='Chennai, India']")))

    # 7. Click on the PARENT of "Chennai, India" using JavaScript
    driver.execute_script("arguments[0].parentElement.click();", chennai_element)
    print("Clicked 'Chennai, India'.")
   
    wait.until(EC.presence_of_element_located((By.XPATH, "//*[text()='Trip to Mars']")))

    # 8. Click on "Next" (wait for clickable to avoid wrong/disabled button)
    next_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[normalize-space()='Next' and not(@disabled)]")))
    next_button.click()
    print("Clicked the third 'Next' button.")

    # 9. Fill the passenger form
    print("Filling passenger form...")
    wait.until(EC.visibility_of_element_located((By.XPATH, "//*[normalize-space()='Passenger Details']")))
    print("Passenger form is visible.")

    driver.find_element(By.XPATH, "//input[@placeholder='Enter full name']").send_keys("John Doe")
    driver.find_element(By.XPATH, "//input[@placeholder='Enter phone number']").send_keys("1234567890")
    driver.find_element(By.XPATH, "//input[@placeholder='Enter age']").send_keys("30")
    # safer radio selector
    driver.find_element(By.XPATH, "//label[contains(normalize-space(.), 'Male')]/input[@type='radio']").click()

    checkbox_xpath = "//label[contains(normalize-space(.), 'Set them as your leader')]/input[@type='checkbox']"
    leader_checkbox = wait.until(EC.element_to_be_clickable((By.XPATH, checkbox_xpath)))
    leader_checkbox.click()
    print("Checked 'Set them as your leader'.")

    # Wait for the input elements (target the input placeholders directly)
    print("Waiting for leader email field to appear...")
    leader_email_input = wait.until(EC.visibility_of_element_located((By.XPATH, "//input[@placeholder=\"Enter leader's email\"]")))
    leader_email_input.send_keys("dineshingale2003@gmail.com")

    print("Waiting for leader address field to appear...")
    leader_address_input = wait.until(EC.visibility_of_element_located((By.XPATH, "//input[@placeholder=\"Enter leader's address\"]")))
    leader_address_input.send_keys("123 Space Lane, Cosmos City")

    print("Filled in all passenger details.")

    # Add a second passenger
    print("Adding a new passenger...")
    add_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(normalize-space(), 'Add Passenger')]")))
    add_btn.click()
    print("Clicked 'Add Passenger'.")

    # wait for the second passenger form inputs to appear (use the last occurrence)
    wait.until(EC.visibility_of_element_located((By.XPATH, "(//input[@placeholder='Enter full name'])[last()]")))

    # Fill second passenger (use the last matching inputs)
    driver.find_element(By.XPATH, "(//input[@placeholder='Enter full name'])[last()]").send_keys("Jane Smith")
    driver.find_element(By.XPATH, "(//input[@placeholder='Enter phone number'])[last()]").send_keys("0987654321")
    driver.find_element(By.XPATH, "(//input[@placeholder='Enter age'])[last()]").send_keys("28")

    # Select gender for second passenger (click the last 'Female' radio if present)
    try:
        female_radio_last = wait.until(EC.element_to_be_clickable((By.XPATH, "(//label[contains(normalize-space(.), 'Female')]/input[@type='radio'])[last()]")))
        female_radio_last.click()
    except Exception:
        # fallback: try selecting by label text directly
        try:
            driver.find_element(By.XPATH, "(//label[contains(normalize-space(.), 'Female')])[last()]/input").click()
        except Exception:
            print("Warning: Could not select 'Female' radio for second passenger.")

    print("Second passenger details filled.")

    # 10. Click on "Submit All Passengers"
    submit_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[normalize-space()='Submit All Passengers']")))
    submit_btn.click()
    print("Clicked 'Submit All Passengers'.")


    print("\nAutomation script finished successfully!")

    # Wait for a few seconds to see the result before the browser closes
    # time.sleep(10)

finally:
    # Close the browser
    driver.quit()
    print("Browser closed.")
