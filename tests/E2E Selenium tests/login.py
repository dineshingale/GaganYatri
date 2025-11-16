import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import TimeoutException

# --- Setup ---
# Make sure you have msedgedriver installed and in your PATH
# or specify the path directly:
# service = webdriver.EdgeService(executable_path='/path/to/msedgedriver')
# driver = webdriver.Edge(service=service)

driver = webdriver.Edge()
driver.maximize_window()    
    
# Set up a 20-second explicit wait
wait = WebDriverWait(driver, 20)

# Set up ActionChains for scrolling
actions = ActionChains(driver)

print("Starting the Gaganyatri booking test...")

try:
    # 1. Open https://gaganyatri.vercel.app/book-now
    print("1. Opening the website...")
    driver.get("https://gaganyatri.vercel.app/book-now")

    # 2. wait until "view from 100km above" element comes in viewport
    print("2. Waiting for 'view from 100km above'...")
    wait.until(EC.visibility_of_element_located(
        (By.XPATH, "//h1[contains(text(), 'view from 100km above')]")
    ))

    # 3. Scroll until "Trip to mars" comes in viewport
    print("3. Scrolling to 'Trip to mars'...")
    mars_trip_element = wait.until(EC.presence_of_element_located(
        (By.XPATH, "//h1[text()='Trip to mars']")
    ))
    actions.move_to_element(mars_trip_element).perform()
    wait.until(EC.visibility_of(mars_trip_element)) # Ensure it's visible after scroll

    # 4. click on "Trip to mars" which is h1 heading
    print("4. Clicking 'Trip to mars'...")
    mars_click_element = wait.until(EC.element_to_be_clickable(
        (By.XPATH, "//h1[text()='Trip to mars']")
    ))
    mars_click_element.click()

    # 5. wait until "starship" element comes in viewport
    print("5. Waiting for 'starship'...")
    wait.until(EC.visibility_of_element_located(
        (By.XPATH, "//h1[text()='starship']")
    ))

    # 6. Scroll until "falcon" comes in viewport
    print("6. Scrolling to 'falcon'...")
    falcon_element = wait.until(EC.presence_of_element_located(
        (By.XPATH, "//h1[text()='falcon']")
    ))
    actions.move_to_element(falcon_element).perform()
    wait.until(EC.visibility_of(falcon_element))

    # 7. click on "falcon" which is h1 heading
    print("7. Clicking 'falcon'...")
    falcon_click_element = wait.until(EC.element_to_be_clickable(
        (By.XPATH, "//h1[text()='falcon']")
    ))
    falcon_click_element.click()

    # 8. wait until "Chennai, India" element comes in viewport
    print("8. Waiting for 'Chennai, India'...")
    wait.until(EC.visibility_of_element_located(
        (By.XPATH, "//h1[text()='Chennai, India']")
    ))

    # 9. Scroll until "Tokyo, Japan" comes in viewport
    print("9. Scrolling to 'Tokyo, Japan'...")
    tokyo_element = wait.until(EC.presence_of_element_located(
        (By.XPATH, "//h1[text()='Tokyo, Japan']")
    ))
    actions.move_to_element(tokyo_element).perform()
    wait.until(EC.visibility_of(tokyo_element))

    # 10. click on "Tokyo, Japan" which is h1 heading
    print("10. Clicking 'Tokyo, Japan'...")
    tokyo_click_element = wait.until(EC.element_to_be_clickable(
        (By.XPATH, "//h1[text()='Tokyo, Japan']")
    ))
    tokyo_click_element.click()

    # 11. wait until "Trip to mars" element comes in viewport (on summary page)
    print("11. Waiting for summary page ('Trip to mars')...")
    # On this page, "Trip to mars" is a <p> tag
    wait.until(EC.visibility_of_element_located(
        (By.XPATH, "//p[text()='Trip to mars']")
    ))

    # 12. click on next
    print("12. Clicking 'Next'...")
    wait.until(EC.element_to_be_clickable(
        (By.XPATH, "//button[text()='Next']")
    )).click()

    # 13. wait until "Passenger details" element comes in viewport
    print("13. Waiting for 'Passenger details' form...")
    wait.until(EC.visibility_of_element_located(
        (By.XPATH, "//h1[text()='Passenger details']")
    ))

    # 14. fill the name
    print("14. Filling name...")
    wait.until(EC.visibility_of_element_located(
        (By.XPATH, "//input[@placeholder='Name']")
    )).send_keys("Gaganyatri User")

    # 15. fill the Phone number
    print("15. Filling phone number...")
    driver.find_element(
        By.XPATH, "//input[@placeholder='Phone number']"
    ).send_keys("1234567890")

    # 16. fill the Age
    print("16. Filling age...")
    driver.find_element(
        By.XPATH, "//input[@placeholder='Age']"
    ).send_keys("30")

    # 17. select male as gender
    print("17. Selecting 'Male' as gender...")
    # Clicking the label is often more reliable than the radio button itself
    wait.until(EC.element_to_be_clickable(
        (By.XPATH, "//label[@for='male']")
    )).click()

    # 18. check the checkbox after "set them as your leader"
    print("18. Checking 'set them as your leader'...")
    # Find the label by its text and click it
    leader_label = wait.until(EC.element_to_be_clickable(
        (By.XPATH, "//label[contains(text(), 'set them as your leader')]")
    ))
    leader_label.click()

    # 19. fill email
    print("19. Filling email...")
    driver.find_element(
        By.XPATH, "//input[@placeholder='Email']"
    ).send_keys("test@example.com")

    # 20. fill address
    print("20. Filling address...")
    driver.find_element(
        By.XPATH, "//textarea[@placeholder='Address']"
    ).send_keys("123 Space Station, Mars")

    # 21. click on "submit all passengers"
    print("21. Clicking 'submit all passengers'...")
    wait.until(EC.element_to_be_clickable(
        (By.XPATH, "//button[text()='submit all passengers']")
    )).click()

    print("\nTest successfully completed! Waiting 5 seconds before closing.")
    time.sleep(5) # A brief pause to see the final result

except TimeoutException:
    print("\nTest Failed: An element was not found within the 20-second timeout.")
except Exception as e:
    print(f"\nTest Failed: An unexpected error occurred: {e}")

finally:
    # 22. close the browser
    print("22. Closing the browser.")
    driver.quit()

