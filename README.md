# 🐇 RabbitCommerce

A React storefront for rabbit care essentials — hay, hutches, treats, and everything in between. Built as a fully client-side e-commerce experience with authentication, a shopping cart, product detail pages, and a validated checkout flow, backed by a mock localStorage "backend."

**🔗 Live Demo:** [your-deployed-url.vercel.app](https://your-deployed-url.vercel.app) — *update this link once deployed*

---

## Features

- **Product catalog** — browse products by category with stock and pricing info
- **Product detail pages** — full description, stock status, quantity selector, related items
- **Cart** — add/remove items, adjust quantities, persists across sessions
- **Authentication** — sign up and log in with client-side validation, session persistence
- **Checkout** — editable cart summary, shipping form, mock payment form (format-validated, nothing is charged), order confirmation
- **Responsive design** — usable from mobile to desktop
- **Light, warm visual theme** — designed around the rabbit-boutique concept without being flashy

## Tech Stack

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Vite](https://vite.dev/) — build tooling and dev server
- Plain CSS (custom properties, no UI framework)
- `localStorage` — mock backend for users and cart data (no real server)

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # Nav bar, cart badge, auth-aware links
│   └── ProductCard.jsx   # Product grid card with add-to-cart
├── context/
│   ├── AuthContext.jsx   # App-wide auth state
│   └── CartContext.jsx   # App-wide cart state
├── data/
│   ├── products.js       # Mock product catalog
│   └── auth.js           # Mock user "backend" (localStorage)
├── pages/
│   ├── Home.jsx           # Product listing
│   ├── ProductDetail.jsx  # Individual product page
│   ├── Auth.jsx            # Login / signup
│   └── Checkout.jsx        # Cart, shipping, payment, confirmation
├── App.jsx
├── App.css
└── main.jsx
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm

### Installation

```bash
git clone https://github.com/Sandy-YP-Holley/Rabbit-commerce.git
cd rabbit-commerce
npm install
```

### Run locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Notes on the Mock Backend

This project has no real server. User accounts and cart contents are stored in the browser via `localStorage`, mirroring the shape of a real backend so the pattern is easy to swap out later. Payment fields on checkout are format-validated only (card number, expiry, CVC) — no payment is ever processed or transmitted.

## License

MIT

## Acknowledgments

Product images sourced from [LoremFlickr](https://loremflickr.com/) for demo purposes.
