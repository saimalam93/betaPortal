const query = `mutation DeleteRequest($id: ID!) {
  deleteRequest(_id: $id)
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
