const query = `mutation ResetPassword($id: String!) {
    resetPassword(_id: $id)
  }`;

async function resetPassword(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default resetPassword;
