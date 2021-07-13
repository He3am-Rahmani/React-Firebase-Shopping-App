import Axios from "axios";
export const productListAction = () => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });
    const { data } = await Axios.get("https://rocky-lake-08170.herokuapp.com/api/products");

    dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "PRODUCT_LIST_FAILED" , payload: {message:'Operation Failur Try Again',type:'failed'}});
  }
};
export const productDetailAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAIL_REQUEST" });
    const { data } = await Axios.get(
      `https://rocky-lake-08170.herokuapp.com/api/products/${id}`
    );

    dispatch({ type: "PRODUCT_DETAIL_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
