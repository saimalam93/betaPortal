const query = `mutation UpdatePassword($employee: EmployeePasswordUpdateInputs) {
    updatePassword(employee: $employee)
  }`;

async function updatePassword(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default updatePassword;
