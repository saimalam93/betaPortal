const query = `query GetTaskById($id: ID!) {
    getTaskById(_id: $id) {
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

async function getTaskById(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default getTaskById;
