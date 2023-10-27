const query = `mutation Mutation($task: TaskInputs) {
  createTask(task: $task) {
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

async function createTask(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default createTask;
