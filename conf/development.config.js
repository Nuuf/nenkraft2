var path = require( 'path' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );
var MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = function () {

  return {
    entry: {
      tests: [
        './tests/index.js'
      ]
    },
    output: {
      path: path.resolve( __dirname, '../dev' ),
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
    },
    devServer: {
      port: 3000,
      hot: false,
      open: false,
      host: '0.0.0.0'
    }
  };

};
