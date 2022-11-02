const query = `mutation DeleteProject($id: String!) {
  deleteProject(_id: $id)
}`;

async function deleteProject(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default deleteProject;
