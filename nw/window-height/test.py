
import os
import sys

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

chrome_options = Options()
chrome_options.add_argument("nwapp=" + os.path.dirname(os.path.abspath(__file__)))

testdir = os.path.dirname(os.path.abspath(__file__))
os.chdir(testdir)

os.environ['CHROMEDRIVER'] = "../../node_modules/nw/nwjs/chromedriver"

driver = webdriver.Chrome(executable_path=os.environ['CHROMEDRIVER'], options=chrome_options)
try:
    height_element = driver.find_element(By.ID, 'nw-window-height')
    height = height_element.get_attribute('innerHTML')
    assert("100" in height)
except:
    print("failed")
finally:
    print("passed")
    driver.quit()