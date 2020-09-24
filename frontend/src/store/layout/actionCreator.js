import { SET_IS_BUSY } from './actionType';

export const setIsBusy = isBusy => ({
  type: SET_IS_BUSY,
  payload: { isBusy },
});
