const dateScalar = require("../controllers/graphql_type.js");
const requests = require("../controllers/requests.js");

const requestResolvers = {
  Date: dateScalar,
  Query: {
    viewAllRequests: requests.viewAllRequests,
    viewSingleRequest: requests.viewSingleRequest,
  },
  Mutation: {
    createRequest: requests.createRequest,
    updateRequest: requests.updateRequest,
    deleteRequest: requests.deleteRequest,
  },
};

module.exports = requestResolvers;
