'use strict';

const chalk = require('chalk');

function runSuite(suite, indent = '') {
  const results = [];

  suite
    .on('cycle', (event) => {
      results.push(event.target);
    })
    .on('complete', function() {
      const fastest = this.filter('fastest').map('name');
      const maxOps = results.reduce((max, result) => Math.max(max, result.hz), 0);

      for (const result of results) {
        const barWidth = Math.round(result.hz / maxOps * 100);
        const output = indent + String(result) + '\n' + indent + '▀'.repeat(barWidth);
        console.log(fastest.includes(result.name) ? chalk.bold.green(output) : output);
      }

      console.log();
    })
    .run();
}

module.exports = runSuite;
