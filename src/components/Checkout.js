import React, { useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/orderActions";
import { clearCart } from "../actions/cartActions";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import PaymentIcon from "@mui/icons-material/Payment";
import "./Checkout.css";

export default function Checkout({ amount }) {
  const dispatch = useDispatch();
  const orderstate = useSelector((state) => state.placeOrderReducer);

  const { loading, success, error } = orderstate;

  function tokenHandler(token) {
    // Double-check authentication before processing payment
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "/login";
      return;
    }
    console.log(token);
    dispatch(placeOrder(token, amount));
  }

  function validate(e) {
    // Prevent default behavior if user is not logged in
    if (!localStorage.getItem("currentUser")) {
      e.preventDefault();
      window.location.href = "/login";
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (success) {
      dispatch(clearCart());
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  }, [success, dispatch]);

  return (
    <div className="checkout-container">
      {loading && <Loader />}
      {success && (
        <Success success="Your Order Placed Successfully! Redirecting to home..." />
      )}
      {error && <Error error="Something Went wrong" />}

      <StripeCheckout
        token={tokenHandler}
        amount={amount * 100}
        shippingAddress
        currency="INR"
        stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
      >
        <button className="modern-checkout-btn" onClick={validate}>
          <PaymentIcon className="checkout-icon" />
          <span>Proceed to Payment</span>
        </button>
      </StripeCheckout>
    </div>
  );
}
