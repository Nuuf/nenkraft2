var path = require( 'path' );
var webpack = require( 'webpack' );
var banner = require( '../banner' )();

module.exports = function () {

  return {
    entry: {
      nk2: [
        './src/be.index.js'
      ]
    },
    output: {
      path: path.resolve( __dirname, '../bundle-be/dist' ),
      filename: '[name].js',
      library: 'nk2',
      libraryTarget: 'umd',
      globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    externals: {

    },
    plugins: [
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
        }
      ]
    }
  };

};
