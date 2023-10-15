import { createSlice, AsyncThunk, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "auth/addtowishlist",
  async (prodId, thunkAPI) => {
    try {
      return authService.addToWishlist(prodId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserProductWishlist = createAsyncThunk(
  "auth/wishlist",
  async (thunkAPI) => {
    try {
      return await authService.getUserWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addProdToCart = createAsyncThunk(
  "auth/cart/add",
  async (data,thunkAPI) => {
    try {
      return await authService.addToCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCustomerOrder = createAsyncThunk(
  "auth/cart/create-order",
  async (orderData,thunkAPI) => {
    try {
      return await authService.createOrder(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserOrders = createAsyncThunk(
  "auth/cart/get-orders",
  async (data,thunkAPI) => {
    try {
      return await authService.getMyOrders(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserCart = createAsyncThunk(
  "auth/cart/get",
  async (data,thunkAPI) => {
    try {
      return await authService.getCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "auth/cart/delete",
  async (data,thunkAPI) => {
    try {
      return await authService.removeProductFromCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const emptyUserCart = createAsyncThunk(
  "auth/cart/empty",
  async (thunkAPI) => {
    try {
      return await authService.emptyCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "auth/cart/update",
  async (cartDetails,thunkAPI) => {
    try {
      return await authService.updateProductFromCart(cartDetails);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "auth/update-user",
  async (data,thunkAPI) => {
    try {
      return await authService.updateUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forgotPwdToken = createAsyncThunk(
  "auth/forgot-password",
  async (data,thunkAPI) => {
    try {
      return await authService.forgotPasswordToken(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetUserPwd = createAsyncThunk(
  "auth/reset-password",
  async (data,thunkAPI) => {
    try {
      return await authService.resetPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const getUserfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const initialState = {
  user: getUserfromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
        if (state.isSuccess == true) {
          toast.info("User Created Successfully");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        if (state.isSuccess == true) {
          localStorage.setItem("token", action.payload.token);
          toast.info("User logged in successfully");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError == true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addToWishlist = action.payload;
        state.message = "Product added to wishlist";
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserProductWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProductWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        // state.wishlist = action.payload;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(getUserProductWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addProdToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProdToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProducts = action.payload;
        if(state.isSuccess) {
          toast.success("Product added to cart");
        }
      })
      .addCase(addProdToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProducts = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCartItem = action.payload;
        if(state.isSuccess) {
          toast.success("Product deleted from cart")
        }
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isError) {
          toast.error("Something went wrong")
        }
      })
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCartItem = action.payload;
        if(state.isSuccess) {
          toast.success("Product updated")
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isError) {
          toast.error("Something went wrong")
        }
      })
      .addCase(createCustomerOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCustomerOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderedProduct = action.payload;
        if(state.isSuccess) {
          toast.success("Your order has been placed")
        }
      })
      .addCase(createCustomerOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isError) {
          toast.error("Something went wrong")
        }
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderedProducts = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;
        state.user = action.payload;
        if(state.isSuccess === true) {
          let currentUserData = JSON.parse(localStorage.getItem('customer'))
          let newUserData = {
            _id: currentUserData?._id,
            token: currentUserData?.token,
            firstname: action?.payload?.firstname,
            lastname: action?.payload?.lastname,
            email: action?.payload?.email,
            mobile: action?.payload?.mobile,
          }
          localStorage.setItem('customer', JSON.stringify(newUserData))
          state.user = newUserData;
          toast.success("Profile updated");
        }
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isError) {
          toast.error("Something went wrong");
        }
      })
      .addCase(forgotPwdToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPwdToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.token = action.payload;
        if(state.isSuccess) {
          toast.success("Forgot password e-mail sent");
        }
      })
      .addCase(forgotPwdToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isError) {
          toast.error("Something went wrong");
        }
      })
      .addCase(resetUserPwd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetUserPwd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.password = action.payload;
        if(state.isSuccess) {
          toast.success("Password reset succesfully");
        }
      })
      .addCase(resetUserPwd.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isError) {
          toast.error("Something went wrong");
        }
      })
      .addCase(emptyUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(emptyUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProducts = [];
        state.deletedCart = action.payload;
      })
      .addCase(emptyUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
