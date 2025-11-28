import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../actions/productActions";
import SearchIcon from "@mui/icons-material/Search";
import "./Filter1.css";

export default function Filter1() {
  const [searchkey, setsearchkey] = useState("");
  const [category, setcategory] = useState("all");
  const dispatch = useDispatch();

  // Debounce search - trigger after user stops typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(filterProducts(searchkey, category));
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(delayDebounceFn);
  }, [searchkey, category, dispatch]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        gap: "15px",
        alignItems: "center",
      }}
    >
      <div style={{ flex: "1", maxWidth: "400px" }}>
        <div
          style={{
            position: "relative",
            // display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "14px",
              top: "0",
              bottom: "0",
              display: "flex",
              alignItems: "center",
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            <SearchIcon
              style={{
                color: "#666",
                fontSize: "20px",
              }}
            />
          </div>
          <input
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            type="text"
            placeholder="Search products..."
            className="form-control"
            style={{
              paddingLeft: "44px",
              paddingRight: "14px",
              height: "40px",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              fontSize: "14px",
              width: "100%",
              boxShadow: "none",
              marginTop: "0px !important",
            }}
          />
        </div>
      </div>

      <div style={{ width: "200px", position: "relative" }}>
        <select
          className="modern-category-select"
          value={category}
          onChange={(e) => {
            setcategory(e.target.value);
          }}
        >
          <option value="all">All Categories</option>
          <option value="Shirts">Shirts</option>
          <option value="T Shirts">T Shirts</option>
          <option value="Trousers">Trousers</option>
          <option value="Jackets">Jackets</option>
          <option value="Sweaters">Sweaters</option>
          <option value="Jeans">Jeans</option>
          <option value="Hoodies">Hoodies</option>
          <option value="Shorts">Shorts</option>
          <option value="Shoes">Shoes</option>
        </select>
      </div>
    </div>
  );
}
