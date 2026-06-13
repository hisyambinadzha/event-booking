import API_BASE_URL from "../config";

const BOOKING_API_URL = `${API_BASE_URL}/api/bookings`;

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

export async function adminGetBookings() {
  const response = await fetch(`${BOOKING_API_URL}/admin`, {
    method: "GET",
    headers: getHeaders(),
  });
  const body = await response.json(); // read once

  if (!response.ok)
    throw new Error(
      `${response.status} - ${body.response.body.responseInfo.message}`,
    );
  return body;
}

export async function getBookings(id) {
  const response = await fetch(`${BOOKING_API_URL}/user/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
  const body = await response.json(); // read once

  if (!response.ok)
    throw new Error(
      `${response.status} - ${body.response.body.responseInfo.message}`,
    );
  return body;
}

export async function createBooking(booking) {
  try {
    const response = await fetch(BOOKING_API_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(booking),
    });

    const body = await response.json(); // read once

    if (!response.ok)
      throw new Error(
        `${response.status} - ${body.response.body.responseInfo.message}`,
      );
    return body;
  } catch (err) {
    console.error("Request failed:", err);
    throw err;
  }
}

export async function updateBookingStatus(id) {
  const response = await fetch(`${BOOKING_API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
  });
  const body = await response.json(); // read once

  if (!response.ok)
    throw new Error(
      `${response.status} - ${body.response.body.responseInfo.message}`,
    );
  return body;
}

export async function getReports() {
  const response = await fetch(`${BOOKING_API_URL}/reports`, {
    method: "GET",
    headers: getHeaders(),
  });
  const body = await response.json(); // read once

  if (!response.ok)
    throw new Error(
      `${response.status} - ${body.response.body.responseInfo.message}`,
    );
  return body;
}
