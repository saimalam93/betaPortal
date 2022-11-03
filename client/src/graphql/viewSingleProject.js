const query = `query ViewSingleProject($_id: String!) {
  viewSingleProject(_id: $_id) {
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

async function viewSingleProject(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default viewSingleProject;
