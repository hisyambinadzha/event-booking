import { useEffect, useState } from "react";
import API_BASE_URL from "../config";
import "../styles/dashboard-page.css";
import { getReports } from "../services/booking-service";

function DashboardPage() {
  const [reports, setReports] = useState({
    totalBookings: [],
    popularEvents: [],
    revenue: [],
    monthlyTotals: [],
    seatsByCategory: [],
  });

  useEffect(() => {
    async function fetchReports() {
      const data = await getReports();

      console.log(data.response.body);

      setReports(data.response?.body || {}); // because you wrap with ApiResponseBuilder
    }
    fetchReports();
  }, []);

  // ✅ Compute total revenue from per-event revenue
  const totalRevenue =
    reports.revenue?.reduce((sum, r) => sum + (r.revenue || 0), 0) || 0;

  return (
    <div className="report-page">
      <h1>Dashboard</h1>

      {/* Total Bookings */}
      <section className="report-section">
        <h2>Total Bookings per Event</h2>
        {reports.monthlyTotals?.length > 0 ? (
          <div className="report-grid">
            {reports.totalBookings?.map((r) => (
              <div className="report-card" key={r._id}>
                <h3>{r._id}</h3>
                <div className="value category-popular">{r.totalBookings}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="report-card">
            <div className="empty-box">No monthly data available</div>
          </div>
        )}
      </section>

      {/* Revenue per Event */}
      <section className="report-section">
        <h2>Revenue per Event</h2>
        {reports.totalBookings?.length > 0 ? (
          <div className="report-grid">
            {reports.revenue?.map((r) => (
              <div className="report-card" key={r._id}>
                <h3>{r._id}</h3>
                <div className="value category-revenue">RM {r.revenue}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="report-card">
            <div className="empty-box">No revenue data available</div>
          </div>
        )}
      </section>

      {/* ✅ Total Revenue */}
      <section className="report-section">
        <h2>Total Revenue</h2>
        <div className="report-card">
          <div className="value category-revenue">RM {totalRevenue}</div>
        </div>
      </section>

      {/* Seats Sold by Category */}
      <section className="report-section">
        <h2>Seats Sold by Category</h2>
        {reports.seatsByCategory?.length > 0 ? (
          <ul className="report-list">
            {reports.seatsByCategory?.map((r) => (
              <li key={r._id}>
                <span className="category-sales">{r._id}</span>: {r.seatsSold}{" "}
                seats
              </li>
            ))}
          </ul>
        ) : (
          <div className="report-card">
            <div className="empty-box">No seat data available</div>
          </div>
        )}
      </section>

      {/* Monthly Totals */}
      <section className="report-section">
        <h2>Monthly Bookings</h2>
        {reports.monthlyTotals?.length > 0 ? (
          <ul className="report-list">
            {reports.monthlyTotals?.map((r) => (
              <li key={`${r._id.year}-${r._id.month}`}>
                {r._id.month}/{r._id.year}: {r.totalBookings} bookings
              </li>
            ))}
          </ul>
        ) : (
          <div className="report-card">
            <div className="empty-box">No monthly data available</div>
          </div>
        )}
      </section>
    </div>
  );
}

export default DashboardPage;
