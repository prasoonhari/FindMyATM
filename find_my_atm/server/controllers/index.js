/**
 * Created by prasoon on 11/13/16.
 */
import withRouter from '../decorators/withRouter';

import loginRestApi from './loginRestApi';
import placeRestApi from './placeRestApi';

export default withRouter( {
  ['/api']: [
    placeRestApi,
    loginRestApi
  ]
} );