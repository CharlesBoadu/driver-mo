import API_URL from "../baseUrlConfig";

const getAllAttendants = async () => {
  let url = `/embedded-stations/attendants/all`;
  try {
    const response = await API_URL.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllAttendants,
};
