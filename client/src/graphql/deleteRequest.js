const query = `mutation Mutation($deleteRequestId: ID!) {
  deleteRequest(_id: $deleteRequestId)
}`;

async function deleteRequest(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default deleteRequest;
