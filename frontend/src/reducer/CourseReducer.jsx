import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { filterCategories } from "../services/Categories";
import axios from "axios";

const INTITIALSTATE = {
  currentCourse: null,
  courses: [],
  isLoading: false,
  error: null,
  userCourses: [],
};

export const getCourse = createAsyncThunk(
  "course/getCourse",
  async (_, { rejectWithValue }) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await axios.get(`${apiUrl}/api/courses`);
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
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await axios.get(
        `${apiUrl}/api/courses/${courseId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

//fetch courses user is enrolled
export const fetchUserCourses = createAsyncThunk(
  "courses/fetchUserCourses",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await axios.get(
        `${apiUrl}/api/courses/my-courses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue("Error while fetching user Course: ", err);
    }
  }
);

//fetch filtered courses
export const fetchFilteredCourses = createAsyncThunk(
  "courses/filter",
  async (filters, { rejectWithValue }) => {
    try {
      return await filterCategories(filters);
    } catch (err) {
      return rejectWithValue(err.message);
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
      .addCase(getCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
        state.error = null;
      })
      .addCase(getCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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
    builder
      .addCase(fetchUserCourses.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userCourses = action.payload;
        state.error = null;
      })
      .addCase(fetchUserCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    //fetch filters course
    builder
      .addCase(fetchFilteredCourses.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFilteredCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
        state.error = null;
      })
      .addCase(fetchFilteredCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const courseReducer = courseSlice.reducer;

export const courseSelector = (state) => state.course;
