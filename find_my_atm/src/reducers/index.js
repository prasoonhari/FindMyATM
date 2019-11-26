import { combineReducers } from 'redux';
import placeEntity from './placeEntity';
import user from './user';

export default () => combineReducers({
  placeEntity,
  user
});
