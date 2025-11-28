import React from "react";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import "./Product.css";

export default function Product({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="product-link">
      <div className="modern-product-card">
        <div className="product-image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </div>

        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>

          <div className="product-rating">
            <Rating
              style={{ color: "#FFB800" }}
              initialRating={product.rating}
              emptySymbol="fa fa-star-o fa-sm"
              fullSymbol="fa fa-star fa-sm"
              readonly={true}
            />
            <span className="rating-count">({product.rating})</span>
          </div>

          <div className="product-price-section">
            <span className="currency">₹</span>
            <span className="price-amount">{product.price}</span>
          </div>

          {product.countInStock > 0 ? (
            <div className="stock-badge in-stock">
              <span className="stock-dot"></span>
              In Stock
            </div>
          ) : (
            <div className="stock-badge out-of-stock">
              <span className="stock-dot"></span>
              Out of Stock
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
