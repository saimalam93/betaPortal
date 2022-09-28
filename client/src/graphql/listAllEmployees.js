const query = `query ListAllEmployees($filters: FilterEmployeeInputs) {
  listAllEmployees(filters: $filters) {
    _id
    fname
    lname
    age
    dateOfJoining
    title
    department
    employeeType
    currentStatus
  }
}`;

async function listAllEmployees(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default listAllEmployees;
