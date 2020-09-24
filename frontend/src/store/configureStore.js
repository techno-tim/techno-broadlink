import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import rootReducer from './rootReducer';

const composeEnhancers = composeWithDevTools({});

export const middleware = [thunk, promise];

export default function configureStore() {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
}
