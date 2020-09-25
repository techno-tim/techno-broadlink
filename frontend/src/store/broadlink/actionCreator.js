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
    dispatch(setIsBusy(true));
    // unfortunately there's a delay
    setTimeout(() => {
      dispatch(
        setShowAlert('info', 'Please press a button on your remote', true)
      );
    }, 4800);

    await dispatch({
      type: LEARN_COMMAND,
      payload: learnCommand(ipAddress, commandName),
    })
      .then(data => {
        batch(() => {
          dispatch(setIsBusy(false));
          dispatch(setSelectedDevice(data.value));
          dispatch(setLearnOpen(false));
          dispatch(setLearnInput(''));
          // have to time with info message :|
          setTimeout(() => {
            dispatch(setShowAlert('success', `Learned command!`, true));
          }, 1000);
        });
      })
      .catch(() => {
        dispatch(setIsBusy(false));
        dispatch(setLearnOpen(false));
        dispatch(setLearnInput(''));
        dispatch(setShowAlert('error', `Error learning command`, true));
      });
  };
};

export const requestSendCommand = (ipAddress, commandId) => {
  return async dispatch => {
    dispatch(setIsBusy(true));
    await dispatch({
      type: SEND_COMMAND,
      payload: sendCommand(ipAddress, commandId),
    })
      .then(() => {
        dispatch(setIsBusy(false));
        dispatch(setShowAlert('success', `Command sent!`, true));
      })
      .catch(() => {
        dispatch(setIsBusy(false));
        dispatch(setShowAlert('error', `Error sending command`, true));
      });
  };
};

export const requestDeleteCommand = (ipAddress, commandId) => {
  return async dispatch => {
    dispatch(setIsBusy(true));
    await dispatch({
      type: DELETE_COMMAND,
      payload: deleteCommand(ipAddress, commandId),
    })
      .then(data => {
        batch(() => {
          dispatch(setIsBusy(false));
          dispatch(setSelectedDevice(data.value));
          dispatch(setShowAlert('success', `Deleted command!`, true));
        });
      })
      .catch(() => {
        dispatch(setIsBusy(true));
        dispatch(setShowAlert('error', `Error deleting command`, true));
      });
  };
};
