import time


class Test_Login_User(object):
    def __init__(self, driver):
        self.driver = driver

    def login_users(self, user, user_password):
        self.driver.maximize_window()
        self.driver.implicitly_wait(10)
        login_page = self.driver.find_element("link text", "Login")
        login_page.click()

        username = self.driver.find_element("name", "loginId")
        username.send_keys(user)

        password = self.driver.find_element("name", "password")
        password.send_keys(user_password)

        password.submit()

        if user == "ADM20002":
            logged_in_user_logo = self.driver.find_element("link text", "Admin Portal")
        elif user == "DIR10001":
            logged_in_user_logo = self.driver.find_element("link text", "Director Portal")
        else:
            logged_in_user_logo = self.driver.find_element("link text", "Employee Portal")
        time.sleep(3)
        return logged_in_user_logo.text
