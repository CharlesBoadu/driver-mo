import API_URL from "../baseUrlConfig";

const fetchAllPlans = async () => {
  let url = `/plan/list-all`;
  try {
    const response = await API_URL.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

const fetchAllPolicies = async () => {
  let url = `/policy/list-all`;
  try {
    const response = await API_URL.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

const fetchPremiumHistory = async (data) => {
  let url = `/financials/policy-holder/premium-history`;
  try {
    const response = await API_URL.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  fetchAllPlans,
  fetchAllPolicies,
  fetchPremiumHistory,
};
