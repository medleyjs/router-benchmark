'use strict';

const fs = require('fs');
const path = require('path');

const routersDir = path.join(__dirname, 'routers');

const routers = fs.readdirSync(routersDir)
  .filter(fileName => fileName.endsWith('.js'))
  .map(fileName => ({
    name: fileName.slice(0, -3), // Slice off '.js'
    ...require(path.join(routersDir, fileName)),
  }));

module.exports = routers;
