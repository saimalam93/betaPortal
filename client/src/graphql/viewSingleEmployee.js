// const query = `query ViewSingleEmployee($_id: String!) {
//   viewSingleEmployee(id: $_id) {
//     _id
//     fname
//     lname
//     dateOfJoining
//     department
//     employeeType
//     currentStatus
//     }
//   }`;
  
//   async function viewSingleEmployee(url = "", variables) {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },                                                                                                                                                                                                                      
//       body: JSON.stringify({ query, variables }),
//     });
//     return response.json();
//   }
  
//   export default viewSingleEmployee;

  const query = `query ViewSingleEmployee($_id: String!) {
    viewSingleEmployee(_id: $_id) {
      _id
      fname
      lname
      dateOfJoining
      department
      employeeType
      currentStatus
      sin
      address
      currentStatus
      emergencyContact
      email
      mobile
      

    }
  }`;
  
  async function viewSingleEmployee(url = "", variables) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    // console.log('response:',response.json())
    return response.json();
  }
  
  export default viewSingleEmployee;
  
  