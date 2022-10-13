const query = `query ViewAllEmployees($filters: FilterEmployeeInputs) {
  viewAllEmployees(filters: $filters) {
    _id
    fname
    lname
    mobile
    dateOfJoining
    role
    currentStatus
    dateOfBirth
    emergencyContact
    department
    employeeType  
    sin 
    address
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
