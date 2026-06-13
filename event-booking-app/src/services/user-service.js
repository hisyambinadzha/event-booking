import API_BASE_URL from "../config";

const AUTH_API_URL = `${API_BASE_URL}/api/auth`;

export const register = async (fullName, email, password) => {
  const response = await fetch(`${AUTH_API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: fullName,
      email: email,
      password: password,
    }),
  });

  const body = await response.json(); // read once

  if (!response.ok)
    throw new Error(
      `${response.status} - ${body.response.body.responseInfo.message}`,
    );
  return body;
};

export async function login(email, password) {
  const response = await fetch(`${AUTH_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const body = await response.json(); // read once

  if (!response.ok)
    throw new Error(
      `${response.status} - ${body.response.body.responseInfo.message}`,
    );
  return body;
}

export async function getCurrentUser() {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const response = await fetch(`${AUTH_API_URL}/profile/me?email=${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
}

export async function getUserById(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${AUTH_API_URL}/profile/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await response.json(); // read once

  if (!response.ok)
    throw new Error(
      `${response.status} - ${body.response.body.responseInfo.message}`,
    );
  return body;
}
