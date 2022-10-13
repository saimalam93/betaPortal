const query = `query Query($filters: FilterEmployeeInputs) {
  viewAllEmployees(filters: $filters) {
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

async function viewAllEmployees(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default viewAllEmployees;
