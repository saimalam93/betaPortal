const query = `query LoginUser($userData: UserData!) {
  loginUser(userData: $userData) {
    loginID
    password
    token
    role
  }
}`;

async function loginUser(url = "", variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default loginUser;
