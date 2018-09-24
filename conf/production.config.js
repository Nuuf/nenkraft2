var path = require( 'path' );
var webpack = require( 'webpack' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );
var MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
var CopyWebpackPlugin = require( 'copy-webpack-plugin' );
var banner = require( '../banner' )();

module.exports = function () {

  return {
    entry: {
      demos: [
        './demos/index.js'
      ]
    },
    output: {
      path: path.resolve( __dirname, '../dist' ),
      filename: '[name].js'
    },
    externals: {

    },
    plugins: [
      new HtmlWebpackPlugin( {
        template: './src/index.html',
        filename: './index.html',
        chunks: [ 'demos' ]
      } ),
      new MiniCssExtractPlugin( {
        filename: '[name].css',
        chunkFilename: '[id].css'
      } ),
      new webpack.BannerPlugin( {
        banner: banner,
        raw: true,
        entryOnly: true
      } ),
      new CopyWebpackPlugin( [ {
        from: './assets',
        to: './assets',
        toType: 'dir'
      } ] )
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { 'minimize': true }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [ 
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.shader|txt$/,
          use: {
            loader: 'raw-loader'
          },
          exclude: /node_modules/
        }
      ]
    }
  };

};
