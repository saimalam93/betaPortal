const query = `query ViewAllRequests($filter: RequestFilterInputs) {
  viewAllRequests(filter: $filter) {
    id
    request_subject
    reason
    request_status
    startDate
    endDate
    employee {
      fname
      lname
      loginID
    }
  }
}`;

async function viewAllRequests(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default viewAllRequests;
