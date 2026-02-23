import API_URL from "../baseUrlConfig";

const getAllClaims = async () => {
  let url = `/claims/all`;
  try {
    const response = await API_URL.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

const fileNewClaim = async (data) => {
  let url = `/claims/file-new`;
  try {
    const response = await API_URL.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllClaims,
  fileNewClaim,
};
