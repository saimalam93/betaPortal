const query = `query ViewAllProjects($filters: FilterProjectInputs) {
  viewAllProjects(filters: $filters) {
    _id
    projectNum
    projectName
    projectType
    projectDescription
    projectCost
    projectClient
    projectStatus
    startDate
    endDate
    projectManager {
      fname
      lname
      mobile
      role
      email
    }
  }
}`;

async function viewAllProjects(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default viewAllProjects;
