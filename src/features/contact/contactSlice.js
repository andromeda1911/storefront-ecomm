import { createSlice, AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { contactService } from "./contactService";

export const createQuery = createAsyncThunk(
  "contact/post",
  async (data,thunkAPI) => {
    try {
      return contactService.postQuery(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



const contactState = {
  contact: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const contactSlice = createSlice({
  name: "product",
  initialState: contactState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createQuery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.contact = action.payload;
        if(state.isSuccess === true) {
            toast.success("Submitted!");
        }
      })
      .addCase(createQuery.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = true;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isError === true) {
            toast.error("Something went wrong");
        }
      })
  },
});

export default contactSlice.reducer;
