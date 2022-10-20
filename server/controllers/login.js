const Employee = require("../models/employee.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function loginUser(_, { userData }) {
  const user = await Employee.findOne({ loginID: userData.loginID });
  if (!user) {
    throw new Error("User Does Not Exist");
  }
  const decodedJWT = jwt.verify(user.token, user.password);
  if (decodedJWT) {
    const isMatch = await bcrypt.compare(
      userData.password,
      decodedJWT.password
    );
    if (!isMatch) {
      throw new Error("Incorrect Password");
    }
    return user;
  }
}

module.exports = {
  loginUser,
};
