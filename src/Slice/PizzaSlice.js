import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../Config/Config";

const token = window.localStorage.getItem("token");

export const fetchallpizza = createAsyncThunk("fetchallpizza", async () => {
  const response = await axios.get(`${api}/pizza/all`, {
    headers: { token },
  });
  return response.data.pizzas;
});

const Pizza_Slice = createSlice({
  name: "Pizza",
  initialState: {
    pizza: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchallpizza.fulfilled, (state, action) => {
      state.pizza = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchallpizza.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchallpizza.rejected, (state, action) => {
      console.log("Error ,", action.payload);
      state.isError = true;
    });
  },
});

export const pizza_reducer = Pizza_Slice.reducer;
