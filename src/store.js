import { createStore , combineReducers  , applyMiddleware} from "redux";
import thunk from "redux-thunk";

const reducer = combineReducers

const initialState = {}

const middleWare = [thunk]

const store =createStore(reducer , initialState,applyMiddleware(...middleWare))

export default store