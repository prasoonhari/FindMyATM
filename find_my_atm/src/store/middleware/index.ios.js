import {
  compose,
  applyMiddleware,
} from 'redux';

//Middlewares
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

export default function () {
  const middlewares = [thunk];
  if (process.env.NODE_ENV === 'development') {
    //TODO check if we want to add promise, batch-actions middleware
    middlewares.push(createLogger());
  }
  return compose(
    applyMiddleware(...middlewares)
  );
}
