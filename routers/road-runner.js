'use strict';

const {RoadRunner} = require('@parisholley/road-runner');
const getURLPath = require('../helpers/getURLPath');

const router = new RoadRunner();

module.exports = {
  registerRoute(method, path, handler) {
    router.addRoute(method, path, handler);
  },

  findHandler(req) {
    const route = router.findRoute(req.method, getURLPath(req.url));
    return route === null ? undefined : route.value;
  },
};
