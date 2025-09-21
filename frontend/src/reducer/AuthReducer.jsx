import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const INTITIALSTATE = {
  currentUser: null,
  user: [],
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const loginthunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        { email, password }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: INTITIALSTATE,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {},
});

export const authReducer = authSlice.reducer;

export const authSelector = (state) => state.auth;
