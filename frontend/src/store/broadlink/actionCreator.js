import { batch } from 'react-redux';
import {
  deleteCommand,
  discoverDevices,
  learnCommand,
  sendCommand,
} from '../../services/broadlink';
import {
  setIsBusy,
  setShowAlert,
  setLearnOpen,
  setLearnInput,
} from '../layout/actionCreator';
import {
  DELETE_COMMAND,
  GET_DEVICES,
  LEARN_COMMAND,
  SEND_COMMAND,
  SET_SELECTED_DEVICE,
} from './actionType';

export const requestDevices = () => {
  return async dispatch => {
    dispatch(setIsBusy(true));
    await dispatch({
      type: GET_DEVICES,
      payload: discoverDevices(),
    })
      .then(data => {
        dispatch(setIsBusy(false));
        if (data.value.length > 0) {
          dispatch(
            setShowAlert(
              'success',
              `Discovered ${data.value.length} devices`,
              true
            )
          );
        } else {
          dispatch(setShowAlert('error', `Did not discover any devices`, true));
        }
      })
      .catch(() => {
        dispatch(setIsBusy(false));
      });
  };
};

export const setSelectedDevice = selectedDevice => {
  return async dispatch => {
    await dispatch({
      type: SET_SELECTED_DEVICE,
      payload: {
        selectedDevice,
      },
    });
  };
};

export const requestLearnCommand = (ipAddress, commandName) => {
  return async dispatch => {
    await dispatch({
      type: LEARN_COMMAND,
      payload: learnCommand(ipAddress, commandName),
    })
      .then(data => {
        batch(() => {
          dispatch(setSelectedDevice(data.value));
          dispatch(setLearnOpen(false));
          dispatch(setLearnInput(''));
          dispatch(setShowAlert('success', `Learned command!`, true));
        });
      })
      .catch(() => {
        dispatch(setLearnOpen(false));
        dispatch(setLearnInput(''));
        dispatch(setShowAlert('error', `Error learning command`, true));
      });
  };
};

export const requestSendCommand = (ipAddress, commandId) => {
  return async dispatch => {
    await dispatch({
      type: SEND_COMMAND,
      payload: sendCommand(ipAddress, commandId),
    }).then(() => {
      dispatch(setShowAlert('success', `Command sent!`, true));
    });
  };
};

export const requestDeleteCommand = (ipAddress, commandId) => {
  return async dispatch => {
    await dispatch({
      type: DELETE_COMMAND,
      payload: deleteCommand(ipAddress, commandId),
    });
  };
};
