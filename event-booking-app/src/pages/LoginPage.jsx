import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/user-service";
import AuthForm from "../components/AuthForm";

function LoginPage() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.response.body.token);
      localStorage.setItem("email", data.response.body.email);
      localStorage.setItem("role", data.response.body.role);

      navigate(
        data.response.body.role === "ADMIN"
          ? "/admin-dashboard"
          : "/my-bookings",
      );
    } catch (err) {
      setError("Login failed. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <AuthForm
        type="login"
        email={email}
        password={password}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      />

      <p className="auth-switch">
        Join us Now!{" "}
        <span onClick={() => navigate("/register")}>Create account</span>
      </p>
    </div>
  );
}

export default LoginPage;
