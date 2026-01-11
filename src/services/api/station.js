import API_URL from "../baseUrlConfig";

const getAllStations = async () => {
  let url = `/embedded-stations/all`;
  try {
    const response = await API_URL.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

const getAllAttendantsByStation = async (stationID) => {
  let url = `/embedded-stations/attendants/by-station-id/${stationID}`;
  try {
    const response = await API_URL.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
    getAllAttendantsByStation,
  getAllStations
};
