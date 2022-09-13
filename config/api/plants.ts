import axios from "axios";
import { apiUrl } from "config/environment";
import { store } from "store";
import { userAction } from "store/actions";
import { getDeviceId } from "util/device";

const plantsApi = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
});

plantsApi.interceptors.request.use(async (config) => {
  if (config.headers) config.headers.deviceId = await getDeviceId();
  return config;
});

plantsApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message;
    if (errorMessage === "Unauthorized") {
      store.dispatch(userAction.removeUserDetails());
    }

    return Promise.reject(errorMessage);
  }
);
export default plantsApi;
