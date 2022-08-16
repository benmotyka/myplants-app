import { SET_NOTIFICATIONS_TOKEN } from "store/types";

const setNotificationsToken = (payload: string) => {
  return {
    type: SET_NOTIFICATIONS_TOKEN,
    payload,
  };
};

export default {
  setNotificationsToken,
};
