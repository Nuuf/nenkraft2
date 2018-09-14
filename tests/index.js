require( '../style/default.css' );

const nk2 = require( '../src/fe.index' );
console.log( nk2 );
nk2.Utilities.PRINT_VERSION();

const tests = [];

const context = require.context( './', true, /\.(test)$/ );

context.keys().forEach( ( file ) => {

  tests.push( context( file ) );

} );

{

  let i = 0;
  const l = tests.length;

  for ( ; i < l; ++i ) {

    tests[ i ].default();
      
  }

}
