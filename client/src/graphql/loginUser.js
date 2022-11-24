const query = `query LoginUser($userData: UserData!) {
  loginUser(userData: $userData) {
    _id
    loginID
    password
    token
    role
    _id
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
