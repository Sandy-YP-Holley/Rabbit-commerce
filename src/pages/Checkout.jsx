import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const CARD_REGEX = /^\d{16}$/;
const EXPIRY_REGEX = /^(0[1-9]|1[0-2])\/\d{2}$/;
const CVC_REGEX = /^\d{3,4}$/;

const SHIPPING_RATE = 6.99;
const TAX_RATE = 0.08;

export default function Checkout() {
  const { user } = useAuth();
  const { cartItems, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();

  const [form, setForm] = useState({
    fullName: user?.name || "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const next = {};
    if (form.fullName.trim().length < 2) next.fullName = "Enter the name for this order.";
    if (form.address.trim().length < 4) next.address = "Enter a valid street address.";
    if (form.city.trim().length < 2) next.city = "Enter a valid city.";
    if (form.postalCode.trim().length < 3) next.postalCode = "Enter a valid postal code.";
    if (form.country.trim().length < 2) next.country = "Enter a valid country.";

    if (!CARD_REGEX.test(form.cardNumber.replace(/\s/g, ""))) {
      next.cardNumber = "Enter a valid 16-digit card number.";
    }
    if (!EXPIRY_REGEX.test(form.expiry.trim())) {
      next.expiry = "Use MM/YY format.";
    }
    if (!CVC_REGEX.test(form.cvc.trim())) {
      next.cvc = "Enter a valid 3-digit CVC.";
    }

    return next;
  }

  function handlePlaceOrder(e) {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setOrderNumber(`RC-${Math.floor(100000 + Math.random() * 900000)}`);
    setOrderPlaced(true);
    clearCart();
  }

  const shipping = cartItems.length > 0 ? SHIPPING_RATE : 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  if (!user) {
    return (
      <div className="page">
        <div className="container">
          <div className="checkout-gate">
            <h2>Log in to check out</h2>
            <p>Please log in or create an account to complete your purchase.</p>
            <div className="checkout-gate-actions">
              <Link to="/auth?mode=login" state={{ from: "/checkout" }} className="btn btn-primary btn-large">
                Log In
              </Link>
              <Link to="/auth?mode=signup" state={{ from: "/checkout" }} className="btn btn-secondary btn-large">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="page">
        <div className="container">
          <div className="order-success">
            <h2 className="order-success-title">Order Placed!</h2>
            <p className="order-success-message">
              Thanks, {user.name.split(" ")[0]} — your order <strong>{orderNumber}</strong> is on its way to your rabbit.
            </p>
            <Link to="/" className="btn btn-primary btn-large" style={{ marginTop: "1.5rem" }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <div className="checkout-gate">
            <h2>Your cart is empty</h2>
            <p>Add a few things for your rabbit before checking out.</p>
            <Link to="/" className="btn btn-primary btn-large">Browse Products</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h2 className="page-title">Checkout</h2>
        <div className="checkout-container">
          <div className="checkout-main">
            <div className="checkout-items">
              <h3 className="checkout-section-title">Your Cart</h3>
              {cartItems.map((item) => (
                <div className="checkout-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="checkout-item-image" />
                  <div className="checkout-item-details">
                    <h4 className="checkout-item-name">{item.name}</h4>
                    <p className="checkout-item-price">${item.price.toFixed(2)} each</p>
                    <button
                      type="button"
                      className="checkout-item-remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="checkout-item-controls">
                    <div className="quantity-controls">
                      <button
                        type="button"
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        type="button"
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.stock !== undefined && item.quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>
                    <span className="checkout-item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <form className="checkout-form" id="checkout-form" onSubmit={handlePlaceOrder} noValidate>
              <div className="checkout-items">
                <h3 className="checkout-section-title">Shipping Details</h3>
                <div className="form-group">
                  <label className="form-label" htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    className={`form-input ${errors.fullName ? "form-input-error" : ""}`}
                    value={form.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="address">Street Address</label>
                  <input
                    id="address"
                    name="address"
                    className={`form-input ${errors.address ? "form-input-error" : ""}`}
                    value={form.address}
                    onChange={handleChange}
                    placeholder="123 Warren Lane"
                  />
                  {errors.address && <span className="form-error">{errors.address}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="city">City</label>
                    <input
                      id="city"
                      name="city"
                      className={`form-input ${errors.city ? "form-input-error" : ""}`}
                      value={form.city}
                      onChange={handleChange}
                    />
                    {errors.city && <span className="form-error">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="postalCode">Postal Code</label>
                    <input
                      id="postalCode"
                      name="postalCode"
                      className={`form-input ${errors.postalCode ? "form-input-error" : ""}`}
                      value={form.postalCode}
                      onChange={handleChange}
                    />
                    {errors.postalCode && <span className="form-error">{errors.postalCode}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="country">Country</label>
                  <input
                    id="country"
                    name="country"
                    className={`form-input ${errors.country ? "form-input-error" : ""}`}
                    value={form.country}
                    onChange={handleChange}
                  />
                  {errors.country && <span className="form-error">{errors.country}</span>}
                </div>
              </div>

              <div className="checkout-items">
                <h3 className="checkout-section-title">Payment</h3>
                <div className="form-group">
                  <label className="form-label" htmlFor="cardNumber">Card Number</label>
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    className={`form-input ${errors.cardNumber ? "form-input-error" : ""}`}
                    value={form.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                  {errors.cardNumber && <span className="form-error">{errors.cardNumber}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="expiry">Expiry (MM/YY)</label>
                    <input
                      id="expiry"
                      name="expiry"
                      className={`form-input ${errors.expiry ? "form-input-error" : ""}`}
                      value={form.expiry}
                      onChange={handleChange}
                      placeholder="08/28"
                      maxLength={5}
                    />
                    {errors.expiry && <span className="form-error">{errors.expiry}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="cvc">CVC</label>
                    <input
                      id="cvc"
                      name="cvc"
                      className={`form-input ${errors.cvc ? "form-input-error" : ""}`}
                      value={form.cvc}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={4}
                    />
                    {errors.cvc && <span className="form-error">{errors.cvc}</span>}
                  </div>
                </div>
                <p className="payment-note">This is a demo store — no real payment is processed.</p>
              </div>

              <button type="submit" className="btn btn-primary btn-large btn-block checkout-submit-mobile">
                Place Order
              </button>
            </form>
          </div>

          <div className="checkout-summary">
            <h3 className="checkout-section-title">Order Summary</h3>
            <div className="checkout-total">
              <span className="checkout-total-label">Subtotal</span>
              <span className="checkout-total-value">${subtotal.toFixed(2)}</span>
            </div>
            <div className="checkout-total">
              <span className="checkout-total-label">Shipping</span>
              <span className="checkout-total-value">${shipping.toFixed(2)}</span>
            </div>
            <div className="checkout-total">
              <span className="checkout-total-label">Tax</span>
              <span className="checkout-total-value">${tax.toFixed(2)}</span>
            </div>
            <div className="checkout-total">
              <span className="checkout-total-label">Total</span>
              <span className="checkout-total-value checkout-total-final">${total.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              form="checkout-form"
              className="btn btn-primary btn-block btn-large checkout-submit-desktop"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
