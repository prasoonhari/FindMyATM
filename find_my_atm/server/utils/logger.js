/**
 * Created by prasoon on 11/13/16.
 */
import winston from 'winston';
import {logger} from '../configs/environment';

var LOG_FOLDER_ROOT = logger.root;

export default new (winston.Logger)( {
  transports: [
    new (winston.transports.File)( {
      name: 'info-file',
      filename: `${LOG_FOLDER_ROOT}/filelog-info.log`,
      level: 'info'
    } ),
    new (winston.transports.File)( {
      name: 'error-file',
      filename: `${LOG_FOLDER_ROOT}/filelog-error.log`,
      level: 'error'
    } ),
    new (winston.transports.Console)( {level: 'debug'} ),
  ]
} );