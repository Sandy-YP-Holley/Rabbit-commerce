import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function BunnyIcon() {
  return (
    <svg
      className="brand-icon"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 8.5C7.5 6 7 3.5 8.2 2.4C9.4 1.3 10.8 3.4 11.3 6.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M15.5 8.5C16.5 6 17 3.5 15.8 2.4C14.6 1.3 13.2 3.4 12.7 6.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <ellipse cx="12" cy="14.5" rx="6" ry="5.3" fill="currentColor" />
      <circle cx="10" cy="13.5" r="0.9" fill="#FDFBF7" />
      <circle cx="14" cy="13.5" r="0.9" fill="#FDFBF7" />
      <path
        d="M11 16.2c.4.4 1.6.4 2 0"
        stroke="#FDFBF7"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount, clearCart } = useCart();
  const navigate = useNavigate();

  function handleLogout() {
    clearCart();
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <BunnyIcon />
          RabbitCommerce
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/checkout" className="navbar-link navbar-cart-link">
            Cart
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>
        </div>
        <div className="navbar-auth">
          {user ? (
            <div className="navbar-user">
              <span className="navbar-greeting">Hi, {user.name.split(" ")[0]}</span>
              <button className="btn btn-secondary btn-small" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          ) : (
            <div className="navbar-auth-links">
              <Link to="/auth?mode=login" className="btn btn-secondary">Login</Link>
              <Link to="/auth?mode=signup" className="btn btn-primary">Signup</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
