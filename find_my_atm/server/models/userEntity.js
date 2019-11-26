/**
 * Created by prasoon on 11/14/16.
 */
import {
  createSchema,
  createModel,
} from './modelBuilder';

export default createModel( 'userEntity', createSchema( {
  identifier: String,
  name: String,
  email: {type: String, unique: true},
} ), 'userEntities' );