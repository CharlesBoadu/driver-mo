import API_URL from "../baseUrlConfig";

const getTransactionID = async (data) => {
  let url = `/financials/generate-transaction-id`;
  try {
    const response = await API_URL.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

const makePayment = async (data, type) => {
  let url;
  if (type === "Momo") {
    url = `/financials/pay-momo-transaction`;
  } else {
    url = `/financials/pay-bank-transaction`;
  }
  try {
    const response = await API_URL.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  getTransactionID,
  makePayment,
};
