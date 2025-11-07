import API_URL from "../baseUrlConfig";

const login = async (data) => {
  let url = `/phm/login`;
  try {
    const response = await API_URL.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  login,
};
