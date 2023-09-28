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
        prices: pizza.prices,
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
    removefromCart(state, action) {
      const { pizza } = action.payload;
      const existingPizzaIndex = state.store.cartitems.findIndex(
        (item) => item._id === pizza._id
      );

      if (existingPizzaIndex !== -1) {
        const existingPizza = state.store.cartitems[existingPizzaIndex];

        if (existingPizza.quantity > 1) {
          existingPizza.quantity--;
          existingPizza.price -= existingPizza.prices[existingPizza.varient];
          state.store.total_price -=
            existingPizza.prices[existingPizza.varient];
        } else {
          state.store.total_price -=
            existingPizza.prices[existingPizza.varient];
          state.store.cartitems.splice(existingPizzaIndex, 1);
        }
      }
    },
    singleaddtocart(state, action) {
      const { pizza } = action.payload;
      const exsisting_pizza = state.store.cartitems.find(
        (item) => item._id === pizza._id
      );
      if (exsisting_pizza) {
        exsisting_pizza.quantity++;
        exsisting_pizza.price += pizza.prices[pizza.varient];
        state.store.total_price += pizza.prices[pizza.varient];
      }
    },
    singleremovefromcart(state, action) {
      const { pizza } = action.payload;
      const existingPizzaIndex = state.store.cartitems.findIndex(
        (item) => item._id === pizza._id
      );
      const existingPizza = state.store.cartitems[existingPizzaIndex];
      state.store.total_price -= existingPizza.price;
      state.store.cartitems.splice(existingPizzaIndex, 1);
    },
  },
});

export const {
  addtoCart,
  removefromCart,
  singleaddtocart,
  singleremovefromcart,
} = CartSlice.actions;

export const cart_reducer = CartSlice.reducer;
