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

const triggerResetPassword = async (data) => {
  let url = `/phm/trigger-reset-password`;
  try {
    const response = await API_URL.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (data) => {
  let url = `/phm/reset-password`;
  try {
    const response = await API_URL.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

const changePassword = async (data) => {
  let url = `/phm/change-password`;
  try {
    const response = await API_URL.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  login,
  resetPassword,
  triggerResetPassword,
  changePassword
};
