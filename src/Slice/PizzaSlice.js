import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../Config/Config";

const token = window.localStorage.getItem("token");

export const fetchallpizza = createAsyncThunk("fetchallpizza", async (x,thunkAPI) => {
  try {
    const response = await axios.get(`${api}/pizza/all`, {
      headers: { token },
    });
    return response.data.pizzas;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
const Pizza_Slice = createSlice({
  name: "Pizza",
  initialState: {
    pizza: [],
    isLoading: false,
    isError: false,
    error : ""
  },
  extraReducers: (builder) => {
    builder.addCase(fetchallpizza.fulfilled, (state, action) => {
      state.isError = false;
      state.error="";
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
});

export const pizza_reducer = Pizza_Slice.reducer;
