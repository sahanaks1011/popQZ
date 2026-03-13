const API = "http://localhost:4000/api";

export async function getSubjects() {
  const res = await fetch(`${API}/subjects`);
  if (!res.ok) throw new Error("Failed to fetch subjects");
  return res.json();
}

export async function getQuizzes() {
  const res = await fetch(`${API}/quizzes`);
  if (!res.ok) throw new Error("Failed to fetch quizzes");
  return res.json();
}

export async function getTopic(topicId) {
  const res = await fetch(`${API}/topics/${topicId}`);
  if (!res.ok) throw new Error("Failed to fetch topic");
  return res.json();
}

export async function submitQuiz(payload) {
  const res = await fetch(`${API}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to submit quiz");
  return res.json();
}

export async function signup(body) {
  const res = await fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to sign up");
  return res.json();
}

export async function login(body) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to log in");
  return res.json();
}
