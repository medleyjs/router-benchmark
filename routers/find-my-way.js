'use strict';

const findMyWay = require('find-my-way');

// From: https://github.com/delvedor/find-my-way/blob/v2.2.0/index.js#L597-L608
function sanitizeUrl(url) {
  for (var i = 0, len = url.length; i < len; i++) {
    var charCode = url.charCodeAt(i);
    // Some systems do not follow RFC and separate the path and query
    // string with a `;` character (code 59), e.g. `/foo;jsessionid=123456`.
    // Thus, we need to split on `;` as well as `?` and `#`.
    if (charCode === 63 || charCode === 59 || charCode === 35) {
      return url.slice(0, i);
    }
  }
  return url;
}

const router = findMyWay();

module.exports = {
  registerRoute(method, path, handler) {
    router.on(method, path, handler);
  },

  findHandler(req) {
    const route = router.find(req.method, sanitizeUrl(req.url));
    return route === null ? undefined : route.handler;
  },
};
