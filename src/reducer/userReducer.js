export const userLoginReducer = (state = { currentUser: {} }, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true, currentUser: {} };

    case "USER_LOGIN_SUCCESS":
      return {
        loading: false,
        currentUser: action.payload,
      };

    case "USER_LOGIN_FAILED":
      return { loading: false, currentUser: action.payload };
    case "USER_LOGOUT_REQUEST":
      return { loading: true, ...state };

    case "USER_LOGOUT_SUCCESS":
      return { loading: false, currentUser: {}, ...state };

    default:
      return state;
  }
};
