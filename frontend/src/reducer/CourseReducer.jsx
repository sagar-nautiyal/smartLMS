import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const INTITIALSTATE = {
  currentCourse: null,
  courses: [],
  isLoading: false,
  error: null,
};

export const getCourse = createAsyncThunk(
  "course/getCourse",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/api/courses");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//fetch the current course
export const fetchCurrentCourse = createAsyncThunk(
  "courses/fetchCurrent",
  async ({ courseId }, rejectWithValue) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/courses/${courseId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: INTITIALSTATE,
  reducers: {},
  extraReducers: (builder) => {
    //get all courses
    builder
      .addCase(getCourse.pending, (state, action) => {
        (state.isLoading = true), (state.error = null);
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
        state.error = null;
      })
      .addCase(getCourse.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.payload);
      });
    //fetch current course
    builder
      .addCase(fetchCurrentCourse.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCourse = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const courseReducer = courseSlice.reducer;

export const courseSelector = (state) => state.course;
