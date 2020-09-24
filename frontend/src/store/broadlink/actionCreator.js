import { discoverDevices } from '../../services/broadlink';
import { setIsBusy } from '../layout/actionCreator';
import { GET_DEVICES } from './actionType';

export const requestDevices = () => {
  return async dispatch => {
    dispatch(setIsBusy(true));
    await dispatch({
      type: GET_DEVICES,
      payload: discoverDevices(),
    })
      .then(() => {
        dispatch(setIsBusy(false));
      })
      .catch(() => {
        dispatch(setIsBusy(false));
      });
  };
};
