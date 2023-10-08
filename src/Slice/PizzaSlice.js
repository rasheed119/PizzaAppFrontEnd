import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../Config/Config";

const json_token = localStorage.getItem("user_data");
const parse_token = JSON.parse(json_token);
const token = parse_token ? parse_token.token : "";

export const fetchallpizza = createAsyncThunk(
  "fetchallpizza",
  async (x, thunkAPI) => {
    try {
      const response = await axios.get(`${api}/pizza/all`, {
        headers: { token },
      });
      return response.data.pizzas;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
const Pizza_Slice = createSlice({
  name: "Pizza",
  initialState: {
    pizza: [],
    isLoading: false,
    isError: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchallpizza.fulfilled, (state, action) => {
      state.isError = false;
      state.error = "";
      state.pizza = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchallpizza.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchallpizza.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
  reducers: {
    delete_one_pizza(state, action) {
      const { id } = action.payload;
      const find_pizza = state.pizza.findIndex((item) => item._id === id);
      state.pizza.splice(find_pizza, 1);
    },
  },
});

export const { delete_one_pizza } = Pizza_Slice.actions;

export const pizza_reducer = Pizza_Slice.reducer;
