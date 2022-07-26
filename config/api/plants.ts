import axios from "axios";
import { store } from "store";
import { userAction } from "store/actions";

const plantsApi = axios.create({
  // @TODO: add env
  // baseURL: "http://0.0.0.0:3000",
  baseURL: "https://ben-plants-api.herokuapp.com",
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

plantsApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message

    if (errorMessage === "Unauthorized") {
      store.dispatch(userAction.removeUserDetails());
    }

    return Promise.reject(errorMessage);
  }
);
export default plantsApi;
