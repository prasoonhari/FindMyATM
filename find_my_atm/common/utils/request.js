import request from 'superagent-bluebird-promise';
import environmentConfig from '../../configs/environment';

import _ from 'lodash';

const DEFAULT_PARAMS = {
    type: 'application/json; charset=utf-8',
    accept: 'application/json; charset=utf-8',
  },
  DEFAULT_CONFIG = {
    baseUrl: '',
    headers: {},
  },

  _addAttachments = ( req, data ) => {
    Object.keys( data ).forEach( key => {
      req.attach( key, data[key] );
    } );
  },
  _parseParams = ( method, urlOrParams, queryOrData ) => {
    const params = {};
    if ( method === 'get' ) {
      params.query = queryOrData;
    } else {
      params.data = queryOrData;
    }
    return Object.assign( {method}, params, _.isPlainObject( urlOrParams ) ? urlOrParams : {url: urlOrParams} );
  },

  sendRequest = ( config, params ) => {
    const {method, headers} = params,
      req = request[method]( `${config.baseUrl}${params.url}` ),
      reqHeaders = Object.assign( {}, config.headers, headers ),
      data = params.data;

    if ( params.attachment ) {
      _addAttachments( req, data );
    } else {
      req.type( params.type || DEFAULT_PARAMS.type );
    }

    req
      .accept( params.accept || DEFAULT_PARAMS.accept )
      .query( params.query );
    if ( data && !params.attachment ) {
      req.send( data );
    }
    req.set( reqHeaders );

    return req.promise();
  };

const REST = ( config ) => ({

  /**
   * @param urlOrParams: string url or params {
   *  query: queryParams key value pairs
   *  headers: request  headers to send,
   *  accept: response content-type
   * }
   * @param query: queryParams key value pairs
   */
  get( urlOrParams, query ) {
    return sendRequest( config, _parseParams( 'get', urlOrParams, query ) );
  },

  /**
   * @param urlOrParams: string url or params {
   *  headers: request headers to send
   *  query: queryParams key value pairs
   *  attachment: default false, true for multipart form request
   *  type: content-type of request
   *  accept: response content-type
   *  data: payload
   * }
   * @param data
   */
  post( urlOrParams, data ) {
    return sendRequest( config, _parseParams( 'post', urlOrParams, data ) );
  },

  /**
   * same as post
   */
  put( urlOrParams, data ) {
    return sendRequest( config, _parseParams( 'put', urlOrParams, data ) );
  },

  remove( urlOrParams ) {
    return sendRequest( config, _parseParams( 'del', urlOrParams ) );
  },
});

export default {create: ( config ) => REST( Object.assign( {}, DEFAULT_CONFIG, config ) )};
