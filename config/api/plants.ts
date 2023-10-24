import axios from "axios";
import { apiUrl } from "config/environment";
import { getDeviceId } from "utils/device";

const plantsApi = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
});

plantsApi.interceptors.request.use(async (config) => {
  const deviceId = await getDeviceId();

  if (config.headers) {
    // Workaround for some ios devices
    config.headers["device-id"] = deviceId.replace(/"/g, '');
  }
  return config;
});

plantsApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response?.data?.message)
);

export default plantsApi;
