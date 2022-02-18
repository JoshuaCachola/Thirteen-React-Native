import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import handReducer from './reducers/handReducer';

const rootReducer = combineReducers({
  // hand: handReducer,
});

// const configureStore = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

// export default configureStore;
