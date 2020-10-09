const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              data: '@import "src/global.scss";',
              includePaths: [path.resolve(__dirname, 'src')],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.scss', '.js'],
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    publicPath: '/',
  },
};
