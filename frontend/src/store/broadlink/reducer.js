import update from 'immutability-helper';
import { GET_DEVICES_FULFILLED } from './actionType';

export const initialState = {
  devices: [],
};

export default function broadlinkReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_DEVICES_FULFILLED: {
      const { payload } = action;
      return update(state, {
        devices: {
          $set: payload,
        },
      });
    }
    default:
      return state;
  }
}
