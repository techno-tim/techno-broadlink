import update from 'immutability-helper';
import {
  DELETE_COMMAND_FULFILLED,
  GET_DEVICES_FULFILLED,
  LEARN_COMMAND_FULFILLED,
  SET_SELECTED_DEVICE,
} from './actionType';

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

    case LEARN_COMMAND_FULFILLED: {
      const { payload } = action;
      const newDeviceList = state.devices.filter(d => d.mac !== payload.mac);
      newDeviceList.push(payload);
      return update(state, {
        devices: {
          $set: newDeviceList,
        },
      });
    }

    case DELETE_COMMAND_FULFILLED: {
      const { payload } = action;
      const { device } = payload;
      return update(state, {
        commands: {
          $set: device,
        },
      });
    }

    default:
      return state;
  }
}
