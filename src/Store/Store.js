import { configureStore } from "@reduxjs/toolkit"
import { pizza_reducer } from "../Slice/PizzaSlice"
import { cart_reducer } from "../Slice/CartSlice"

const store = configureStore({
    reducer : {
        pizza : pizza_reducer,
        cart : cart_reducer
    }
})

export default store