import { useEffect, useState } from "react";
import { getBookings, updateBookingStatus } from "../services/booking-service";
import { getCurrentUser } from "../services/user-service";
import { getEventById } from "../services/event-service";
import "../styles/my-booking-page.css";

function MyBookingPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);
        const data = await getCurrentUser();

        console.log("Fetched user:", data.response?.body?.id);

        setCurrentUser(data.response?.body || null);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await getBookings(currentUser.id); // call backend service

        console.log("Fetched bookings:", data.response?.body.data);

        const bookingList = data.response?.body.data || [];

        // Fetch event details for each booking
        const enrichedBookings = await Promise.all(
          bookingList.map(async (booking) => {
            try {
              const result = await getEventById(booking.eventId);

              console.log("Fetched event:", result.response?.body.data);

              return { ...booking, event: result.response?.body };
            } catch (err) {
              console.error("Error fetching event:", err);
              return booking; // fallback to eventId
            }
          }),
        );

        setBookings(enrichedBookings);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentUser]);

  const handleCancel = async (id, status) => {
    try {
      // TODO: Replace with actual API call to cancel booking
      if (window.confirm(`Do you want to ${status} booking ${id}?`)) {
        // Optionally refresh bookings after cancellation
        const updated = await updateBookingStatus(id);

        // Optionally log the updated booking
        console.log("Updated booking:", updated);

        // Refetch bookings list after update
        const refreshed = await getBookings(currentUser.id);
        setBookings(refreshed.response?.body.data || []);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  return (
    <section className="dashboard">
      <div className="booking-history">
        <h2>Booking History</h2>
        <table className="booking-table">
          <thead>
            <tr>
              <th>Seats</th>
              <th>Date</th>
              <th>Event Title</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="5">No bookings found.</td>
              </tr>
            ) : (
              bookings
                .slice() // copy array to avoid mutating state
                .sort(
                  (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate),
                ) // DESC
                .map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.numberOfSeats}</td>
                    <td>
                      {new Date(
                        new Date(booking.bookingDate).getTime() +
                          8 * 60 * 60 * 1000, // add 8 hours
                      ).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td>{booking.event?.title || booking.eventId}</td>
                    <td>
                      {booking.totalPrice === 0
                        ? "Free"
                        : `RM${booking.totalPrice}`}
                    </td>
                    <td
                      className={`status ${booking.bookingStatus.toLowerCase()}`}
                    >
                      {booking.bookingStatus}
                    </td>
                    <td>
                      {booking.bookingStatus === "PENDING" ? (
                        <button
                          className="cancel-btn"
                          onClick={() => handleCancel(booking.id, "cancelled")}
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className="no-action">—</span>
                      )}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default MyBookingPage;
