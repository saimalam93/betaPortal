const query = `mutation UpdateProject($project: ProjectUpdateInputs) {
  updateProject(project: $project)
}`;

async function updateProject(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default updateProject;
