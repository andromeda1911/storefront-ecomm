import { createSlice, AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { blogService } from "./blogService";


export const getAllBlogs = createAsyncThunk(
  "blog/get",
  async (thunkAPI) => {
    try {
      return blogService.getBlogs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getblogDetails = createAsyncThunk(
  "blog/getDetail",
  async (id,thunkAPI) => {
    try {
      return blogService.getBlogDetails(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const blogState = {
  blog: [],
  singleBlog: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const blogSlice = createSlice({
  name: "blog",
  initialState: blogState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blog = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getblogDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getblogDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleBlog = action.payload;
      })
      .addCase(getblogDetails.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = true;
        state.isSuccess = false;
        state.message = action.error;
      })
  },
});

export default blogSlice.reducer;
