export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Use cartItemId (which includes size) for comparison instead of just _id
      const alreadyexist = state.cartItems.find(
        (item) => item.cartItemId === action.payload.cartItemId
      );

      if (alreadyexist) {
        // Update existing item (same product and size)
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.cartItemId === action.payload.cartItemId
              ? action.payload
              : item
          ),
        };
      } else {
        // Add new item (different product or different size)
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }

    case "DELETE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => {
          return item.cartItemId !== action.payload.cartItemId;
        }),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
