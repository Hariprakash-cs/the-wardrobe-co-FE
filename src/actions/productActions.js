import axios from "axios";
import { config } from "../config";
import {
  contentstackAPI,
  transformProductEntries,
} from "../services/contentstackAPI";

// Content Type UID for products in Contentstack
const PRODUCTS_CONTENT_TYPE = "home"; // Home page products content type

export const getAllProducts = () => async (dispatch) => {
  dispatch({ type: "GET_PRODUCTS_REQUEST" });

  try {
    // Fetch products from Contentstack CMS
    const result = await contentstackAPI.getEntriesByContentType(
      PRODUCTS_CONTENT_TYPE
    );

    if (result.success) {
      // Transform CMS entries to match product format
      const products = transformProductEntries(result.data);
      console.log("✅ Loaded products from Contentstack:", products);

      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: products });
    } else {
      throw new Error(result.error || "Failed to fetch products from CMS");
    }
  } catch (err) {
    console.error("❌ Error fetching products from CMS:", err);
    dispatch({ type: "GET_PRODUCTS_FAILED", payload: err });
  }
};

export const getProductById = (productid) => async (dispatch) => {
  dispatch({ type: "GET_PRODUCTBYID_REQUEST" });

  try {
    // Fetch specific product entry from Contentstack CMS by UID
    const result = await contentstackAPI.getEntryByUid(
      PRODUCTS_CONTENT_TYPE,
      productid
    );

    if (result.success) {
      // Transform CMS entry to match product format
      const { transformProductEntry } = await import(
        "../services/contentstackAPI"
      );
      const product = transformProductEntry(result.data);
      console.log("✅ Loaded product from Contentstack:", product);

      dispatch({ type: "GET_PRODUCTBYID_SUCCESS", payload: product });
    } else {
      throw new Error(result.error || "Failed to fetch product from CMS");
    }
  } catch (err) {
    console.error("❌ Error fetching product from CMS:", err);
    dispatch({ type: "GET_PRODUCTBYID_FAILED", payload: err });
  }
};

export const filterProducts = (searchKey, category) => async (dispatch) => {
  var filteredproducts;
  dispatch({ type: "GET_PRODUCTS_REQUEST" });

  try {
    // Fetch all products from Contentstack CMS
    const result = await contentstackAPI.getEntriesByContentType(
      PRODUCTS_CONTENT_TYPE
    );

    if (!result.success) {
      throw new Error(result.error || "Failed to fetch products from CMS");
    }

    // Transform CMS entries to match product format
    let products = transformProductEntries(result.data);
    filteredproducts = products;

    // Apply search filter
    if (searchKey) {
      filteredproducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchKey.toLowerCase());
      });
    }

    // Apply category filter (exact match)
    if (category !== "all") {
      filteredproducts = filteredproducts.filter((product) => {
        return product.category === category;
      });
    }

    dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: filteredproducts });
  } catch (err) {
    console.error("❌ Error filtering products from CMS:", err);
    dispatch({ type: "GET_PRODUCTS_FAILED" });
  }
};

export const addProductReview = (review, productid) => (dispatch, getState) => {
  dispatch({ type: "ADD_PRODUCT_REVIEW_REQUEST" });
  const currentUser = getState().loginReducer.currentUser;
  axios
    .post(`${config.api}/api/products/addreview`, {
      review,
      productid,
      currentUser,
    })
    .then((res) => {
      console.log(res);
      dispatch({ type: "ADD_PRODUCT_REVIEW_SUCCESS" });
      // Reload to fetch updated reviews
      window.location.reload();
    })
    .catch((err) => {
      console.error("Error adding review:", err);
      dispatch({ type: "ADD_PRODUCT_REVIEW_FAILED", payload: err });
    });
};

export const getProductReviews = (productid) => async (dispatch) => {
  dispatch({ type: "GET_PRODUCT_REVIEWS_REQUEST" });

  try {
    const response = await axios.get(
      `${config.api}/api/products/getreviews/${productid}`
    );
    dispatch({
      type: "GET_PRODUCT_REVIEWS_SUCCESS",
      payload: {
        reviews: response.data.reviews,
        averageRating: response.data.averageRating,
        totalReviews: response.data.totalReviews,
      },
    });
  } catch (err) {
    console.error("Error fetching reviews:", err);
    dispatch({ type: "GET_PRODUCT_REVIEWS_FAILED", payload: err });
  }
};

export const checkUserReview = async (productid, userid) => {
  try {
    const response = await axios.post(
      `${config.api}/api/products/checkreview`,
      {
        productid,
        userid,
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error checking user review:", err);
    return { hasReviewed: false };
  }
};

export const deleteProduct = (productid) => (dispatch) => {
  dispatch({ type: "DELETE_PRODUCT_REQUEST" });

  axios
    .post(`${config.api}/api/products/deleteproduct`, { productid })
    .then((res) => {
      dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: res.data });
      alert("Product deleted successfully");
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: "DELETE_PRODUCT_FAILED", payload: err });
    });
};

export const addProduct = (product) => (dispatch) => {
  dispatch({ type: "ADD_PRODUCT_REQUEST" });

  axios
    .post(`${config.api}/api/products/addproduct`, { product })
    .then((res) => {
      console.log(res);
      dispatch({ type: "ADD_PRODUCT_SUCCESS" });
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: "ADD_PRODUCT_FAILED" });
    });
};

export const updateProduct = (productid, updatedproduct) => (dispatch) => {
  dispatch({ type: "UPDATE_PRODUCT_REQUEST" });

  axios
    .post(`${config.api}/api/products/updateproduct`, {
      productid,
      updatedproduct,
    })
    .then((res) => {
      console.log(res);
      dispatch({ type: "UPDATE_PRODUCT_SUCCESS" });
      window.location.href = "/admin/productslist";
    })
    .catch((err) => {
      dispatch({ type: "UPDATE_PRODUCT_FAILED" });
    });
};
