import { createSlice, AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { productService } from "./productService";

export const getAllproducts = createAsyncThunk(
  "product/get",
  async (thunkAPI) => {
    try {
      return productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



const productState = {
  user: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState: productState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllproducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllproducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getAllproducts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = true;
        state.isSuccess = false;
        state.message = action.error;
      })
  },
});

export default productSlice.reducer;
