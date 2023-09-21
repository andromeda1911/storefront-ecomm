import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getProducts = async (userData) => {
  const response = await axios.get(`${base_url}product`);
  if (response.data) {
    return response.data;
  }
};

const getProductDetails = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  if (response.data) {
    return response.data;
  }
};



export const productService = {
  getProducts,
  getProductDetails
};
