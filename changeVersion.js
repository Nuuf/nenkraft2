var fs = require( 'fs' );
var v = process.argv[ 2 ];
var VERSION = '"version": "' + v + '",';
var files = [
  './package.json',
  './bundle-fe/package.json',
  './bundle-be/package.json'
];

files.forEach( function ( filename ) {

  fs.readFile( filename, 'utf8', function ( err, content ) {

    if ( err ) {

      console.log( newContent );

      console.error( err );

      return;
    
    }

    console.log( 'file loaded -- changing version', filename, VERSION );

    var newContent = content.replace( /\"version":.*?\,/g, VERSION );

    fs.writeFile( filename, newContent, 'utf8', function ( err ) {

      if ( err ) console.error( err );
      else console.log( 'file version changed', filename, VERSION );

    } );

  } );

} );

// Run with node -- node ./changeVersion.js 1.0.0
