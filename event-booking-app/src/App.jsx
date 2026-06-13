import { Routes, Route } from "react-router-dom";
import './styles/app.css'

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AdminBookingPage from "./pages/AdminBookingPage";
import DashboardPage from "./pages/DashboardPage";
import MyBookingPage from "./pages/MyBookingPage";
import EventPage from "./pages/EventPage";
import BookingPage from "./pages/BookingPage";
import CreateEventPage from "./pages/CreateEventPage";
import EditEventPage from "./pages/EditEventPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route index element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/admin-bookings"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminBookingPage />
              </ProtectedRoute>}
          />
          <Route 
            path="/admin-dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <DashboardPage />
              </ProtectedRoute>}
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute adminOnly={false}>
                <MyBookingPage />
              </ProtectedRoute>
            }
          />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/event/create" element={<CreateEventPage/>} />
          <Route path="/event/edit/:id" element={<EditEventPage/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
