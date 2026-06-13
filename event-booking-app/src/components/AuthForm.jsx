import "../styles/auth-form.css";

function AuthForm({
  type = "login",
  email,
  password,
  confirmPassword,
  fullName,
  onFullNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  loading,
  error
}) {
  return (
    <div className="auth-card">
      <h2>{type === "login" ? "Welcome back" : "Create account"}</h2>
      <p>
        {type === "login"
          ? "Please enter your details."
          : "Register a new account."}
      </p>

      <form className="auth-form" onSubmit={onSubmit}>

        {/* ✅ Full Name (REGISTER ONLY) */}
        {type === "register" && (
          <div className="form-group">
            <input
              type="text"
              value={fullName}
              onChange={onFullNameChange}
              required
            />
            <label className={fullName ? "active" : ""}>
              Full Name
            </label>
          </div>
        )}

        {/* Email */}
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={onEmailChange}
            required
          />
          <label className={email ? "active" : ""}>Email</label>
        </div>

        {/* Password */}
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={onPasswordChange}
            required
          />
          <label className={password ? "active" : ""}>Password</label>
        </div>

        {/* Confirm Password */}
        {type === "register" && (
          <div className="form-group">
            <input
              type="password"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
              required
            />
            <label className={confirmPassword ? "active" : ""}>
              Confirm Password
            </label>
          </div>
        )}

        {/* Button */}
        <button className="auth-button" disabled={loading}>
          {loading
            ? type === "login"
              ? "Logging in..."
              : "Registering..."
            : type === "login"
            ? "Login"
            : "Register"}
        </button>

        {/* Error */}
        {error && <p className="error">⚠ {error}</p>}
      </form>
    </div>
  );
}

export default AuthForm;