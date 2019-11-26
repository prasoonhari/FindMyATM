/**
 * Created by prasoon on 9/10/16.
 */
import express from 'express';
import withRouter from  './withRouter';

function addGetRouter(targetClass) {
  if (!targetClass.__router__) {
    targetClass.__router__ = express.Router();
  }
  return targetClass.__router__;
}

function wrapWithRouter(method, path, target, fn) {
  const router = addGetRouter(target.constructor);
  router[method](path, fn);
  return fn;
}

export const REST = {

  GET(path) {
    return (target, key, descriptor) => {
      return wrapWithRouter('get', path, target, descriptor.value);
    };
  },

  POST(path) {
    return (target, key, descriptor) => {
      return wrapWithRouter('post', path, target, descriptor.value);
    };
  }

};

export function getRoutes(targetClass) {
  return withRouter({[targetClass.__path__]: targetClass.__router__});
}

export default function (path) {
  return (targetClass) => {
    targetClass.__path__ = path;
    addGetRouter(targetClass);
    return targetClass;
  };
}