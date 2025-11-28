export const addToCart =
  (product, quantity, size = null) =>
  (dispatch, getState) => {
    const actualSize = size || product.size || null;

    const cartItem = {
      name: product.name,
      _id: product._id,
      price: product.price,
      countInStock: product.countInStock,
      quantity: quantity,
      image: product.image,
      category: product.category,
      size: actualSize,
      available_sizes: product.available_sizes || [],
      // Create a unique cart item ID combining product ID and size
      cartItemId: actualSize ? `${product._id}_${actualSize}` : product._id,
    };

    dispatch({ type: "ADD_TO_CART", payload: cartItem });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartReducer.cartItems)
    );
  };

export const deleteFromCart = (item) => (dispatch, getState) => {
  dispatch({ type: "DELETE_FROM_CART", payload: item });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: "CLEAR_CART" });
  localStorage.removeItem("cartItems");
};
