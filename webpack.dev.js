/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// import path from 'path';
// import { fileURLToPath } from 'url';

// import { merge } from 'webpack-merge';
const { merge } = require('webpack-merge')
// import common from './webpack.common.js';
const common = require('./webpack.common.js')
const path = require('path');

// const filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(filename);

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  target: 'web',
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    open: true,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
    // proxy: {
    //   context: ['/api/v1/dreams', '/api/v1/interp'],
    //   target: 'http://localhost:6968',
    // },
  },
});
