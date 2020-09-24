import update from 'immutability-helper';
import { SET_IS_BUSY } from './actionType';

export const initialState = {
  isBusy: false,
};

export default function layoutReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_IS_BUSY: {
      const { payload } = action;
      const { isBusy } = payload;
      return update(state, {
        isBusy: {
          $set: isBusy,
        },
      });
    }
    default:
      return state;
  }
}
