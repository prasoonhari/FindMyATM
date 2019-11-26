/**
 * Created by prasoon on 11/13/16.
 */
import apiKeys from  '../../configs/apiKeys';
import {API_TYPES} from '../../constants/apiConstants';

const web = {
  client_id: '775422256061-ro4mqg313n1bfi2hvibp87k0ne3utf92.apps.googleusercontent.com',
  project_id: 'find-my-atm-149321',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://accounts.google.com/o/oauth2/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_secret: 'lEczHJKNekE2BZ-4QtNURZlb'
};
export default {

  apiKey: apiKeys[API_TYPES.GOOGLE_API],


  getClientSecret() {
    return web.client_secret;
  },

  getClientId() {
    return web.client_id;
  }
};