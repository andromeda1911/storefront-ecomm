import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
    return response.data;
  }
};

const addToWishlist = async (prodId) => {
    const response = await axios.put(
      `${base_url}user/wishlist`,
      {prodId},
      config
    );
    if (response.data) {
      return response.data;
    }
  };

const getUserWishlist = async() => {
    const response = await axios.get(`${base_url}user/wishlist`, config);
    if(response.data){
        return response.data;
    }
}

const addToCart = async(data) => {
  const response = await axios.post(`${base_url}user/cart`, data, data.config2);
  if(response.data){
      return response.data;
  }
}

const getCart = async(data) => {
  const response = await axios.get(`${base_url}user/cart`, data, data.config2);
  if(response.data){
      return response.data;
  }
}

const removeProductFromCart = async(data) => {
  const response = await axios.delete(`${base_url}user/delete-product-cart/${data.cartItemId}`, data.config2);
  if(response.data){
      return response.data;
  } 
}

const emptyCart = async() => {
  const response = await axios.delete(`${base_url}user/empty-cart`, config);
  if(response.data){
      return response.data;
  } 
}

const updateProductFromCart = async(cartDetails) => {
  const response = await axios.put(`${base_url}user/update-product-cart/${cartDetails.cartItemId}/${cartDetails.quantity}`,{}, config);
  if(response.data){
      return response.data;
  } 
}

const createOrder = async(orderDetail) => {
  const response = await axios.post(`${base_url}user/cart/create-order`,orderDetail, config);
  if(response.data){
      return response.data;
  } 
}

const getMyOrders = async(data) => {
  const response = await axios.get(`${base_url}user/getmyorders`, data);
  if(response.data){
      return response.data;
  }
}

const updateUser = async(data) => {
  const response = await axios.put(`${base_url}user/edit-user`,data.data, data.config2);
  if(response.data){
      return response.data;
  }
}

const forgotPasswordToken = async(data) => {
  const response = await axios.post(`${base_url}user/forgot-password-token`,data, config);
  if(response.data){
      return response.data;
  }
}

const resetPassword = async(data) => {
  const response = await axios.put(`${base_url}user/reset-password/${data.token}`,{password: data?.password}, config);
  if(response.data){
      return response.data;
  }
}

export const authService = {
  register,
  login,
  addToWishlist,
  getUserWishlist,
  addToCart,
  getCart,
  removeProductFromCart,
  updateProductFromCart,
  createOrder,
  getMyOrders,
  updateUser,
  forgotPasswordToken,
  resetPassword,
  emptyCart
};
