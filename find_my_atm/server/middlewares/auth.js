/**
 * Created by prasoon on 11/15/16.
 */
import {get as _get} from 'lodash';
import jwt from 'jsonwebtoken';
import apiKeys from '../configs/apiKeys';

function throwError( res ) {
  res.status( 401 ).send( 'UNAUTHORIZED' );
}

export default ( req, res, next ) => {
  const requestToken = _get( req, 'headers.requestToken' );


  if ( !requestToken ) {
    throwError( res );
  }
  try {
    req.userInfo = jwt.verify( requestToken, apiKeys.SECRET_KEY );
    next();
  } catch ( ex ) {
    throwError( res );
  }
};
