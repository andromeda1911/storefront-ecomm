import { createSlice, AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { productService } from "./productService";

export const getAllproducts = createAsyncThunk(
  "product/get",
  async (data,thunkAPI) => {
    try {
      return productService.getProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllproductsWithoutFilter = createAsyncThunk(
  "product/get-all-no-filter",
  async (thunkAPI) => {
    try {
      return productService.getProductsNoFilter();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSearchResults = createAsyncThunk(
  "product/search",
  async (data,thunkAPI) => {
    try {
      return productService.searchProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const getDetails = createAsyncThunk(
  "product/getdetails",
  async (id,thunkAPI) => {
    try {
      return productService.getProductDetails(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addRating = createAsyncThunk(
  "product/rating",
  async (data,thunkAPI) => {
    try {
      return productService.rateProduct(data);
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
      .addCase(getAllproductsWithoutFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllproductsWithoutFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productsNoFilter = action.payload;
      })
      .addCase(getAllproductsWithoutFilter.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleproduct = action.payload;
      })
      .addCase(getDetails.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.rating = true;
        state.message = "Rating added"
        if(state.isSuccess) {
          toast.success = "Rating added!";
        }
      })
      .addCase(addRating.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.rating = true;
        state.searchResults = action.payload;
      })
      .addCase(getSearchResults.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = true;
        state.isSuccess = false;
        state.message = action.error;
      })
  },
});

export default productSlice.reducer;
