const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Add this import

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    hot: true,
    open: true,
    port: 'auto',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Use an HTML template if you have one, or let webpack generate it
    }),
  ],
};

