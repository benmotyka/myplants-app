import axios from "axios";
import { apiUrl, basicAuthUsername, basicAuthPassword } from "config/environment";
import { store } from "store";
import { userAction } from "store/actions";
import { getDeviceId } from "util/device";

const plantsApi = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  // auth: {
    // username: basicAuthUsername,
    // password: basicAuthPassword
  // }
});

plantsApi.interceptors.request.use(async (config) => {
  if (config.headers) config.headers["device-id"] = await getDeviceId();
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
