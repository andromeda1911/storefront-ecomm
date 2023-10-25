import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getHomeBanners = async () => {
  const response = await axios.get(`${base_url}home/`);

  return response.data;
};

const homeService = {
    getHomeBanners,
};

export default homeService;
