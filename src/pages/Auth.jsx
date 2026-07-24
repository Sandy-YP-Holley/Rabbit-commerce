import { useState } from "react";
import { useNavigate, useLocation, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Auth() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const [mode, setMode] = useState(initialMode);

  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = location.state?.from || "/";

  function switchMode(next) {
    setMode(next);
    setSearchParams({ mode: next });
    setErrors({});
    setFormError("");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const nextErrors = {};

    if (mode === "signup") {
      if (form.name.trim().length < 2) {
        nextErrors.name = "Please enter your full name.";
      }
    }

    if (!EMAIL_REGEX.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    if (mode === "signup" && form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);

    const result =
      mode === "login"
        ? login(form.email.trim(), form.password)
        : signup(form.name, form.email.trim(), form.password);

    setSubmitting(false);

    if (!result.success) {
      setFormError(result.error);
      return;
    }

    navigate(redirectTo, { replace: true });
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${mode === "login" ? "auth-tab-active" : ""}`}
              onClick={() => switchMode("login")}
            >
              Log In
            </button>
            <button
              type="button"
              className={`auth-tab ${mode === "signup" ? "auth-tab-active" : ""}`}
              onClick={() => switchMode("signup")}
            >
              Sign Up
            </button>
          </div>

          <p className="auth-subtitle">
            {mode === "login"
              ? "Welcome back — log in to continue."
              : "Create an account to start shopping for your rabbit."}
          </p>

          {formError && <div className="error-message">{formError}</div>}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {mode === "signup" && (
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`form-input ${errors.name ? "form-input-error" : ""}`}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className={`form-input ${errors.email ? "form-input-error" : ""}`}
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className={`form-input ${errors.password ? "form-input-error" : ""}`}
                value={form.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
              />
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            {mode === "signup" && (
              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className={`form-input ${errors.confirmPassword ? "form-input-error" : ""}`}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                />
                {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-block btn-large" disabled={submitting}>
              {submitting ? "Please wait…" : mode === "login" ? "Log In" : "Create Account"}
            </button>
          </form>

          <p className="auth-switch">
            {mode === "login" ? (
              <>Don't have an account? <Link className="auth-link" to="#" onClick={(e) => { e.preventDefault(); switchMode("signup"); }}>Sign up</Link></>
            ) : (
              <>Already have an account? <Link className="auth-link" to="#" onClick={(e) => { e.preventDefault(); switchMode("login"); }}>Log in</Link></>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
