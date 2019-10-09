'use strict';

const Router = require('trek-router');
const getURLPath = require('../helpers/getURLPath');

function paramsToObject(params) {
  const paramsObj = {};
  for (let i = 0; i < params.length; i++) {
    paramsObj[params[i].name] = params[i].value;
  }
  return paramsObj;
}

const router = new Router();

module.exports = {
  registerRoute(method, path, handler) {
    router.add(method, path, handler);
  },

  findHandler(req) {
    const route = router.find(req.method, getURLPath(req.url));
    paramsToObject(route[1]);
    return route[0];
  },
};
