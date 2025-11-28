import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../actions/cartActions";
import Checkout from "../components/Checkout";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Cartscreen.css";

export default function Cartscreen() {
  const cartreducerstate = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const { cartItems } = cartreducerstate;

  var subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= item.countInStock) {
      dispatch(addToCart(item, newQuantity, item.size));
    }
  };

  return (
    <div className="cart-page-container">
      <div className="cart-content-wrapper">
        <div className="cart-header">
          <ShoppingCartIcon className="cart-header-icon" />
          <h1 className="cart-title">Shopping Cart</h1>
          <p className="cart-subtitle">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <ShoppingCartIcon className="empty-cart-icon" />
            <h2>Your cart is empty</h2>
            <p>Add some items to get started!</p>
            <a href="/" className="continue-shopping-btn">
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="cart-main-layout">
            <div className="cart-items-section">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="cart-item-card">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <div className="cart-item-price">
                      <span className="currency">₹</span>
                      <span className="amount">{item.price}</span>
                    </div>

                    {item.available_sizes &&
                      item.available_sizes.length > 0 && (
                        <div className="cart-item-size">
                          <label>Size:</label>
                          <select
                            value={item.size || ""}
                            onChange={(e) => {
                              dispatch(deleteFromCart(item));
                              dispatch(
                                addToCart(item, item.quantity, e.target.value)
                              );
                            }}
                            className="size-select"
                          >
                            {item.available_sizes.map((size, i) => (
                              <option key={i} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                  </div>

                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <label className="quantity-label">Quantity:</label>
                      <div className="quantity-selector">
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            handleQuantityChange(item, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="quantity-display">
                          {item.quantity}
                        </span>
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            handleQuantityChange(item, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.countInStock}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-total">
                      <span className="total-label">Total:</span>
                      <div className="total-price">
                        <span className="currency">₹</span>
                        <span className="amount">
                          {item.quantity * item.price}
                        </span>
                      </div>
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() => dispatch(deleteFromCart(item))}
                      aria-label="Remove item"
                    >
                      <DeleteOutlineIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary-section">
              <div className="cart-summary-card">
                <h2 className="summary-title">Order Summary</h2>

                <div className="summary-row">
                  <span className="summary-label">Subtotal</span>
                  <span className="summary-value">₹ {subtotal}</span>
                </div>

                <div className="summary-row">
                  <span className="summary-label">Shipping</span>
                  <span className="summary-value free">FREE</span>
                </div>

                <div className="summary-row">
                  <span className="summary-label">Tax</span>
                  <span className="summary-value">Calculated at checkout</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row total-row">
                  <span className="summary-label">Total</span>
                  <div className="summary-total">
                    <span className="currency">₹</span>
                    <span className="amount">{subtotal}</span>
                  </div>
                </div>

                <Checkout amount={subtotal} />

                <div className="payment-info">
                  <p>
                    <strong>Test Payment Details:</strong>
                  </p>
                  <p>Card: 4242 4242 4242 4242</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
