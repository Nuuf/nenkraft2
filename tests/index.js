require( '../style/default.css' );

console.log( require( '../src/fe.index' ) );

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
