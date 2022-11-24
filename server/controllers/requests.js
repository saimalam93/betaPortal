require("dotenv").config();
const Request = require("../models/requests.js");

async function viewAllRequests(_, filters) {
  let requests = Request.find().populate("employee");
  if (filters.request_status) {
    requests = requests.or({ request_status: filters.request_status });
  } else if (filters.request_subject) {
    requests = requests.or({ request_subject: filters.request_subject });
  }
  return await requests;
}

async function viewSingleRequest(_, { _id }) {
  return await Request.findOne({ _id: _id }).populate("employee");
}

async function createRequest(_, { request }) {
  // console.log(request);
  return await Request.create(request);
}

async function updateRequest(_, { request }) {
  const result = await Request.findOneAndUpdate(
    { _id: request._id },
    { $set: request }
  );
  if (result) {
    return true;
  }
  return false;
}

async function deleteRequest(_, { _id }) {
  console.log(_id);
  const result = await Request.findOneAndDelete({ _id: _id });
  if (result) {
    return true;
  }
  return false;
}

module.exports = {
  viewAllRequests,
  viewSingleRequest,
  createRequest,
  updateRequest,
  deleteRequest,
};
