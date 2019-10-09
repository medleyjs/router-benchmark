'use strict';

const Router = require('@medley/router');

const router = new Router();

module.exports = {
  registerRoute(method, path, handler) {
    const store = router.register(path);
    store[method] = handler;
  },

  findHandler(req) {
    const route = router.find(req.url);
    return route === null ? undefined : route.store[req.method];
  },
};
