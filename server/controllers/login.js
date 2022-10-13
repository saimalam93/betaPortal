const Employee = require("../models/employee.js");
const jwt = require("jsonwebtoken");

async function loginUser(_, { userData }) {
  const user = await Employee.findOne({ loginID: userData.loginID });
  console.log(user)
  const decoded = jwt.verify(user.token, process.env.ACCESS_TOKEN_SECRET);
  if (userData.password !== decoded.password) {
    throw new Error("Wrong Password!");
  }
  return user;
}

module.exports = {
  loginUser,
};
