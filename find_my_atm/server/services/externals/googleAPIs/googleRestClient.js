/**
 * Created by prasoon on 11/15/16.
 */
import request from '../../../../common/utils/request';
import {BASE_URL} from './constants';

export default request.create( {baseUrl: `https://${BASE_URL}`} );