/**
 * Created by prasoon on 11/13/16.
 */
import {ENV_TYPES} from '../constants/envConstants';
export default {
  isProduction: process.env.NODE_ENV === ENV_TYPES.PROD,
}