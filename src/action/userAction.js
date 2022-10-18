import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";
import axios from "axios";

export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" });
    const { data } = await axios.post("https://no1-shop.herokuapp.com/api/login", {
      key: "WHO_THE_HELL_IS_NO1",
      email: email,
      password: password,
    });

    if (data.message.type === "success")
      dispatch({
        type: "USER_LOGIN_INITIAL_CART",
        payload: data.data.cartItems,
      });
    console.log(data);
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: {
        _id: data.data._id,
        displayName: data.data.displayName,
        photoURL: data.data.photoURL,
        phoneNumber: data.data.phoneNumber,
        email: data.data.email,
        comments: data.data.comments,
        cartItems: data.data.cartItems,
        userName: data.data.userName,
        joinDate: data.data.joinDate,
        haveContactToken: data.data.haveContactToken,
      },
    });
    return data;
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAILED",
      payload: { message: error.message, type: "failed" },
    });
    return {
      message: { type: "failed", message: "Email Or Password Inccorect" },
    };
  }
};
export const userLogoutAction = () => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGOUT_REQUEST" });
    await auth.signOut();

    dispatch({ type: "USER_LOGOUT_SUCCESS", payload: {} });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserProfileStateAction = () => {};

export const createUserAction =
  (userName, displayName, email, password) => async (dispatch) => {
    let userData;
    try {
      dispatch({ type: "USER_CREATE_NEW_USER_REQUEST" });
      const { data } = await axios.post("https://no1-shop.herokuapp.com/api/signup", {
        key: "WHO_THE_HELL_IS_NO1",
        userName: userName,
        email: email,
        displayName: displayName,
        password: password,
      });

      if (data.message.type === "success") {
        userData = dispatch(userLoginAction(email, password));
      } else {
        userData = data;
      }

      return userData ? userData : data;
    } catch (error) {
      console.log(error);
    }
  };

export const updateUserProfileAction =
  (userId, { email, password, photoURL, displayName, userName }) =>
  async (dispatch) => {
    console.log({
      userId: userId,
      email: email,
      password: password,
      phoyoURL: photoURL,
      displayName: displayName,
      userName: userName,
    });

    let userData;
    try {
      dispatch({ type: "REQUEST_UPDATE_PROFILE" });
      const { data } = await axios.post(
        "https://no1-shop.herokuapp.com/api/update-profile",
        {
          key: "WHO_THE_HELL_IS_NO1",
          actionType: "UPDATE_PROFILE",
          userId: userId,
          userName: userName,
          email: email,
          displayName: displayName,
          password: password,
          photoURL: photoURL,
        }
      );
      console.log(data);
      if (data.message.type === "success") {
        dispatch({
          type: "USER_LOGIN_SUCCESS",
          payload: {
            _id: data.data._id,
            displayName: data.data.displayName,
            photoURL: data.data.photoURL,
            phoneNumber: data.data.phoneNumber,
            email: data.data.email,
            comments: data.data.comments,
            cartItems: data.data.cartItems,
            userName: data.data.userName,
            joinDate: data.data.joinDate,
            haveContactToken: data.data.haveContactToken,
          },
        });
        // dispatch(updateUserProfileStateAction(data.data.email, data.data.password));
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };
