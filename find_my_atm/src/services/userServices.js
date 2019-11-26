/**
* @Author: Arkit Vora <arkitvora>
* @Date:   14-11-2016
*/

import request from '../../common/utils/ajax';

const BASE_PATH = '';

export default {
  loginUser(params){
    return request.post(`${BASE_PATH}` , params);
  }
}
