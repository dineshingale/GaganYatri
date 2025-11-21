from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException # Import TimeoutException
import time


chrome_options = Options()

# --- For Local Debugging: Comment this line out to see the browser ---
# RE-ENABLE THIS LINE TO RUN HEADLESSLY
chrome_options.add_argument("--headless=new") 

# --- CRITICAL FOR JENKINS & ROBUSTNESS ---
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
# ** NEW: Set a consistent window size to avoid responsive layout issues **
chrome_options.add_argument("--window-size=1920,1080")
# ---------------------------------

chrome_options.add_argument('--ignore-certificate-errors')
chrome_options.add_experimental_option('excludeSwitches', ['enable-automation'])
chrome_options.add_experimental_option('useAutomationExtension', False)


# Initialize the Chrome WebDriver with the specified options
# Make sure you have chromedriver installed and in your PATH,
# or that your Docker container has it.
driver = webdriver.Chrome(options=chrome_options)

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
    submit_button_xpath = "//button[normalize-space()='Submit All Passengers']"
    print("Waiting for the 'Submit All Passengers' button to be clickable...")
    
    # ** IMPROVEMENT: More robust wait and click **
    submit_btn = wait.until(EC.element_to_be_clickable((By.XPATH, submit_button_xpath)))
    
    # Use a JavaScript click, which can be more reliable in headless mode
    driver.execute_script("arguments[0].click();", submit_btn)
    print("Clicked 'Submit All Passengers'.")

    # ** NEW: VERIFY THE SUBMISSION WAS SUCCESSFUL **
    # After clicking submit, you should wait for evidence of success.
    # This could be a "Thank You" message, a URL change, or a new element appearing.
    # Let's assume a success message with the text "Booking confirmed!" appears.
    print("Waiting for booking confirmation...")
    success_message_xpath = "//*[contains(text(), 'Booking Confirmation')]"
    wait.until(EC.visibility_of_element_located((By.XPATH, success_message_xpath)))
    
    print("\n✅ SUCCESS: Booking confirmation message appeared!")
    print("Automation script finished successfully!")


except TimeoutException as e:
    # ** NEW: DEBUGGING ON FAILURE **
    # If any of the `wait.until` commands fail, this block will execute.
    print("\n❌ SCRIPT FAILED: A timeout occurred.")
    print(f"Error details: {e}")
    
    # Save a screenshot to see what the browser saw
    screenshot_path = "headless_error.png"
    driver.save_screenshot(screenshot_path)
    print(f"Screenshot saved to: {screenshot_path}")
    
    # Save the page source to inspect the HTML
    html_path = "headless_error.html"
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(driver.page_source)
    print(f"Page source saved to: {html_path}")


finally:
    # Close the browser
    driver.quit()
    print("Browser closed.")
