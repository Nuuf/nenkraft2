module.exports = function ( env ) {

  if ( env === 'development' ) {

    return require( './conf/development.config' )();
  
  }

  if ( env === 'production' ) {

    return require( './conf/production.config' )();
  
  }

  if ( env === 'bundle-fe' ) {

    return require( './conf/bundle.fe.config' )();
  
  }

  if ( env === 'bundle-be' ) {

    return require( './conf/bundle.be.config' )();
  
  }

};
