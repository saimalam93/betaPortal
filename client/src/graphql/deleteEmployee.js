const query = `mutation DeleteEmployee($_id: String!) {
  deleteEmployee(_id: $_id) 
}`;
  
  async function deleteEmployee(url = "", variables) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    return response.json();
  }
  
  export default deleteEmployee;
  