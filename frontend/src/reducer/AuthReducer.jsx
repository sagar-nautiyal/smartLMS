import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getInitialState = () => {
  const token = localStorage.getItem("token");

  return {
    currentUser: null,
    isLoading: false,
    error: null,
    isAuthenticated: !!token,
  };
};

const INTITIALSTATE = getInitialState();
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

//fetching the currentUser
export const fetchCurrentUser = createAsyncThunk(
  "login/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginthunk.pending, (state, action) => {
        state.isAuthenticated = false;
        state.error = null;
        state.isLoading = true;
      })
      .addCase(loginthunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
        state.error = false;
      })
      .addCase(loginthunk.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchCurrentUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
export const authSelector = (state) => state.auth;
