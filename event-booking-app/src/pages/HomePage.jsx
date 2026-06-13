import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home-page.css";
import "../styles/empty-state.css";
import concertImg from "../assets/concert.jpg";
import autoImg from "../assets/auto.jpg";
import carnivalImg from "../assets/carnival.jpg";
import expoImg from "../assets/expo.jpg";
import conferenceImg from "../assets/conference.jpg";
import festivalImg from "../assets/festival.jpg";
import showImg from "../assets/show.jpg";
import wellnessImg from "../assets/wellness.jpg";
import sportsImg from "../assets/sport.jpg";

import EventCard from "../components/EventCard";
import {
  getCategories,
  getEventsByPage,
  createEvent,
} from "../services/event-service";

function HomePage() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const adminOnly = userRole === "ADMIN";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState(["all"]);

  const [loading, setLoading] = useState(true);

  // ✅ Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);

        const data = await getCategories();
        console.log("API response:", data.response.body.data);

        // assume API returns array like ["concert","auto","carnival"]
        setCategories(["all", ...data.response.body.data]);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  // ✅ Fetch events from backend
  useEffect(() => {
    let ignore = false;

    async function fetchEvents() {
      if (ignore) return;

      try {
        const data = await getEventsByPage(
          currentPage,
          pageSize,
          "eventDate,desc",
          category,
        );
        console.log("API response:", data);

        // Adjust path depending on your apiResponseBuilder structure
        setEvents(data.response.body.content);
        setTotalPages(data.response.body.totalPages);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    }
    fetchEvents();
    return () => {
      ignore = true;
    };
  }, [currentPage, pageSize, category]);

  // ✅ FILTER + SEARCH
  const filteredEvents = events.filter((event) => {
    const matchSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory = category === "all" || event.category === category;
    return matchSearch && matchCategory;
  });

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <h1>Upcoming Events</h1>

      {/* ✅ SEARCH */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* ✅ FILTER */}
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(0);
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        {/* ✅ Page size selector */}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(0); // reset to first page
          }}
        >
          <option value={4}>4 per page</option>
          <option value={8}>8 per page</option>
          <option value={12}>12 per page</option>
          <option value={20}>20 per page</option>
        </select>

        {/* ✅ Only show if admin */}
        {token && adminOnly && (
          <button
            className="create-event-btn"
            onClick={() => navigate("/event/create")}
          >
            + Create Event
          </button>
        )}
      </div>

      {filteredEvents.length === 0 ? (
        <div className="empty-card">
          <span className="empty-icon">🎉</span>
          <h2>No Events Found</h2>
          <p>Looks like there are no events available at the moment.</p>
        </div>
      ) : (
        <>
          {/* ✅ EVENT LIST */}
          <div className="event-list">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </>
      )}

      {filteredEvents.length !== 0 && (
        <>
          {/* ✅ PAGINATION */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={currentPage === i ? "active" : ""}
                onClick={() => setCurrentPage(i)}
              >
                {i}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default HomePage;
