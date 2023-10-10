import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productTagService from "./productTagService";

export const getTags = createAsyncThunk(
  "productTags/get-tags",
  async (thunkAPI) => {
    try {
      return await productTagService.getProductTags();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("RevertAll");

const initialState = {
  productTags: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const productTagSlice = createSlice({
  name: "productTag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTags.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tags = action.payload;
      })
      .addCase(getTags.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default productTagSlice.reducer;
