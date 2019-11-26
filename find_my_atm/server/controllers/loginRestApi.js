/**
 * Created by prasoon on 11/14/16.
 */
import withController, {REST, getRoutes} from '../decorators/withController';

import googleApiUtils from '../utils/externals/googleApiUtils';
import loginService from '../services/externals/googleAPIs/loginService';

import UserEntity from '../models/userEntity';

@withController( '/login' )
class LoginRestAPIs {

  @REST.POST( '/_auth' )
  doLogin( req, res ) {
    const {server_auth_code} = req.body;
    return loginService.doLogin( server_auth_code )
      .then( userJwt => {
        res.send( userJwt );
      } )
      .catch( err => {
        res.status( 500 ).send( err );
      } )
  }

  @REST.POST( '/auth' )
  getJWT( req, res ) {
    const {identifier} = req.body;
    new UserEntity( {identifier} ).save()
      .then( () => loginService.getJWTToken( identifier ) )
      .then( userJwt => {
        res.send( userJwt );
      } )
      .catch( err => {
        res.status( 500 ).send( err );
      } );
  }


}


export default getRoutes( LoginRestAPIs );

