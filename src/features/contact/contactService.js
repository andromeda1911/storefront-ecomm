import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const postQuery = async (data) => {
  const response = await axios.post(`${base_url}enquiry`,data);
  if (response.data) {
    return response.data;
  }
};



export const contactService = {
    postQuery,
  
};
