import Axios from "axios";
export const productListAction = () => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });
    const { data } = await Axios.get(
      "https://no1-shop.herokuapp.com/api/products"
    );

    dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "PRODUCT_LIST_FAILED",
      payload: { message: "Operation Failur Try Again", type: "failed" },
    });
  }
};
export const productDetailAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAIL_REQUEST" });
    const { data } = await Axios.get(
      `https://no1-shop.herokuapp.com/api/products/${id}`
    );

    dispatch({ type: "PRODUCT_DETAIL_SUCCESS", payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const formatProductDetails = () => async (dispatch) => {
  try {
    dispatch({ type: "FORMAT_PRODUCT_DETAIL_REQUEST", payload: {} });
    dispatch({
      type: "FORMAT_PRODUCT_DETAIL_SUCCESS",
      payload: {},
    });
  } catch (error) {
    console.log(error);
  }
};
