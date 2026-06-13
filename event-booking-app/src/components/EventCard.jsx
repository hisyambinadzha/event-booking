import React from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

const EventCard = ({ event }) => {
    const navigate = useNavigate();
    const formattedDate = new Date(event.eventDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
    return (
        <div key={event.id} className="event-card">
            <img src={`${API_BASE_URL}${event.image}`} alt={event.title} />

            <span className={`event-badge ${event.category}`}>
                {event.category.toUpperCase()}
            </span>

            {/* Add title attribute so full title shows on hover */}
            <h3 title={event.title}>{event.title}</h3>

            <p>
                <strong>Venue:</strong> {event.venue}
            </p>
            <p>
                <strong>Date:</strong> {formattedDate}
            </p>
            <p>
                <strong>Price:</strong> {event.price === 0 ? "Free" : `RM${event.price}`}
            </p>
            <p>
                <strong>Seats Available:</strong> {event.seatsAvailable}
            </p>

            <button
                className="event-btn"
                onClick={() => navigate(`/event/${event.id}`, { state: event })}
            >
                View More
            </button>
        </div>
    );
};

export default EventCard;