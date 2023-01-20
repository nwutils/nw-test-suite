import time
import os
import subprocess
import sys

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common import utils

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

chrome_options = Options()
chrome_options.add_argument("nwapp=" + os.path.dirname(os.path.abspath(__file__)))

capabilities = {"pageLoadStrategy": "none"}

testdir = os.path.dirname(os.path.abspath(__file__))
os.chdir(testdir)

driver = webdriver.Chrome(executable_path=os.environ['CHROMEDRIVER'], chrome_options=chrome_options, desired_capabilities = capabilities)
try:
    wait_switch_window_name(driver, 'local')
    print(driver.current_url)
    result = wait_for_element_id(driver, 'res')
    print('result=' + result)
    assert("object" in result)
    wait_switch_window_name(driver, 'remote')
    result = wait_for_element_id(driver, 'res')
    print(result)
    assert("ENABLED" in result)
finally:
    driver.quit()