import React, { useEffect, useState, useRef, useCallback } from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Error from "../components/Error";
import "./Homescreen.css";

export default function Homescreen() {
  const getallproductsstate = useSelector(
    (state) => state.getAllProductsReducer
  );

  const { loading, products, error } = getallproductsstate;

  const dispatch = useDispatch();

  // Infinite scroll state
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  const ITEMS_PER_PAGE = 12;

  // Load initial products
  useEffect(() => {
    dispatch(getAllProducts());
    window.scrollTo(0, 0);
  }, [dispatch]);

  // Update displayed products when products change or page changes
  useEffect(() => {
    if (products && products.length > 0) {
      const startIndex = 0;
      const endIndex = page * ITEMS_PER_PAGE;
      const newDisplayedProducts = products.slice(startIndex, endIndex);

      setDisplayedProducts(newDisplayedProducts);
      setHasMore(endIndex < products.length);
    } else {
      setDisplayedProducts([]);
      setHasMore(false);
    }
  }, [products, page]);

  // Reset page when products change (from filter)
  useEffect(() => {
    setPage(1);
  }, [products]);

  // Intersection Observer for infinite scroll
  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    },
    [hasMore, loading]
  );

  useEffect(() => {
    const element = observerTarget.current;
    const option = {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  return (
    <div className="homescreen-container">
      <div className="container-fluid px-4">
        <div className="row justify-content-center">
          {loading && displayedProducts.length === 0 ? (
            <Loader />
          ) : error ? (
            <Error error="Something went wrong..." />
          ) : displayedProducts.length === 0 ? (
            <div className="col-12 text-center mt-5">
              <h4 style={{ color: "#666" }}>No products found</h4>
              <p style={{ color: "#999" }}>Try adjusting your filters</p>
            </div>
          ) : (
            <>
              {displayedProducts.map((product) => (
                <div
                  key={product._id}
                  className="col-lg-3 col-md-4 col-sm-6 mb-4"
                >
                  <Product product={product} />
                </div>
              ))}

              {/* Loading indicator for infinite scroll */}
              {hasMore && (
                <div ref={observerTarget} className="col-12 text-center py-4">
                  <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}

              {/* Hidden observer target when no more items */}
              {!hasMore && displayedProducts.length > 0 && (
                <div ref={observerTarget} style={{ height: "1px" }}></div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
