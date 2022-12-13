import unittest
from selenium import webdriver
from Test_SeleniumTestClasses import Test_Login_User
from Test_SeleniumTestClasses import Test_Logout_User


class BetaPortal(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome(executable_path="C:/BrowserDrivers/chromedriver.exe")
        self.driver.get("http://localhost:3000/")

    def test_1_login_employee(self):
        login = Test_Login_User.Test_Login_User(self.driver)
        self.assertEqual(login.login_users("EMP40001", "TE12345"), "Employee Portal")

    def test_2_login_director(self):
        login = Test_Login_User.Test_Login_User(self.driver)
        self.assertEqual(login.login_users("DIR10001", "AK12345"), "Director Portal")

    def test_3_login_admin(self):
        login = Test_Login_User.Test_Login_User(self.driver)
        self.assertEqual(login.login_users("ADM20002", "TA12345"), "Admin Portal")

    def test_4_logout_user(self):
        login = Test_Login_User.Test_Login_User(self.driver)
        login.login_users("ADM20002", "TA12345")
        logout = Test_Logout_User.Test_Logout_User(self.driver)
        self.assertEqual(logout.logout_user(), "http://localhost:3000/login")

    def tearDown(self):
        self.driver.close()
        self.driver.quit()


if __name__ == "__main__":
    unittest.main()
