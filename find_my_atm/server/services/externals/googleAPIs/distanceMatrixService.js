/**
 * Created by prasoon on 11/15/16.
 */
import {
  castArray as _castArray,
  get as _get,
} from 'lodash';

import googleRestClient from './googleRestClient';
import url from 'url';

import googleApiUtils from '../../../utils/externals/googleApiUtils';
import {parseLatLngToString} from '../../../utils/general';

function parseLatLng( latLngArray ) {
  return _castArray( latLngArray ).map( parseLatLngToString ).join( '|' );
}

export function findDistance( requestedOrigins, requestedDestinations = [] ) {
  const
    key = googleApiUtils.apiKey,
    origins = parseLatLng( requestedOrigins ),
    destinations = parseLatLng( requestedDestinations ),
    query = {key, origins, destinations},
    placeUrl = url.format(
      {hostname: `/maps/api/distancematrix/json`, query}
    );

  return googleRestClient.get( placeUrl )
    .then( response => {
      return _get( response, 'body.rows', [] );
    } );


}