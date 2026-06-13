import API_BASE_URL from "../config";

const EVENT_API_URL = `${API_BASE_URL}/api/events`;

function getHeaders({ isJson = true } = {}) {
  const token = localStorage.getItem("token");

  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Only set Content-Type for JSON requests
  if (isJson) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

export async function getCategories() {
  const response = await fetch(`${EVENT_API_URL}/categories`, {
    method: "GET",
  });
  const body = await response.json(); // read once

  if (!response.ok)
    throw new Error(
      `${response.status} - ${body.response.body.responseInfo.message}`,
    );
  return body;
}

export async function getEventById(id) {
  const response = await fetch(`${EVENT_API_URL}/${id}`, {
    method: "GET",
  });
  const body = await response.json(); // read once

  if (!response.ok)
    throw new Error(
      `${response.status} - ${body.response.body.responseInfo.message}`,
    );
  return body;
}

export async function getEventsByPage(page, size, sort, category = "all") {
  const params = new URLSearchParams({
    page,
    size,
    sort,
    category, // ✅ include category
  });
  const url = `${EVENT_API_URL}/page?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
  });
  const body = await response.json(); // read once

  if (!response.ok)
    throw new Error(
      `${response.status} - ${body.response.body.responseInfo.message}`,
    );
  return body;
}

export async function createEvent(event) {
  try {
    const response = await fetch(EVENT_API_URL, {
      method: "POST",
      headers: getHeaders({ isJson: false }),
      body: event,
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    const body = await response.json(); // read once
    console.log(body);

    if (!response.ok) {
      // Then throw with the parsed content
      throw new Error(
        `${response.status} - ${body.response.body.responseInfo.message}`,
      );
    }

    return body;
  } catch (err) {
    console.error("Request failed:", err);
    throw err;
  }
}

export async function updateEvent(id, event) {
  try {
    const response = await fetch(`${EVENT_API_URL}/${id}`, {
      method: "PUT",
      headers: getHeaders({ isJson: false }),
      body: event,
    });

    const body = await response.json(); // read once

    if (!response.ok) {
      // Then throw with the parsed content
      throw new Error(
        `${response.status} - ${body.response.body.responseInfo.message}`,
      );
    }

    return body;
  } catch (err) {
    console.error("Request failed:", err);
    throw err;
  }
}

export async function deleteEvent(id) {
  const response = await fetch(`${EVENT_API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  const body = await response.json(); // read once

  if (!response.ok)
    throw new Error(
      `${response.status} - ${body.response.body.responseInfo.message}`,
    );
  return body;
}
