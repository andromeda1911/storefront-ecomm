import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getProducts = async (userData) => {
  const response = await axios.get(`${base_url}product`);
  if (response.data) {
    return response.data;
  }
};

const addToWishlist = async (productId) => {
  const response = await axios.put(`${base_url}product/wishlist`, {
    productId,
  });
  if (response.data) {
    return response.data;
  }
};

export const productService = {
  getProducts,
  addToWishlist
};
