import time


class Test_Logout_User(object):
    def __init__(self, driver):
        self.driver = driver

    def logout_user(self):
        self.driver.maximize_window()
        self.driver.implicitly_wait(10)
        logout = self.driver.find_element("xpath", "/html/body/div/div/header/nav/div/header/div/div[2]/a[3]")
        logout.click()
        time.sleep(3)
        return self.driver.current_url
