const query = `mutation updateEmployee($employee: EmployeeUpdateInputs) {
    updateEmployee(employee: $employee) 
  }`;

async function updateEmployee(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default updateEmployee;

  
  async function updateEmployee(url = "", variables) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    return response.json();
  }
  
  export default updateEmployee;
  