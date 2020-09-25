import update from 'immutability-helper';
import {
  SET_IS_BUSY,
  SET_LEARN_INPUT,
  SET_LEARN_OPEN,
  SET_SHOW_ALERT,
} from './actionType';

export const initialState = {
  isBusy: false,
  alert: {
    severity: 'success',
    message: '',
    show: false,
  },
  learnOpen: false,
  learnInput: '',
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
    case SET_SHOW_ALERT: {
      const { payload } = action;
      const { severity, message, show } = payload;
      return update(state, {
        alert: {
          severity: {
            $set: severity,
          },
          message: {
            $set: message,
          },
          show: {
            $set: show,
          },
        },
      });
    }
    case SET_LEARN_OPEN: {
      const { payload } = action;
      const { learnOpen } = payload;
      return update(state, {
        learnOpen: {
          $set: learnOpen,
        },
      });
    }
    case SET_LEARN_INPUT: {
      const { payload } = action;
      const { learnInput } = payload;
      return update(state, {
        learnInput: {
          $set: learnInput,
        },
      });
    }
    default:
      return state;
  }
}
