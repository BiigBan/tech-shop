import { applyMiddleware, combineReducers} from "redux";
import {legacy_createStore as createStore}  from 'redux'
import thunk from "redux-thunk";
import productReducer from "./productReducer";

const combinedStore = combineReducers({
    product: productReducer,
})


const store = createStore(combinedStore, applyMiddleware(thunk));

window.store = store;

export default store;

