import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    store: { total_price: 0, cartitems: [] },
  },
  reducers: {
    addtoCart(state, action) {
      const { pizza, varient, quantity } = action.payload;

      //Create a dummy object to hold the pizza items with varient prices
      const new_pizza = {
        _id: pizza._id,
        name: pizza.name,
        image: pizza.imageurl,
        prices : pizza.prices,
        quantity,
        varient,
        price: pizza.prices[varient] * quantity,
      };
      const exsisting_pizza = state.store.cartitems.find(
        (pizza) => pizza._id === new_pizza._id
      );

      if (exsisting_pizza) {
        exsisting_pizza.quantity++;

        exsisting_pizza.price += pizza.prices[varient] * quantity;

        state.store.total_price += new_pizza.price;
      } else {
        state.store.cartitems.push(new_pizza);
        state.store.total_price += new_pizza.price;
      }
    },
    removefromCart(state, action) {},
    singleaddtocart(state, action) {
      const { pizza } = action.payload;
      const exsisting_pizza = state.store.cartitems.find(
        (item) => item._id === pizza._id
      );
      if (exsisting_pizza) {
        exsisting_pizza.quantity++;
        exsisting_pizza.price += pizza.prices[pizza.varient] 
        state.store.total_price += exsisting_pizza.price;
      } 

    },
  },
});

export const { addtoCart, removefromCart, singleaddtocart } = CartSlice.actions;

export const cart_reducer = CartSlice.reducer;
