const login = require("../controllers/login.js");

const loginResolver = {
  Query: {
    loginUser: login.loginUser,
  },
};

module.exports = loginResolver;
