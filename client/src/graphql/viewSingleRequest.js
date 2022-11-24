const query = `query ViewSingleRequest($_id: ID!) {
  viewSingleRequest(_id: $_id) {
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

async function viewSingleRequest(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default viewSingleRequest;
