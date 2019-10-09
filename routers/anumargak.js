'use strict';

const anumargak = require('anumargak');

const router = anumargak();

module.exports = {
  registerRoute(method, path, handler) {
    router.on(method, path, handler);
  },

  findHandler(req) {
    const route = router.find(req.method, req.url);
    return route.handler;
  },
};
