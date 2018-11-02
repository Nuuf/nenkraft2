var fs = require( 'fs' );
var v = process.argv[ 2 ];

if ( v == null ) throw new Error( 'version argument was null...' );

var VERSION = '"version": "' + v + '",';
var files = [
  './package.json',
  './bundle-fe/package.json',
  './bundle-be/package.json'
];

files.forEach( function ( path ) {

  fs.readFile( path, 'utf8', function ( err, content ) {

    if ( err ) {

      console.log( newContent );

      console.error( err );

      return;
    
    }

    console.log( 'file loaded -- changing version', path, VERSION );

    var newContent = content.replace( /\"version":.*?\,/g, VERSION );

    fs.writeFile( path, newContent, 'utf8', function ( err ) {

      if ( err ) console.error( err );
      else console.log( 'file version changed', path, VERSION );

    } );

  } );

} );

// Run with node -- ex - node ./changeVersion.js 1.0.0
