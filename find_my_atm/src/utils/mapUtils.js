/**
 * Created by prasoon on 14/11/16.
 */

import {hslToHexColor} from './colorUtils';

const LATITUDE_DELTA = 0.0922,
  LONGITUDE_DELTA = 0.0421;

export default {
  hasLocationChanged(prevLocation, nextLocation){
    return prevLocation.latitude !== nextLocation.latitude || prevLocation.longitude !== nextLocation.longitude;
  },

  getBounds(location){
    return {
      ne: {
        lat: location.latitude + location.latitudeDelta / 2,
        lng: location.longitude + location.longitudeDelta / 2,
      },
      sw: {
        lat: location.latitude - location.latitudeDelta / 2,
        lng: location.longitude - location.longitudeDelta / 2,
      }
    }
  },

  getRegionFromUserLocation(userLocation) {
    return {
      longitude: userLocation.longitude,
      latitude: userLocation.latitude,
      longitudeDelta: userLocation.longitudeDelta || LONGITUDE_DELTA,
      latitudeDelta: userLocation.latitudeDelta || LATITUDE_DELTA
    };
  },

  getMarkerColorFromStatus(status){
    //status from 0 to 1
    if (0 <= status && status < 0.33) {
      return '#ff627d';
    } else if (status >= 0.33 && status < 0.66) {
      return '#ff9421';
    }
    return '#006400';
  },

  isLocationOutOfBound(boundingLocation, newLocation){

  }
}