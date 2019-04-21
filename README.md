# css-url-loader

[![NPM version][npm-image]][npm-url] [![npm module downloads][npm-downloads-image]][npm-downloads-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url] [![License: MIT][license-image]][license-url]

Webpack loader to transform URLs to other URLs in CSS.

## Description

Transform URLs to other URLs in the `url()`s in your CSS. You can change relative urls to absolute urls, or you can change old urls to new urls that you want.

## Install

```bash
npm install --save-dev css-url-loader
```

Or

```bash
yarn add --dev css-url-loader
```

## Usage

When you want to trasform `url(/assets/...)` to `url(https://domain/assets/...)`, the `webpack.config.js` is below

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-loader',
          {
            loader: 'css-url-loader',
            options: {
              from: '/assets/',
              to: 'https://domain/assets/'
            }
          }
        ],
      },
    ],
  }
}
```

When you want to trasform `url(/assets/...)` to `url(/dir/assets/...)`, the `webpack.config.js` is below

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-loader',
          {
            loader: 'css-url-loader',
            options: {
              from: '/assets/',
              to: '/dir/assets/'
            }
          }
        ],
      },
    ],
  },
}
```

When you want to trasform urls when only development env, the `webpack.config.js` is below

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-loader',
          {
            loader: 'css-url-loader',
            options: {
              from: '/assets/',
              to: '/tmp/assets/',
              env: 'development'
            }
          }
        ],
      },
    ],
  },
}
```

When you want to trasform urls when only development mode, the `webpack.config.js` is below

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-loader',
          {
            loader: 'css-url-loader',
            options: {
              from: '/assets/',
              to: '/tmp/assets/',
              mode: 'development'
            }
          }
        ],
      },
    ],
  },
}
```

## Options

| Option | Description                                                                             | Required |
| ------ | :-------------------------------------------------------------------------------------- | :------: |
| from   | original url in url()                                                                   |    Yes     |
| to     | transformed url                                                                         |    Yes     |
| env    | process when `env` is equal to `process.env.NODE_ENV`. Default is 'production'. |    No    |
| mode   | process when `mode` is equal to `process.env.WEBPACK_MODE`. Default is 'production'. |    No    |

[npm-url]: https://npmjs.org/package/css-url-loader
[npm-image]: https://badge.fury.io/js/css-url-loader.svg
[npm-downloads-url]: https://npmjs.org/package/css-url-loader
[npm-downloads-image]: https://img.shields.io/npm/dt/css-url-loader.svg
[travis-url]: https://travis-ci.org/keidrun/css-url-loader
[travis-image]: https://secure.travis-ci.org/keidrun/css-url-loader.svg?branch=master
[depstat-url]: https://david-dm.org/keidrun/css-url-loader
[depstat-image]: https://david-dm.org/keidrun/css-url-loader.svg
[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
