import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProductById, getRelatedProducts } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="page">
        <div className="container">
          <div className="not-found">
            <h2>Product not found</h2>
            <p>We couldn't find the item you were looking for.</p>
            <Link to="/" className="btn btn-primary">Back to Shop</Link>
          </div>
        </div>
      </div>
    );
  }

  const outOfStock = product.stock === 0;
  const lowStock = product.stock > 0 && product.stock <= 8;
  const related = getRelatedProducts(product);

  function decrement() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function increment() {
    setQuantity((q) => Math.min(product.stock, q + 1));
  }

  function handleAddToCart() {
    if (outOfStock) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span>{product.category}</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>

        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-info">
            <span className="product-card-category">{product.category}</span>
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">${product.price.toFixed(2)}</p>

            <div className="stock-status">
              {outOfStock && <span className="stock-badge stock-badge-out">Out of Stock</span>}
              {lowStock && <span className="stock-badge stock-badge-low">Only {product.stock} left in stock</span>}
              {!outOfStock && !lowStock && <span className="stock-badge stock-badge-ok">In Stock</span>}
            </div>

            <p className="product-detail-description">{product.description}</p>

            {!outOfStock && (
              <div className="product-detail-quantity">
                <span className="form-label">Quantity</span>
                <div className="quantity-controls">
                  <button className="quantity-btn" onClick={decrement} aria-label="Decrease quantity">−</button>
                  <span className="quantity-value">{quantity}</span>
                  <button className="quantity-btn" onClick={increment} aria-label="Increase quantity">+</button>
                </div>
              </div>
            )}

            <div className="product-detail-actions">
              <button
                className={`btn btn-large ${added ? "btn-success" : "btn-primary"}`}
                onClick={handleAddToCart}
                disabled={outOfStock}
              >
                {outOfStock ? "Unavailable" : added ? "Added to Cart ✓" : "Add to Cart"}
              </button>
              <button className="btn btn-secondary btn-large" onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="related-section">
            <h2 className="page-title">You Might Also Like</h2>
            <div className="product-grid">
              {related.map((item) => (
                <ProductCard product={item} key={item.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
