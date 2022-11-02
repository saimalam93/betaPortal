const query = `mutation AddNewProject($project: ProjectInputs) {
    addNewProject(project: $project) {
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
        loginID
        fname
        lname
        mobile
        role
      }
    }
  }`;

async function addNewProject(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default addNewProject;