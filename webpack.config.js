const path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'trimstring.js',
    libraryTarget: 'umd',
    library: 'trimstring',
  },

  // Ramda must be included in consumer env
  // externals: {
  //   'ramda': {
  //     commonjs: 'ramda',
  //     commonjs2: 'ramda',
  //     amd: 'ramda',
  //     root: 'R', // Assume ramda is defined as window.R if it was loaded via script tag
  //   },
  // },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: [
            ['babel-preset-es2015', { modules: false }],
            'babel-preset-stage-1',
          ],
        },
      },
    ],
  },
};
