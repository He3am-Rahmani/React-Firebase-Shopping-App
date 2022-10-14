export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "USER_LOGIN_INITIAL_CART":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "CART_ADD_SUCCESS":
      const existingItem = state.cartItems.find(
        (i) => i._id === action.payload._id
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i._id === existingItem._id ? action.payload : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
    case "CART_REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
    case "CART_VIEW_ITEM":
      return {
        cartItems: state,
      };

    default:
      return state;
  }
};
