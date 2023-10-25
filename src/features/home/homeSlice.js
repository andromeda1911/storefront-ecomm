import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import homeService from "./homeService";

export const getHomeImages = createAsyncThunk(
  "homeImage/get-homeimages",
  async (thunkAPI) => {
    try {
      return await homeService.getHomeBanners();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("RevertAll");

const initialState = {
    homeImages: [],
    title: "",
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};
export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomeImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHomeImages.fulfilled, (state, action) => {
        state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.homeTitle = action.payload[0].title;
          state.homeId = action.payload[0]._id;
          state.homeImages = action.payload[0].images;
      })
      .addCase(getHomeImages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default homeSlice.reducer;
