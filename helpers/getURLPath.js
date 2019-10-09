'use strict';

// Some routers don't handle query strings, so remove them in the simplest way possible
function getURLPath(url) {
  const queryIndex = url.indexOf('?');
  return queryIndex === -1 ? url : url.slice(0, queryIndex);
}

module.exports = getURLPath;
