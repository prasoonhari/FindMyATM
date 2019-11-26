/**
 * Created by prasoon on 11/13/16.
 */
import envUtils from '../utils/envUtils';
import mongoStore from '../store/mongo';
import bodyParser from 'body-parser';
import {server} from '../configs/environment';
import express from 'express';


function bootDatabase() {
  mongoStore();
}

export function boot() {
  const app = express();
  if ( envUtils.isProduction ) {
    app.enable( 'trust proxy' );
    app.use( require( 'express-enforces-ssl' )() );
  }

  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded( {extended: false} ) );

  bootDatabase();

  app.listen( server.port, () => {
    console.log( "\n✔ Express server listening on port %d", server.port );
  } );

  return app;
}