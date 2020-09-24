import { SET_IS_BUSY, SET_SHOW_ALERT } from './actionType';

export const setIsBusy = isBusy => {
  return async dispatch => {
    await dispatch({
      type: SET_IS_BUSY,
      payload: { isBusy },
    });
  };
};

export const setShowAlert = (severity, message, show) => {
  return async dispatch => {
    await dispatch({
      type: SET_SHOW_ALERT,
      payload: { severity, message, show },
    });
  };
};
