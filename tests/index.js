require( '../style/default.css' );

const nk2 = require( '../src/fe.index' );

console.log( nk2 );
nk2.Utilities.PRINT_VERSION();

nk2.Sprite.BUILD_DEFAULT_TEXTURE( () => {

  nk2.Tilesprite.BUILD_DEFAULT_TEXTURE( () => {

    const xhrloader = new nk2.Load.XHRLoader();
    const imgloader = new nk2.Load.ImageLoader();
    let done = 0;
  
    xhrloader.Load( [
      { id: 'fontdataxml', src: './assets/xhr/font.fnt', type: 'xml' },
      { id: 'fontdatajson', src: './assets/xhr/font.json', type: 'json' },
      { id: 'fontNoK', src: './assets/xhr/fontNoK.xml', type: 'xml' }
    ] );
    imgloader.Load( [
      { id: 'fontimg', src: './assets/images/font.png' },
      { id: 'fontNoK', src: './assets/images/fontNoK.png' }
    ], true );
    xhrloader.onComplete.Add( function ( event ) {
  
      console.log( event.data );
      console.log( JSON.stringify( event.data.dataCache.items[ 0 ].data ) === JSON.stringify( event.data.dataCache.items[ 1 ].data ) );
      done++;
      Go();
    
    } );
    imgloader.onComplete.Add( function ( event ) {
  
      console.log( event.data );
      done++;
      Go();
    
    } );
  
    function Go () {
  
      if ( done < 2 ) return ;
  
      const tests = [];
  
      window.testData = {
        xhrloader: xhrloader,
        imgloader: imgloader
      };
  
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
    
    }
  
  } );

} );
