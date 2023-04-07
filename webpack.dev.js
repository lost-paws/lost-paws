import path from 'path';
import { fileURLToPath } from 'url';

import { merge } from 'webpack-merge';
import common from './webpack.common.js';

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

export default merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  target: 'web',
  devServer: {
    port: 6969,
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
