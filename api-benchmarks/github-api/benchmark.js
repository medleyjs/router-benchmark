'use strict';

const Benchmark = require('benchmark');

const routers = require('../../routers');
const routes = require('./routes');
const runSuite = require('../../helpers/runSuite');

const suite = new Benchmark.Suite();

nextRouter: for (const router of routers) {
  for (const [method, path] of routes) {
    try {
      router.registerRoute(method, path, () => null);
    } catch (err) {
      console.log(router.name, '- skipping since it doesn’t support all routes in this API');
      continue nextRouter;
    }
  }

  const {findHandler} = router;

  suite.add(router.name, () => {
    for (let i = 0; i < routes.length; i++) {
      const req = {method: routes[i][0], url: routes[i][2]};
      findHandler(req);
    }
  });
}

console.log();

runSuite(suite);
