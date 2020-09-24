import update from 'immutability-helper';
import { GET_DEVICES_FULFILLED, SET_SELECTED_DEVICE } from './actionType';

export const initialState = {
  devices: [],
  selectedDevice: {},
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
    case SET_SELECTED_DEVICE: {
      const { payload } = action;
      const { selectedDevice } = payload;
      return update(state, {
        selectedDevice: {
          $set: selectedDevice,
        },
      });
    }
    default:
      return state;
  }
}
