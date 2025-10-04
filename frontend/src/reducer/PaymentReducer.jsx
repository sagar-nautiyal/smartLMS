import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPaymentIntent } from "../services/paymentService";

const INITIAL_STATE = {
  isLoading: false,
  success: false,
  error: null,
};

export const createPaymentIntentThunk = createAsyncThunk(
  "course/payments",
  async (amount, { rejectWithValue }) => {
    try {
      return await createPaymentIntent(amount);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntentThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPaymentIntentThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(createPaymentIntentThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const paymentReducer = paymentSlice.reducer;

export const paymentSelector = (state) => state.payment;
