import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import auth from './auth.reducer'
import lastwatched from './lastwatched.reducer';

const store = createStore(
  combineReducers({
    auth,
    lastwatched
  }),
  applyMiddleware(thunk)
);

export default store;
