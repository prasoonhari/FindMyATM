//Native Redux
import {
  createStore,
} from 'redux';
import createReducer from '../reducers';
import {
  routerMiddleware,
} from 'react-router-redux';



export default function (middleware, initialState = {}) {
  const store = middleware(createStore)(createReducer(), initialState);
  return store;
}
