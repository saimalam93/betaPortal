const query = `mutation updateEmployee($employee: EmployeeUpdateInputs) {
    updateEmployee(employee: $employee) 
  }`;


// const query = `mutation updateEmployee($employee: EmployeeUpdateInputs) {
//   updateEmployee(employee: $employee) {
//     _id
//     address
//   }
// }`;
  
  async function updateEmployee(url = "", variables) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    // console.log('response:',response.json())
    return response.json();
  }
  
  export default updateEmployee;
  