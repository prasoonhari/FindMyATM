/**
 * Created by prasoon on 11/13/16.
 */
import mongoose  from 'mongoose';

import {store} from '../configs/environment';
import {mongoOptions} from '../configs/storeConfig';
import logger from '../utils/logger';


mongoose.Promise = require( 'bluebird' );

function connect() {
  return mongoose.connect( store.database.uri, mongoOptions );
}

export default () => {
  connect();

  mongoose.connection.on( 'error', err => {
    logger.error( `✗ MongoDB Connection Error. Please make sure MongoDB is running. -> ${err}` );
  } );

  mongoose.connection.on( 'disconnected', () => {
    connect();
  } )

};