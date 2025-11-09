const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  devtool: 'eval-source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    hot: true,
    historyApiFallback: true,
    client: { overlay: true },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      styles: path.resolve(__dirname, 'src/styles'),
      components: path.resolve(__dirname, 'src/components'),
      locale: path.resolve(__dirname, 'src/locale'),
      providers: path.resolve(__dirname, 'src/providers'),
      types: path.resolve(__dirname, 'src/types'),
      store: path.resolve(__dirname, 'src/store'),
      assets: path.resolve(__dirname, 'src/assets'),
    },
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.riv$/i,
        type: 'asset/resource',
      },
      {
        test: /\.json$/,
        type: 'json',
      },
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: { localIdentName: '[local]__[hash:base64:5]' } },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  output: { path: path.resolve(__dirname, 'dist'), filename: 'bundle.js' },
  plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') })],
};
