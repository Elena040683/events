const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const Handlebars = require("handlebars");
const webpack = require('webpack');

module.exports = {
  entry: {
    // Откуда файлы берем
    main: path.resolve(__dirname, './src/index.js')
  },

  output: {
    // Куда выгружаем переработанные вебпаком файлы
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
  
   plugins: [
     new CleanWebpackPlugin(),
     new HtmlWebpackPlugin({
       title: 'My App',
       template: path.resolve(__dirname, './src/index.html'),
       filename: 'index.html',
       inject: 'body',
     }),
      new webpack.HotModuleReplacementPlugin(),
   ],

   module: {
     rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.hbs$/,
        use: 'handlebars-loader',
      },
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: ['babel-loader'],
      },
       {
         test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
         type: 'asset/resource',
       },
       {
         test: /\.(woff(2)?|eot|tif|otf|svg|)$/,
         type: 'asset/inline',
       },
       {
         test: /\.(scss|css)$/,
         use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },

     ],
  },

   mode: "development",
    //  devServer: {
    //    historyApiFallback: true,
    //    contentBase: path.resolve(__dirname, 'dist'),
    //    open: true,
    //    compress: true,
    //    hot: true,
    //    port: 3000,
    //  },
     devServer: {
      static: path.resolve(__dirname, 'src'),
      port: 8080,
      open: true,
      hot: true
  }
}