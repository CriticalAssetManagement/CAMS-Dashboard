const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebPackPlugin= require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => ({
  entry: [
    path.join(__dirname, './src/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[contenthash].js",
    publicPath: '/'
  },
  devtool:argv.mode === 'production' ? false : '#inline-source-map',
  plugins: [
    new Dotenv({path: path.resolve(__dirname, '.env'), systemvars: true}),
    new HtmlWebPackPlugin({
        inject: true,
        template: path.resolve(__dirname, './src/index.html'),
        bundleFileName:"tdb-dashboard.min.js"
      }),
     new MiniCssExtractPlugin({
      filename: 'tdb-dashboard.main.css',
     }),
     new CopyWebPackPlugin({
      patterns: [
        { from: path.resolve(__dirname, "./src/App.css"), to: "App.css", force:true }
      ]})
  ],
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react')
    },
    fallback: { "https": false },
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader:"babel-loader",
          options:{
            presets: [
              ["@babel/preset-env"],
              "@babel/preset-react"
            ],
          }
        },
      },
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', 'less-loader'
        ],
      },
      {
        test: /\.(svg|jpg|gif|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]',
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: (url, resourcePath, context) => {
                return `assets/fonts/${path.basename(resourcePath)}`;
              }
            }
          }
        ]
      }]
    }
});