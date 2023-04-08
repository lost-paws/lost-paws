const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
//import HtmlWebpackPlugin from 'html-webpack-plugin';
// import path from 'path';

// import { fileURLToPath } from 'url';

// const filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(filename);

module.exports = {
  entry: './src/index.tsx',
  target: 'web',
  devServer: {
    port: '3000',
    static: {
      directory: path.join(__dirname, 'public'),
    },
    open: true,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
  },
  resolve: {
    fullySpecified: false,
    extensions: ['.js', '.jsx', '.json', '.tsx', '.ts', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
  ],
};
