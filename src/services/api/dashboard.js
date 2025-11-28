import API_URL from "../baseUrlConfig";

const fetchPremiumTrends = async () => {
  let url = `/`;
  try {
    const response = await API_URL.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

const fetchTotalPremiums = async () => {
  let url = `/`;
  try {
    const response = await API_URL.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

const fetchTotalClaimsPaid = async () => {
  let url = `/`;
  try {
    const response = await API_URL.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

const fetchTotalVolumeAndValue = async () => {
  let url = `/`;
  try {
    const response = await API_URL.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  fetchPremiumTrends,
  fetchTotalPremiums,
  fetchTotalClaimsPaid,
  fetchTotalVolumeAndValue
};
