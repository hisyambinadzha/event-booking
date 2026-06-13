import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/booking-form.css";
import API_BASE_URL from "../config";

import { createBooking } from "../services/booking-service";

function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state;

  // ✅ Handle refresh / missing data
  if (!event) {
    return <h2 className="no-event">No event data available</h2>;
  }

  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const [form, setForm] = useState({
    numberOfSeats: 1,
  });

  // ✅ Calculate remaining seats dynamically
  const remainingSeats = event.seatsAvailable - form.numberOfSeats;
  const total = form.numberOfSeats * event.price;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.numberOfSeats > event.seatsAvailable) {
      alert("Not enough seats available!");
      return;
    }

    const bookingRequest = {
      numberOfSeats: parseInt(form.numberOfSeats, 10),
      eventId: event.id, // adjust if your backend uses _id
    };

    try {

      const data = await createBooking(bookingRequest);
      console.log("API response:", data);

      alert(
        `Booking Confirmed! Seats: ${form.numberOfSeats}, Total: RM${total}`
      );

      // ✅ Navigate after alert is closed
      navigate("/my-bookings");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-card">
        <img src={`${API_BASE_URL}${event.image}`} alt={event.title} className="booking-image" />

        <h2 className="booking-title">{event.title}</h2>
        <p className="booking-meta">{event.venue} • {formattedDate}</p>
        <p className="booking-description">{event.description}</p>
        <p className="booking-price">Price: {event.price === 0 ? "Free" : `RM${event.price}`}</p>

        {/* ✅ Live updating seat info */}
        <p className="booking-seats">Available Seats: {event.seatsAvailable}</p>
        <p className="booking-seats-left">
          Seats Left After Booking: {remainingSeats >= 0 ? remainingSeats : 0}
        </p>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <input
              type="number"
              name="numberOfSeats"
              min="1"
              max={event.seatsAvailable}
              value={form.numberOfSeats}
              onChange={handleChange}
              required
            />
            <label>Number of Seats</label>
          </div>

          <div className="total">Total: RM{total}</div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Pay Now
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate(-1)} // go back to previous page
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;