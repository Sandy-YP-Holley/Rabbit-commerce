import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const outOfStock = product.stock === 0;
  const lowStock = product.stock > 0 && product.stock <= 8;

  function handleAddToCart() {
    if (outOfStock) return;
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="product-card">
      <div className="product-card-image-wrap">
        <img src={product.image} alt={product.name} className="product-card-image" />
        {outOfStock && <span className="stock-badge stock-badge-out">Out of Stock</span>}
        {lowStock && <span className="stock-badge stock-badge-low">Only {product.stock} left</span>}
      </div>

      <div className="product-card-content">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">${product.price.toFixed(2)}</p>

        <div className="product-card-actions">
          <Link to={`/product/${product.id}`} className="btn btn-secondary">View Details</Link>
          <button
            className={`btn ${added ? "btn-success" : "btn-primary"}`}
            onClick={handleAddToCart}
            disabled={outOfStock}
          >
            {outOfStock ? "Unavailable" : added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
