var path = require( 'path' );
var webpack = require( 'webpack' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );
var MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
var banner = require( '../banner' )();

module.exports = function () {

  return {
    entry: {
      tests: [
        './tests/index.js'
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
        chunks: [ 'tests' ]
      } ),
      new MiniCssExtractPlugin( {
        filename: '[name].css',
        chunkFilename: '[id].css'
      } ),
      new webpack.BannerPlugin( {
        banner: banner,
        raw: true,
        entryOnly: true
      } )
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
        }
      ]
    }
  };

};
