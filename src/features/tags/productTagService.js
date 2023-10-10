import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getProductTags = async () => {
  const response = await axios.get(`${base_url}tags/`);

  return response.data;
};

const productTagService = {
  getProductTags
};

export default productTagService;
