const path = require('path');
const fs = require('fs');
const expect = require('chai').expect;
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const entryFilePath = path.join(__dirname, 'source/entry.css');
const outputDirPath = path.join(__dirname, 'output');
const outputFileName = 'output.js';
const outputCSSFileName = 'bundle.css';
const outputCSSPath = path.join(outputDirPath, outputCSSFileName);

const getTestWebPackConfig = loaders => {
  return {
    entry: entryFilePath,
    output: {
      path: outputDirPath,
      filename: outputFileName
    },
    module: {
      rules: [loaders]
    },
    plugins: [new ExtractTextPlugin(outputCSSFileName)]
  };
};

describe('CSS-Exact-URL-Loader test', () => {
  it('should transform relative url to absolute url', done => {
    webpack(
      getTestWebPackConfig({
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: '__this-loader',
              query: {
                from: '/assets/',
                to: 'https://domain/assets/',
                production: false
              }
            }
          ]
        })
      }),
      (error, stats) => {
        expect(error).to.equal(null);

        fs.readFile(outputCSSPath, 'utf8', (err, contents) => {
          expect(err).to.equal(null);
          expect(contents).to.be.a('string');
          expect(contents).is.include('https://domain/assets/');
          done();
        });
      }
    );
  });

  it('should transform old url to new url', done => {
    webpack(
      getTestWebPackConfig({
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: '__this-loader',
              query: {
                from: '/assets/',
                to: '/dir/assets/',
                production: false
              }
            }
          ]
        })
      }),
      (error, stats) => {
        expect(error).to.equal(null);

        fs.readFile(outputCSSPath, 'utf8', (err, contents) => {
          expect(err).to.equal(null);
          expect(contents).to.be.a('string');
          expect(contents).is.include('/dir/assets/');
          done();
        });
      }
    );
  });
});
