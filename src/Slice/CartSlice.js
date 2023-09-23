import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartitems: [],
    total_price: 0,
  },
  reducers: {
    addtoCart(state, action) {
      const { pizza, varient, quantity } = action.payload;

      //Create a dummy object to hold the pizza items with varient prices
      const new_pizza = {
        ...pizza,
        quantity,
        varient,
        price: pizza.prices[varient] * quantity,
      };
      const exsisting_pizza = state.cartitems.find(
        (pizza) => pizza._id === new_pizza._id
      );

      if (exsisting_pizza) {
        exsisting_pizza.quantity++;

        exsisting_pizza.price += pizza.prices[varient] * quantity;

        state.total_price += new_pizza.price;
      } else {
        state.cartitems.push(new_pizza);
        state.total_price += new_pizza.price;
      }
    },
    removefromCart(state, action) {},
  },
});

export const { addtoCart, removefromCart } = CartSlice.actions;

export const cart_reducer = CartSlice.reducer;
