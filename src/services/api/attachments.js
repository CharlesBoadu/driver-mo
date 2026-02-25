import API_URL from "../baseUrlConfig";

const uploadAttachment = async (data) => {
  let url = `/attachments/upload`;
  try {
    const response = await API_URL.post(url, data, true, true);
    return response;
  } catch (error) {
    throw error;
  }
};

const deleteAttachment = async (data) => {
  let url = `/attachments/delete`;
  try {
    const response = await API_URL.delete(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

const downloadAttachment = async (data) => {
  let url = `/attachments/download`;
  try {
    const response = await API_URL.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  uploadAttachment,
  deleteAttachment,
  downloadAttachment,
};
