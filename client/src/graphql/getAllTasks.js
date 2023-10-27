const query = `query Query {
    getTasks {
      _id
      taskName
      taskDescription
      taskStatus
      endDate
      taskEmployee {
        _id
        fname
        lname
      }
    }
  }`;

async function getAllTasks(url = "") {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  return response.json();
}

export default getAllTasks;
