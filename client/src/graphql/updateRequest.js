const query = `mutation UpdateRequest($requests: UpdateRequestInputs) {
  updateRequest(request: $requests)
}`;

async function updateRequest(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default updateRequest;
