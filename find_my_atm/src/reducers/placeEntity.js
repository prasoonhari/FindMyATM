/**
 * @Author: Arkit Vora <arkitvora>
 * @Date:   13-11-2016
 */

import {keyBy as _keyBy} from 'lodash';
import update from 'react-addons-update';
import {PLACE_DATA_LOADED, PLACE_DATA_LOADING, MAP_REGION_UPDATE} from '../constants/actionTypes';

const initialState = {
  placesByIds: {},
  loadingPlaces: false
};
export default function (state = initialState, action) {
  switch (action.type) {
    case PLACE_DATA_LOADING:
      return update(state, {
          loadingPlaces: {
            $set: true
          }
        }
      );
    case PLACE_DATA_LOADED:
      return update(state, {
          placesByIds: { $merge: _keyBy(action.data, 'place_id') },
          loadingPlaces: {
            $set: false
          }
        }
      );
    default :
      return state;
  }
}
