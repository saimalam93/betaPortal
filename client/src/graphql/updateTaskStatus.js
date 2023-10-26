const query = `mutation UpdateTaskStatus($task: TaskStatusUpdateInputs) {
    updateTaskStatus(task: $task)
  }
`;

const updateTaskStatus = async (url = "", variables) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
};

export default updateTaskStatus;
