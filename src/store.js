import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  productListReducer,
  productDetailReducer,
} from "./reducer/productReducer";

import { userLoginReducer } from "./reducer/userReducer";

import { cartReducer } from "./reducer/cartReducer";

const persistConfig = {
  key: "main-store",
  storage,
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  currentUser: userLoginReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT_SUCCESS") {
    storage.removeItem("persist:root");
    return reducer(undefined, action);
  }

  return reducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const Persistor = persistStore(store);

export { Persistor };
export default store;
