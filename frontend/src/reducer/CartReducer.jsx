import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { buildApiUrl } from "../config/apiConfig";

// Base URL for cart endpoints
const getCartApiUrl = (endpoint = "") => {
  return buildApiUrl(`cart${endpoint ? `/${endpoint}` : ""}`);
};

// Thunks
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(getCartApiUrl(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to fetch cart"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ courseId, quantity = 1 }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        getCartApiUrl(courseId),
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to add to cart"
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ courseId, quantity }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        getCartApiUrl(courseId),
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to update cart"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (courseId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(getCartApiUrl(courseId), {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to remove from cart"
      );
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    courses: [],
    totalItems: 0,
    totalPrice: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearCartState: (state) => {
      state.courses = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.courses;
        state.totalItems = state.courses.reduce(
          (sum, c) => sum + c.quantity,
          0
        );
        state.totalPrice = state.courses.reduce(
          (sum, c) => sum + c.price * c.quantity,
          0
        );
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state, action) => {
        // Optimistic update - add course to cart immediately
        const { courseId, quantity = 1 } = action.meta.arg;
        const existingItem = state.courses.find((c) => c.courseId._id === courseId);
        
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          // For optimistic update, we need course info - this will be corrected when fulfilled
          state.courses.push({
            courseId: { _id: courseId },
            quantity,
            price: 0 // Will be updated when fulfilled
          });
        }
        
        // Recalculate totals
        state.totalItems = state.courses.reduce((sum, c) => sum + c.quantity, 0);
        state.totalPrice = state.courses.reduce((sum, c) => sum + c.price * c.quantity, 0);
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        // Replace with actual data from server
        state.courses = action.payload.courses;
        state.totalItems = action.payload.totalItems || state.courses.reduce((sum, c) => sum + c.quantity, 0);
        state.totalPrice = action.payload.totalPrice || state.courses.reduce((sum, c) => sum + c.price * c.quantity, 0);
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        // Backend now returns the full updated cart
        state.courses = action.payload.courses;
        state.totalItems = action.payload.totalItems;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        // Backend now returns the full updated cart
        state.courses = action.payload.courses;
        state.totalItems = action.payload.totalItems;
        state.totalPrice = action.payload.totalPrice;
      });
  },
});

export const cartReducer = cartSlice.reducer;
export const { clearCartState } = cartSlice.actions;
export const cartSelector = (state) => state.cart;
export default cartSlice.reducer;
