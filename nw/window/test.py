from unittest import TestCase
import os
import sys

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

class TestWindow(TestCase):

    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument("nwapp=" + os.path.dirname(os.path.abspath(__file__)))

        testdir = os.path.dirname(os.path.abspath(__file__))
        os.chdir(testdir)

        os.environ['CHROMEDRIVER'] = "../../node_modules/nw/nwjs/chromedriver"

        self.driver = webdriver.Chrome(executable_path=os.environ['CHROMEDRIVER'], options=chrome_options)

    def test_window_height(self):
        try:
            height_element = self.driver.find_element(By.ID, 'nw-window-height')
            height = height_element.get_attribute('innerHTML')
            assert("100" in height)
        except:
            assert False

    def test_window_width(self):
        try:
            width_element = self.driver.find_element(By.ID, 'nw-window-width')
            width = width_element.get_attribute('innerHTML')
            assert("100" in width)
        except:
            assert False

    def tearDown(self):
        self.driver.quit()
