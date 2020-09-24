import { combineReducers } from 'redux';
import broadlink from './broadlink/reducer';
import layout from './layout/reducer';

const rootReducer = combineReducers({
  broadlink,
  layout,
});

export default rootReducer;
