import path from 'path';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

export default merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.[contentHash].js',
    publicPath: '/',
  },
  target: 'web',
  devServer: {
    port: '6969',
    static: {
      directory: path.join(__dirname, 'public'),
    },
    open: true,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
  },
});