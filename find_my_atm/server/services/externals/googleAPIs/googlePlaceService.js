/**
 * Created by prasoon on 11/13/16.
 */
import url from 'url';

import logger from '../../../utils/logger';
import googleApiUtils from '../../../utils/externals/googleApiUtils';

import googleRestClient from './googleRestClient';

export function findNearbyPlaces( type, location, params = {} ) {
  const
    key = googleApiUtils.apiKey,
    query = {key, location, type, radius: params.radius},
    placeUrl = url.format(
      {hostname: `/maps/api/place/nearbysearch/json`, query}
    );
  return googleRestClient.get( placeUrl )
    .then( response => {
      return response.body;
    } );
}