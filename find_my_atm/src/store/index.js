/**
 * Created by prasoon on 9/30/16.
 */
import configureStore from './configureStore';
import middleware from './middleware';

/**
 * configureStore is store factory which accepts middleware (should be created with getMiddleware factory)
 */
export { configureStore };
/**
 * getMiddleware is middleware factory for web, ios, and android
 */
export { middleware as getMiddleware };
