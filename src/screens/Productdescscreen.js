import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { getProductById, getProductReviews } from "../actions/productActions";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Review from "../components/Review";
import ImageWithHotspots from "../components/ImageWithHotspots";
import { useParams } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PaymentsIcon from "@mui/icons-material/Payments";
import Rating from "react-rating";
import "./Productdescscreen.css";
export default function Productdescscreen({ match }) {
  const params = useParams();
  // const productid = match.params.id;
  const dispatch = useDispatch();
  const [quantity, setquantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeWarning, setShowSizeWarning] = useState(false);
  const [itemAdded, setItemAdded] = useState(false);

  const getproductbyidstate = useSelector(
    (state) => state.getProductByIdReducer
  );

  const reviewsState = useSelector((state) => state.getProductReviewsReducer);
  const { totalReviews = 0 } = reviewsState;

  const { product, loading, error } = getproductbyidstate;

  function addtocart() {
    // Check if size is required but not selected
    if (
      product.available_sizes &&
      product.available_sizes.length > 0 &&
      !selectedSize
    ) {
      setShowSizeWarning(true);
      return;
    }
    setShowSizeWarning(false);
    dispatch(addToCart(product, quantity, selectedSize));
    setItemAdded(true);
  }

  // Handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setShowSizeWarning(false);
  };

  const goToCheckout = () => {
    window.location.href = "/cart";
  };

  useEffect(() => {
    dispatch(getProductById(params.id));
    dispatch(getProductReviews(params.id));
    window.scrollTo(0, 0);
  }, [dispatch, params.id]);

  return (
    <div className="product-details-container">
      {loading ? (
        <Loader />
      ) : error ? (
        <Error error="Something went wrong" />
      ) : (
        <div className="row mt-4">
          <div className="col-md-6">
            <div
              className="card mx-3 shadow mb-4 bg-white rounded pb-2"
              style={{ border: "2px solid #e0e0e0" }}
            >
              <ImageWithHotspots
                imageUrl={product.image}
                altText={product.name}
              />
            </div>

            <div className="mt-2 p-2 card mx-2 shadow p-3 mb-5 bg-white rounded">
              <Review product={product} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-details-card">
              {/* Title Section */}
              <div className="product-title-section">
                <h1 className="product-detail-title">{product.name}</h1>

                <div className="product-rating-section">
                  <Rating
                    className="rating-stars"
                    initialRating={product.rating}
                    emptySymbol="fa fa-star-o fa-sm"
                    fullSymbol="fa fa-star fa-sm"
                    readonly={true}
                  />
                  <span className="rating-text">
                    ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
                  </span>
                </div>
              </div>

              {/* Price Section */}
              <div className="product-price-wrapper">
                <div className="price-main">
                  <span className="price-label">Price:</span>
                  <span className="price-currency">₹</span>
                  <span className="price-value">{product.price}</span>
                </div>
                <p className="price-tax-info">Inclusive of all taxes</p>
                <p className="emi-info">
                  <strong>EMI</strong> starting from ₹{" "}
                  {Math.round(product.price / 10)}, <strong>NO COST EMI</strong>{" "}
                  also available
                </p>
              </div>

              {/* Stock Status */}
              {product.countInStock > 0 ? (
                <div className="stock-status-section">
                  <div className="stock-status-badge in-stock">
                    <span className="status-dot"></span>
                    In Stock
                  </div>
                  <div className="stock-count-info">
                    <span className="stock-count-label">Available:</span>
                    <span className="stock-count-value">
                      {product.countInStock}{" "}
                      {product.countInStock === 1 ? "unit" : "units"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="stock-status-badge out-of-stock">
                  <span className="status-dot"></span>
                  Out of Stock
                </div>
              )}

              {/* Available Sizes */}
              {product.available_sizes &&
                product.available_sizes.length > 0 && (
                  <div className="size-selector-section">
                    <label className="size-label">
                      Select Size
                      {selectedSize && (
                        <span className="selected-size-text">
                          - {selectedSize}
                        </span>
                      )}
                    </label>
                    <div className="size-buttons-grid">
                      {product.available_sizes.map((size, index) => (
                        <button
                          key={index}
                          onClick={() => handleSizeSelect(size)}
                          className={`size-button ${
                            selectedSize === size ? "selected" : ""
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              {/* Quantity Selector */}
              <div className="quantity-selector-section">
                <label className="quantity-label">Select Quantity</label>
                <div className="quantity-controls">
                  <button
                    className="quantity-btn minus"
                    onClick={() => quantity > 1 && setquantity(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button
                    className="quantity-btn plus"
                    onClick={() =>
                      quantity < product.countInStock &&
                      setquantity(quantity + 1)
                    }
                    disabled={quantity >= product.countInStock}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Features Grid */}
              <div className="features-grid">
                <div className="feature-item">
                  <PaymentsIcon />
                  <p>Cash On Delivery</p>
                </div>
                <div className="feature-item">
                  <LocalShippingIcon />
                  <p>Fast Delivery</p>
                </div>
                <div className="feature-item">
                  <InventoryIcon />
                  <p>7 Days Replacement</p>
                </div>
                <div className="feature-item">
                  <VerifiedUserIcon />
                  <p>1 Year Warranty</p>
                </div>
              </div>

              <div className="section-divider"></div>

              {/* Size selection warning */}
              {showSizeWarning && (
                <div className="size-warning-alert">
                  <small>
                    ⚠️ Please select a size to add this item to cart
                  </small>
                </div>
              )}

              {/* Action Buttons */}
              {product.countInStock > 0 ? (
                <div className="action-buttons">
                  <button className="btn-add-to-cart" onClick={addtocart}>
                    Add to Cart
                  </button>
                  {itemAdded && (
                    <button className="btn-checkout" onClick={goToCheckout}>
                      Go to Checkout
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <p className="out-of-stock-message">Out of Stock</p>
                  <button className="btn-add-to-cart" disabled>
                    Add to Cart
                  </button>
                </div>
              )}
            </div>

            {/* Product Description */}
            <div className="product-description-card">
              <h2 className="description-title">About this product</h2>
              <p className="description-text">{product.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
