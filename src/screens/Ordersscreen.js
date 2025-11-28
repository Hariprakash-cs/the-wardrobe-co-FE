import React, { useEffect } from "react";

export default function Ordersscreen() {
  useEffect(() => {
    // Redirect to profile page with orders tab
    window.location.href = "/profile?tab=orders";
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontSize: "1.2rem",
        color: "#718096",
      }}
    >
      Redirecting to your orders...
    </div>
  );
}
