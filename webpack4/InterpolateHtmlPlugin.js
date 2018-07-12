/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This Webpack plugin lets us interpolate custom variables into `index.html`.
// Usage: `new InterpolateHtmlPlugin({ 'MY_VARIABLE': 42 })`
// Then, you can use %MY_VARIABLE% in your `index.html`.

// It works in tandem with HtmlWebpackPlugin.
// Learn more about creating plugins like this:
// https://github.com/ampedandwired/html-webpack-plugin#events

'use strict';

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

const escapeStringRegexp = function (str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }
  return str.replace(matchOperatorsRe, '\\$&');
};

class InterpolateHtmlPlugin {
  constructor(replacements) {
    this.replacements = replacements;
  }

  apply(compiler) {
    // @NEW 新写法
    // 参考 https://github.com/jantimon/html-webpack-plugin#events
    // https://github.com/jantimon/html-webpack-harddisk-plugin/blob/master/index.js
    compiler.hooks.compilation.tap('InterpolateHtmlPlugin', (compilation) => {
      // console.log('The compiler is starting a new compilation...named InterpolateHtmlPlugin');
      // console.log(compilation.hooks.htmlWebpackPluginAfterHtmlProcessing);
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
        'InterpolateHtmlPlugin',
        (data, cb) => {
          // Run HTML through a series of user-specified string replacements.
          Object.keys(this.replacements).forEach(key => {
            const value = this.replacements[key];
            data.html = data.html.replace(
              new RegExp('%' + escapeStringRegexp(key) + '%', 'g'),
              value
            );
          });
          cb(null, data);
        }
      )
    })
  }
}

module.exports = InterpolateHtmlPlugin;