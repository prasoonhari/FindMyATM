/**
 * Created by prasoon on 13/11/16.
 */

import update from 'react-addons-update';
import mapUtils from '../utils/mapUtils';
import {USER_CURRENT_LOCATION_UPDATE , USER_LOGIN , USER_LOGIN_SUCCESS,  USER_LOGIN_FAILURE} from '../constants/actionTypes';

const initialState = {
  currentLocation: mapUtils.getRegionFromUserLocation({ longitude: 77.2000, latitude: 28.6000 }),
  currentLocation: { longitude: 77.2000, latitude: 28.6000, mocked: false },
  isAuthenticated:false,
  isLoading:false,
  user:{}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_CURRENT_LOCATION_UPDATE:
      return update(state, {
          currentLocation: {
            $set: action.data
          }
        }
      );
    case USER_LOGIN:
      return update(state, {
          isLoading: {
            $set: true
          }
        }
      );
    case USER_LOGIN_SUCCESS:
      return update(state, {
          isLoading: {
            $set: false
          },
          isAuthenticated: {
            $set: true
          },
          user: {
            $set: action.data
          }
        }
      );
    case USER_LOGIN_FAILURE:
      return update(state, {
          isLoading: {
            $set: false
          },
          isAuthenticated: {
            $set: false
          }
        }
      );
    default :
      return state;
  }
}
