# css-url-loader [![NPM version][npm-image]][npm-url] [![npm module downloads][npm-downloads-image]][npm-downloads-url] [![Dependency Status][depstat-image]][depstat-url] [![License: MIT][license-image]][license-url]

Webpack loader to transform URLs to other URLs in CSS.

## Description

Transform URLs to other URLs in the `url()`s in your CSS. You can change relative urls
to absolute urls, or you can change old urls to new urls that you want.

## Install

```bash
npm install --save-dev css-url-loader
```

Or

```bash
yarn add --dev css-url-loader
```

## Usage

### When you want to trasform `url(/assets/...)` to `url(https://domain/assets/...)`, the `webpack.config.js` is below

```javascript
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'css-url-loader',
              query: {
                from: '/assets/',
                to: 'https://domain/assets/'
              }
            }
          ],
        }),
      },
      ...
    ],
  },
  plugins: [
    ...
    new ExtractTextPlugin('bundle.css'),
    ...
  ],
```

### When you want to trasform `url(/assets/...)` to `url(/dir/assets/...)`, the `webpack.config.js` is below

```javascript
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'css-url-loader',
              query: {
                from: '/assets/',
                to: '/dir/assets/'
              }
            }
          ],
        }),
      },
      ...
    ],
  },
  plugins: [
    ...
    new ExtractTextPlugin('bundle.css'),
    ...
  ],
```

### When you want to trasform urls when only development, the `webpack.config.js` is below

```javascript
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'css-url-loader',
              query: {
                from: '/assets/',
                to: '/tmp/assets/',
                env: 'development
              }
            }
          ],
        }),
      },
      ...
    ],
  },
  plugins: [
    ...
    new ExtractTextPlugin('bundle.css'),
    ...
  ],
```

## Options

| Option | Description                                                                             | Required |
| ------ | :-------------------------------------------------------------------------------------- | :------: |
| from   | original url in url()                                                                   |    Y     |
| to     | transformed url                                                                         |    Y     |
| env    | value to control execution timing with `process.env.NODE_ENV`. Default is 'production'. |    N     |

[npm-url]: https://npmjs.org/package/css-url-loader
[npm-image]: https://badge.fury.io/js/css-url-loader.svg
[npm-downloads-url]: https://npmjs.org/package/css-url-loader
[npm-downloads-image]: https://img.shields.io/npm/dt/css-url-loader.svg
[depstat-url]: https://david-dm.org/keidrun/css-url-loader
[depstat-image]: https://david-dm.org/keidrun/css-url-loader.svg
[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
