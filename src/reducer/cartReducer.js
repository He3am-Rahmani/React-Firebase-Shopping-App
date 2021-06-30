export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const item = action.paylod;

      const existingItem = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === existingItem.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case "CART_REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
    case 'CART_VIEW_ITEM':
      return {
        cartItems : state 
      }

    default:
      return state;
  }
};
