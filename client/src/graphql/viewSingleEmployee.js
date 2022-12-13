const query = `query Query($_id: String!) {
  viewSingleEmployee(_id: $_id) {
    _id
    loginID
    password
    fname
    lname
    mobile
    role
    email
    gender
    address
    emergencyContact
    employeeType
    department
    sin
    token
    currentStatus
    dateOfBirth
    dateOfJoining
  }
}`;

async function viewSingleEmployee(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default viewSingleEmployee;
