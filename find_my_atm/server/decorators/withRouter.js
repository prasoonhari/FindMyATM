/**
 * Created by prasoon on 9/10/16.
 */

import {forEach, castArray, isArray} from 'lodash';
import express from 'express';

function useRoutes(router, path, routes) {
  routes.forEach(route => {
    router.use(path, route);
  });
}

export default function (pathToRoutes) {
  const router = express.Router();

  if (isArray(pathToRoutes)) {
    useRoutes(router, '/',  pathToRoutes);
    return router;
  }

  forEach(pathToRoutes, (route, path)=> {
    const routes = castArray(route);
    useRoutes(router, path, routes);
  });
  return router;
}

