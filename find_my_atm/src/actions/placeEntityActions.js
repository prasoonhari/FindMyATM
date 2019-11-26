/**
 * Created by prasoon on 13/11/16.
 */
import {PLACE_DATA_LOADING, PLACE_DATA_LOADED , PLACE_STATUS_SENDING , PLACE_STATUS_SENT} from '../constants/actionTypes';
import placeEntityService from '../services/placeEntityService';

export const fetchNearestPlaceEntities = (location) => function (dispatch) {
  return placeEntityService.fetchNearestPlaceEntities(location)
    .then(data => {
      dispatch({
        type: PLACE_DATA_LOADED,
        data: data.body,
      });
    })
    .catch(error => {
      console.log(error);
    })
};


export const placeStatusAction = (status , placeId) => function (dispatch) {
  return placeEntityService.placeStatusAction(status , placeId)
    .then(data => {
      dispatch({
        type: PLACE_STATUS_SENT,
        data: data.body,
      });
    })
    .catch(error => {
      console.log(error);
    })
};
