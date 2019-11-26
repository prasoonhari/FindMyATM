/**
 * Created by prasoon on 11/13/16.
 */
import {
  get as _get,
  property as _property,
} from 'lodash';
import PlaceEntity from '../models/placeEntity';
import mongoose from 'mongoose';

const ACTION_STATUS_LIMIT = 100;
export default {

  getPlace( place_id ) {
    return PlaceEntity.findOne( {place_id} );
  },


  findAndAddStatus( place_id, action ) {
    const actionStatus = Object.assign( {}, action, {_id: mongoose.Types.ObjectId()} );
    return PlaceEntity.update( {place_id}, {
        $push: {
          actionStatus: {
            $each: [actionStatus],
            $sort: {time: -1},
            $slice: ACTION_STATUS_LIMIT
          },
        }
      } )
      .then( () => actionStatus );
  },

  updatePlaces( placesEntities ) {
    const bulk = PlaceEntity.collection.initializeOrderedBulkOp();
    placesEntities.forEach( placeEntity => {
      bulk.find( {place_id: placeEntity.place_id} ).upsert().updateOne( {$set: placeEntity} );
    } );
    //TODO remove extra find
    var placeIds = placesEntities.map( _property( 'place_id' ) );
    return bulk.execute().then( () => PlaceEntity.find( {place_id: {$in: placeIds}} ) );
  }
}