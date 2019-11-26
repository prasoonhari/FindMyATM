/**
 * Created by prasoon on 13/11/16.
 */
import {fetchNearestPlaceEntities} from './placeEntityActions';
import {USER_CURRENT_LOCATION_UPDATE, USER_LAST_LOCATION_UPDATE , USER_LOGIN , USER_LOGIN_SUCCESS,  USER_LOGIN_FAILURE} from '../constants/actionTypes';
import userServices from '../services/userServices';
import LocalStorage from '../utils/localStorage';
const USERDATA_STORE = 'userdata_store';
import {navigate} from '../navigator';
import DeviceInfo from 'react-native-device-info';

export const updateUserCurrentLocation = (locationData) => function (dispatch) {
  dispatch({
    type: USER_CURRENT_LOCATION_UPDATE,
    data: locationData
  });
  dispatch(fetchNearestPlaceEntities(locationData));
};

export const updateUserLastLocation = (locationData) => function (dispatch) {
  dispatch({
    type: USER_LAST_LOCATION_UPDATE,
    data: locationData
  });
};

export const authenticateUser = () => function (dispatch) {
  LocalStorage.get(USERDATA_STORE).then(data => {
    dispatch( {
      type: USER_LOGIN_SUCCESS,
      data,
    } );
    navigate('home');
  }).catch(error => {
    loginUser();
  });
};


export const loginUser = () => function (dispatch) {
  dispatch({
    type: USER_LOGIN,
  });

  return userServices.loginUser( DeviceInfo.getUniqueID() )
  .then( data => {
    dispatch( {
      type: USER_LOGIN_SUCCESS,
      data,
    } );
    LocalStorage.save(USERDATA_STORE , data);
    navigate('home');
  } ).catch(error => {
    dispatch( {
      type: USER_LOGIN_FAILURE,
      error,
    } );
  });
};
