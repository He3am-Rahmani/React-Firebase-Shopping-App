import axios from "axios";

export const addToCart = (userId, product) => async (dispatch, getState) => {
  const data = await axios.post(
    "https://no1-shop.herokuapp.com/api/add-product-to-cart",
    {
      key: "WHO_THE_HELL_IS_NO1",
      userId: userId,
      product: product,
    }
  );
  if (data.data.message.type === "success") {
    dispatch({
      type: "CART_ADD_SUCCESS",
      payload: product,
    });
  }

  return data;

  // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: "CART_REMOVE_ITEM",
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const viewCart = () => async (dispatch, getState) => {
  const { data } = await axios.get(
    `https://no1-shop.herokuapp.com/api/products/`
  );

  dispatch({
    type: "CART_VIEW_ITEM",
    paylod: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
