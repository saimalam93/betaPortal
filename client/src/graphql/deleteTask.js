const query = `mutation Mutation($id: ID!) {
  deleteTask(_id: $id)
}`;

async function deleteTask(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default deleteTask;
