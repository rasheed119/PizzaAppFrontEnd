import { configureStore } from "@reduxjs/toolkit"
import { pizza_reducer } from "../Slice/PizzaSlice"
import { cart_reducer } from "../Slice/CartSlice"
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key : "root",
    storage,
    version : 1
}

const rootReducer = combineReducers({
    pizza : pizza_reducer,
    cart : cart_reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer : persistedReducer
})

export default store