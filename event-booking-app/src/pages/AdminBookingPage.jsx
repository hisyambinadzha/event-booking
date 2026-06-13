import React, { useEffect, useState } from "react";
import {
  adminGetBookings,
  updateBookingStatus,
} from "../services/booking-service";
import { getEventById } from "../services/event-service";
import { getUserById } from "../services/user-service";
import { enrichAndSortBookings } from "../components/Helper";
import "../styles/admin-booking-page.css";

const AdminBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const result = await adminGetBookings();
        const bookingList = result.response?.body.data || [];
        const enriched = await enrichAndSortBookings(bookingList);
        setBookings(enriched);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleUpdateBookingStatus = async (id, status) => {
    try {
      if (window.confirm(`Do you want to ${status} booking ${id}?`)) {
        await updateBookingStatus(id);

        const refreshed = await adminGetBookings();
        const bookingList = refreshed.response?.body.data || [];
        const enriched = await enrichAndSortBookings(bookingList);
        setBookings(enriched);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <p>Loading bookings...</p>;
  if (error) {
    return (
      <>
        <div className="empty-card">
          <span className="empty-icon">🎉</span>
          <p>{error || "We couldn’t load the bookings. Please try again later."}</p>
        </div>
      </>
    );
  }

  return (
    <div className="admin-bookings">
      <h2>All User Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Event Title</th>
            <th>Seats</th>
            <th>Booking Date</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.user || booking.userId}</td>
              <td>{booking.event || booking.eventId}</td>
              <td>{booking.numberOfSeats}</td>
              <td>{new Date(booking.bookingDate).toLocaleString()}</td>
              <td>{`RM ${booking.totalPrice}`}</td>
              <td className={`status ${booking.bookingStatus.toLowerCase()}`}>
                {booking.bookingStatus}
              </td>
              <td>
                {booking.bookingStatus === "PENDING" ? (
                  <button
                    className="approve-btn"
                    onClick={() =>
                      handleUpdateBookingStatus(booking.id, "APPROVED")
                    }
                  >
                    Approve
                  </button>
                ) : booking.bookingStatus === "APPROVED" ? (
                  <button
                    className="reject-btn"
                    onClick={() =>
                      handleUpdateBookingStatus(booking.id, "REJECTED")
                    }
                  >
                    Reject
                  </button>
                ) : (
                  <span className="no-action">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookingPage;
