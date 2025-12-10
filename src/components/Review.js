import React, { useState, useEffect } from "react";
import Rating from "react-rating";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addProductReview, getProductReviews } from "../actions/productActions";

export default function Review({ product }) {
  const dispatch = useDispatch();
  const [rating, setrating] = useState(5);
  const [comment, setcomment] = useState("");

  const reviewsState = useSelector((state) => state.getProductReviewsReducer);
  const {
    reviews = [],
    averageRating = 0,
    totalReviews = 0,
    loading,
  } = reviewsState;

  useEffect(() => {
    // Fetch reviews when component mounts or product changes
    if (product && product._id) {
      dispatch(getProductReviews(product._id));
    }
  }, [dispatch, product]);

  function sendreview() {
    if (localStorage.getItem("currentUser")) {
      // Validate comment
      if (!comment.trim()) {
        Swal.fire("Oops", "Please add a comment to your review", "error");
        return;
      }

      const review = {
        rating: rating,
        comment: comment,
      };

      dispatch(addProductReview(review, product._id));
    } else {
      Swal.fire("Oops", "Cannot Review without logging-in", "error").then(
        (result) => {
          window.location.href = "/login";
        }
      );
    }
  }
  const isLoggedIn = localStorage.getItem("currentUser");

  return (
    <>
      <div className="ml-2 ">
        <h2>Give Your Review</h2>

        {averageRating > 0 && (
          <div className="mb-3">
            <Rating
              style={{ color: "orange" }}
              initialRating={averageRating}
              emptySymbol="fa fa-star-o fa-1x"
              fullSymbol="fa fa-star fa-1x"
              readonly
            />
            <span className="ml-2">
              ({averageRating.toFixed(1)} average from {totalReviews} reviews)
            </span>
          </div>
        )}

        {!isLoggedIn && (
          <div className="alert alert-warning" role="alert">
            Please <a href="/login" className="alert-link">login</a> to write a review
          </div>
        )}

        <Rating
          style={{ color: "orange" }}
          initialRating={rating}
          emptySymbol="fa fa-star-o fa-1x"
          fullSymbol="fa fa-star fa-1x"
          onChange={(e) => {
            setrating(e);
          }}
          disabled={!isLoggedIn}
        />

        <input
          type="text"
          className="form-control mt-2"
          placeholder={isLoggedIn ? "Write your review here..." : "Login to write a review"}
          value={comment}
          onChange={(e) => {
            setcomment(e.target.value);
          }}
          disabled={!isLoggedIn}
        />
        <button 
          className="btn mt-3" 
          onClick={sendreview}
          disabled={!isLoggedIn}
          style={{ opacity: !isLoggedIn ? 0.6 : 1, cursor: !isLoggedIn ? 'not-allowed' : 'pointer' }}
        >
          Submit Review
        </button>

        <h2 className="mt-3">Latest Reviews ({totalReviews})</h2>

        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review, index) => {
            return (
              <div key={review._id || index} className="text-left">
                <Rating
                  style={{ color: "orange" }}
                  initialRating={review.rating}
                  emptySymbol="fa fa-star-o fa-1x"
                  fullSymbol="fa fa-star fa-1x"
                  readonly
                />
                <p>{review.comment}</p>
                <p>By : {review.name}</p>
                <hr />
              </div>
            );
          })
        ) : (
          <p>No reviews yet. Be the first to review this product!</p>
        )}
      </div>
    </>
  );
}
