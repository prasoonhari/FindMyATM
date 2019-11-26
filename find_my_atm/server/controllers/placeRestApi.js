/**
 * Created by prasoon on 11/13/16.
 */
import {
  get as _get,
  isUndefined as _isUndefined,
  pick as _pick,
  first as _first,
  property as _property,
  isEmpty as _isEmpty,
} from 'lodash';

import moment from 'moment';
import withController, {REST, getRoutes} from '../decorators/withController';

import placeService from '../services/placeService';
import {findNearbyPlaces} from '../services/externals/googleAPIs/googlePlaceService';
import {findDistance} from '../services/externals/googleAPIs/distanceMatrixService';

import {ActionStatusSchema, ACTION_STATUS_TYPES} from '../models/placeEntity';


import {parseLatLngToString,findDstLatLng} from '../utils/general';
function adaptedPlace( place ) {
  const location = _get( place, 'geometry.location', {} );
  return Object.assign( {},
    _pick( place, ['name', 'opening_hours', 'place_id', 'id', 'vicinity', 'rating', 'types'] ),
    {location}
  );
}

//TODO move during adding action status
function adaptPlaceToResponse( placeEntity, distanceDTOMap ) {
  const actionStatus = _get( placeEntity, 'actionStatus', [] );
  const currentMillis = +moment();
  const prevDayMillis = +moment().subtract( 1, 'day' );
  const dayDiffMillis = moment( currentMillis ).diff( prevDayMillis );

  let probabilityData = 0, probabilityCount = 0;
  actionStatus.forEach( ( action ) => {
    const actionMoment = moment( action.time );
    const millsDiff = moment( currentMillis ).diff( actionMoment );
    if ( millsDiff > dayDiffMillis ) {
      return false;
    }
    const ratio = ((+actionMoment) - prevDayMillis) / dayDiffMillis;
    probabilityData += ratio * action.status;
    probabilityCount++;
  } );
  const status = probabilityCount > 0 ? probabilityData / probabilityCount : 0;
  const distanceDTO = _get( distanceDTOMap, placeEntity.place_id, {} );
  return Object.assign(
    {status},
    _pick( distanceDTO, ['distance', 'duration'] ),
    _pick( placeEntity, ['name', 'opening_hours', 'place_id', 'location', 'vicinity', 'rating', 'types'] )
  );
}

function adaptActionStatus( requestedAction ) {
  //TODO take from placeEntities
  const actionStatus = _pick( requestedAction, ['actorId', 'type', 'status', 'time'] );
  actionStatus.time = moment( actionStatus.time );
  actionStatus.type = actionStatus.type || ACTION_STATUS_TYPES.StatusUpdate;
  return actionStatus;
}

const DEFAULT_TYPES = ['atm', 'bank'];
@withController( '/places' )
class PlaceRestApi {


  @REST.POST( '/find' )
  _find( req, res ) {
    const {bounds, center, types} = req.body;
    const topBound = _get( bounds, 'ne' );

    if ( _isEmpty( topBound ) || _isEmpty( center ) ) {
      res.status( 500 ).send( {message: 'Invalid Payload'} );
      return;
    }
    const radius = findDstLatLng( topBound.lat, topBound.lng, center.lat, center.lng );

    findNearbyPlaces( types || DEFAULT_TYPES, parseLatLngToString( center ), {radius} )
      .then( body => {
        const places = _get( body, 'results', [] );
        return places.map( adaptedPlace );
      } )
      .then( places => {
        const destinations = places.map( _property( 'location' ) );
        return Promise.all( [places, findDistance( center, destinations )] );
      } )
      .then( ( [places, distanceMatrix] ) => {
        const distanceDTOs = _get( distanceMatrix, '0.elements', [] );
        const distanceDTOMap = distanceDTOs.reduce( ( result, distanceDTO, index ) => {
          const place = places[index];
          return Object.assign( result, {[place.place_id]: distanceDTO} );
        }, {} );
        return Promise.all( [placeService.updatePlaces( places ), distanceDTOMap] );
      } )
      .then( ( [places = [], distanceDTOMap] ) => {
        return res.json( places.map( ( place, index ) => adaptPlaceToResponse( place, distanceDTOMap ) ) );
      } )
      .catch( err => {
        res.status( 500 ).send( err.message || '' )
      } );
  }


  @REST.POST( '/action' )
  updatePlaceStatus( req, res ) {
    const {placeId, ...action} = req.body;
    const time = _get( req.body, 'time', +moment() );
    const actionStatus = adaptActionStatus( action );
    if ( _isUndefined( actionStatus.status ) || !actionStatus.type ) {
      //TODO make common
      res.status( 500 ).json( {message: 'Invalid Action DTO.!'} );
      return;
    }

    placeService.findAndAddStatus( placeId, actionStatus )
      .then( updatedAction => {
        res.json( updatedAction );
      } )
      .catch( err => {
        res.status( 500 ).send( err.message || '' )
      } );
  }


  @REST.POST( '/:placeId/comment' )
  addComment( req, res ) {

  }
}


export default getRoutes( PlaceRestApi );