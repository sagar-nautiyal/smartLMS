import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { updateUser } from "../services/userServices";

const getInitialState = () => {
  const token = localStorage.getItem("token");

  return {
    currentUser: null,
    isLoading: true,
    error: null,
    isAuthenticated: !!token,
  };
};

const INTITIALSTATE = getInitialState();
//login
export const loginthunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await axios.post(
        `${apiUrl}/api/users/login`,
        { email, password }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      // 🔑 Replace with your API endpoint
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await axios.post(
        `${apiUrl}/api/users/register`,
        formData
      );
      return res.data; // expected: { user, token }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

//fetching the currentUser
export const fetchCurrentUser = createAsyncThunk(
  "login/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await axios.get(`${apiUrl}/api/users/me`, {
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

//update userInfo

export const updateUserInfo = createAsyncThunk(
  "user/update",
  async ({ name, email }, { rejectWithValue }) => {
    try {
      return await updateUser(name, email);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: INTITIALSTATE,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
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
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
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
    builder
      .addCase(updateUserInfo.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
export const authSelector = (state) => state.auth;
