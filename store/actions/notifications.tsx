import { HIDE_TOAST, SET_NOTIFICATIONS_TOKEN, SHOW_TOAST } from "store/types";

const setNotificationsToken = (payload: string) => {
  return {
    type: SET_NOTIFICATIONS_TOKEN,
    payload,
  };
};

const showToast = () => {
  return {
    type: SHOW_TOAST,
  };
};

const hideToast = () => {
  return {
    type: HIDE_TOAST,
  };
};

export default {
  setNotificationsToken,
  showToast,
  hideToast,
};
