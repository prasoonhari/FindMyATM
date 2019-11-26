/**
 * Created by prasoon on 13/11/16.
 */
import ajax from '../../common/utils/ajax';
import mapUtils from '../utils/mapUtils'

const BASE_PATH = 'api/places';

//just because we use Google api
function adaptAsPerGoogleConv(location){
  return {
    lat: location.latitude,
    lng: location.longitude,
  };
}

export default {
  fetchNearestPlaceEntities(location){
    const bounds = mapUtils.getBounds(location);
    return ajax.post(`${BASE_PATH}/find`, {
      bounds: bounds,
      center: adaptAsPerGoogleConv(location)
    });
  },

  placeStatusAction(status , placeId){
    console.log(status , placeId);
    return ajax.post(`${BASE_PATH}/action`, {
      placeId:placeId,
      status: status
    });
  }

}
