const query = `mutation addNewEmployee($newEmployee: EmployeeInputs!) {
    addNewEmployee(employee: $newEmployee) {
        fname
        lname
        gender
        address
        mobile
        emergencyContact
        email
        dateOfBirth
        dateOfJoining
        role
        currentStatus
        sin
    }
  }`;

async function addNewEmployee(url = "", variables) {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
    });
    return response.json();
}

export default addNewEmployee;
