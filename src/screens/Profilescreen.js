import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, logoutUser } from "../actions/userActions";
import { getOrdersByUserId } from "../actions/orderActions";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";
import { ToastContainer, toast } from "react-toastify";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import EditIcon from "@mui/icons-material/Edit";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "./Profilescreen.css";

export default function Profilescreen() {
  const loginstate = useSelector((state) => state.loginReducer);
  const updateuserstate = useSelector((state) => state.updateReducer);
  const orderstate = useSelector((state) => state.getOrdersByUserIdReducer);

  const currentUser = loginstate.currentUser;
  const { loading, success, error } = updateuserstate;
  const { orders, error: ordersError, loading: ordersLoading } = orderstate;

  const dispatch = useDispatch();

  // Check for tab query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get("tab");

  const [activeTab, setActiveTab] = useState(
    tabParam === "orders" ? "orders" : "profile"
  );
  const [name, setname] = useState(currentUser.name);
  const [email, setemail] = useState(currentUser.email);
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const notify = () =>
    toast.success("Profile Updated, Kindly Login", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  function update(e) {
    e.preventDefault();
    if (password === cpassword) {
      const updateduser = {
        name: name,
        email: email,
        password: password,
      };
      dispatch(updateUser(currentUser._id, updateduser));
    } else {
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      dispatch(getOrdersByUserId());
    } else {
      window.location.href = "/login";
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="profile-page-container">
        <div className="profile-content-wrapper">
          {/* Header */}
          <div className="profile-header">
            <button
              className="logout-button-header"
              onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) {
                  dispatch(logoutUser());
                }
              }}
              title="Logout"
            >
              <ExitToAppIcon className="logout-icon" />
              <span>Logout</span>
            </button>
            <div className="profile-avatar">
              <PersonIcon className="avatar-icon" />
            </div>
            <h1 className="profile-name">{currentUser.name}</h1>
            <p className="profile-email">{currentUser.email}</p>
          </div>

          {/* Tabs */}
          <div className="profile-tabs">
            <button
              className={`tab-button ${
                activeTab === "profile" ? "active" : ""
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <EditIcon className="tab-icon" />
              <span>Edit Profile</span>
            </button>
            <button
              className={`tab-button ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <ShoppingBagIcon className="tab-icon" />
              <span>My Orders</span>
              {orders && orders.length > 0 && (
                <span className="orders-count">{orders.length}</span>
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === "profile" && (
              <div className="profile-edit-section">
                <div className="profile-card">
                  <h2 className="section-title">Update Profile</h2>

                  {loading && <Loader />}
                  {error && <Error error="Something went wrong" />}
                  {success && (
                    <Success success="Your Details updated successfully, please re-login" />
                  )}

                  <form onSubmit={update} className="profile-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="modern-input"
                        required
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="modern-input"
                        value={email}
                        required
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="modern-input"
                        value={password}
                        required
                        onChange={(e) => setpassword(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="modern-input"
                        value={cpassword}
                        required
                        onChange={(e) => setcpassword(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="update-button"
                      onClick={notify}
                    >
                      <EditIcon className="button-icon" />
                      Update Profile
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="orders-section">
                {ordersLoading && <Loader />}
                {ordersError && <Error error="Failed to load orders" />}

                {orders && orders.length === 0 ? (
                  <div className="empty-orders">
                    <ShoppingBagIcon className="empty-icon" />
                    <h2>No Orders Yet</h2>
                    <p>Start shopping to see your orders here!</p>
                    <a href="/" className="shop-now-btn">
                      Start Shopping
                    </a>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders &&
                      orders.map((order) => (
                        <div key={order._id} className="order-card">
                          <div className="order-header">
                            <div className="order-id-section">
                              <h3 className="order-id">
                                Order #{order._id.substring(0, 12)}...
                              </h3>
                              <p className="order-date">
                                {new Date(order.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                            <div className="order-status">
                              {order.isDelivered ? (
                                <span className="status-badge delivered">
                                  <CheckCircleIcon className="status-icon" />
                                  Delivered
                                </span>
                              ) : (
                                <span className="status-badge pending">
                                  <PendingIcon className="status-icon" />
                                  Order Placed
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="order-items">
                            {order.orderItems.map((item, index) => (
                              <a
                                key={index}
                                href={`/product/${item._id}`}
                                className="order-item-link"
                              >
                                <div className="order-item">
                                  {item.image && (
                                    <div className="item-image">
                                      <img src={item.image} alt={item.name} />
                                    </div>
                                  )}
                                  <div className="item-details">
                                    <h4 className="item-name">{item.name}</h4>
                                    <div className="item-meta">
                                      {item.category && (
                                        <span className="item-category">
                                          {item.category}
                                        </span>
                                      )}
                                      {item.size && (
                                        <span className="item-size">
                                          Size: {item.size}
                                        </span>
                                      )}
                                      <span className="item-quantity">
                                        Qty: {item.quantity}
                                      </span>
                                    </div>
                                    <div className="item-price">
                                      <span className="currency">₹</span>
                                      <span className="amount">
                                        {item.price}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>

                          <div className="order-footer">
                            <div className="shipping-address">
                              <LocalShippingIcon className="shipping-icon" />
                              <div className="address-text">
                                <p className="address-label">
                                  Shipping Address:
                                </p>
                                <p className="address-details">
                                  {order.shippingAddress.address},{" "}
                                  {order.shippingAddress.city},{" "}
                                  {order.shippingAddress.country}
                                </p>
                              </div>
                            </div>
                            <div className="order-total">
                              <span className="total-label">Total Amount:</span>
                              <div className="total-amount">
                                <span className="currency">₹</span>
                                <span className="amount">
                                  {order.orderAmount}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="order-transaction">
                            <p>
                              <strong>Transaction ID:</strong>{" "}
                              {order.transactionId}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
