/**
 * Created by prasoon on 11/14/16.
 */
import google from 'googleapis';
import apiKeys from '../../../configs/apiKeys';
import googleAPIUtils from '../../../utils/externals/googleApiUtils';
import jwt from 'jsonwebtoken';

const OAuth2 = google.auth.OAuth2;
const plus = google.plus( 'v1' );

var oauth2Client = new OAuth2(
  googleAPIUtils.getClientId(),
  googleAPIUtils.getClientSecret(),
  ''
);


const url = oauth2Client.generateAuthUrl( {
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as string
  scope: ['https://www.googleapis.com/auth/plus.me'],
} );


export default {

  getJWTToken( userIdentifier ) {
    return Promise.resolve( jwt.sign( {userIdentifier}, apiKeys.SECRET_KEY ) );
  },

  doLogin( auth_server_code ) {

    return new Promise( ( resolve, reject ) => {
      oauth2Client.getToken( auth_server_code, function ( err, tokens ) {
        if ( !err ) {
          oauth2Client.setCredentials( tokens );
          plus.people.get( {
            auth: oauth2Client,
            userId: 'me'
          }, ( er, user ) => {
            resolve( jwt.sign( user, apiKeys.SECRET_KEY ) );
          } );
        } else {
          reject( err );
        }
      } );
    } );
  }
}