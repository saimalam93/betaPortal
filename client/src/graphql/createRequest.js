const query = `mutation CreateRequest($requests: RequestInputs) {
  createRequest(request: $requests) {
    id
    request_subject
    reason
    request_status
    startDate
    endDate
    employee {
      _id
    }
  }
}`;

async function createRequest(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default createRequest;
