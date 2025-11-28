import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../actions/productActions";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "./Filter.css";

export default function Filter() {
  const [searchkey, setsearchkey] = useState("");
  const [category, setcategory] = useState("all");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const dispatch = useDispatch();

  // Debounce search - trigger after user stops typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(filterProducts(searchkey, category));
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(delayDebounceFn);
  }, [searchkey, category, dispatch]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setsearchkey(value);

    // Show suggestions when user types (you can implement API call for suggestions here)
    if (value.length > 0) {
      setShowSuggestions(true);
      // For now, showing the search term as suggestion
      // You can implement actual product suggestions from API
      setSuggestions([value]);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const clearSearch = () => {
    setsearchkey("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleCategoryChange = (e) => {
    setcategory(e.target.value);
  };

  return (
    <div className="filter-container">
      <div className="filter-wrapper">
        {/* Search Box with Typeahead */}
        <div className="search-box-container" ref={searchRef}>
          <div className="search-input-wrapper">
            <SearchIcon className="search-icon" />
            <input
              value={searchkey}
              onChange={handleSearchChange}
              type="text"
              placeholder="Search for products..."
              className="search-input"
              onFocus={() => searchkey.length > 0 && setShowSuggestions(true)}
            />
            {searchkey && (
              <CloseIcon className="clear-icon" onClick={clearSearch} />
            )}
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => {
                    setsearchkey(suggestion);
                    setShowSuggestions(false);
                  }}
                >
                  <SearchIcon fontSize="small" />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="category-select-wrapper">
          <select
            className="category-select"
            value={category}
            onChange={handleCategoryChange}
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
    </div>
  );
}
