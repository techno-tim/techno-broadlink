import {
  SET_IS_BUSY,
  SET_SHOW_ALERT,
  SET_LEARN_OPEN,
  SET_LEARN_INPUT,
  SET_DELETE_OPEN,
} from './actionType';

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

export const setLearnOpen = learnOpen => {
  return async dispatch => {
    await dispatch({
      type: SET_LEARN_OPEN,
      payload: { learnOpen },
    });
  };
};

export const setLearnInput = learnInput => {
  return async dispatch => {
    await dispatch({
      type: SET_LEARN_INPUT,
      payload: { learnInput },
    });
  };
};

export const setDeleteOpen = deleteOpen => {
  return async dispatch => {
    await dispatch({
      type: SET_DELETE_OPEN,
      payload: { deleteOpen },
    });
  };
};
