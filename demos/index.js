require( '../style/default.css' );

const nk2 = require( '../src/fe.index' );

console.log( nk2, nk2.Shader.UN );

nk2.Utility.PRINT_VERSION();

nk2.Sprite.BUILD_DEFAULT_TEXTURE( () => {

  nk2.Tilesprite.BUILD_DEFAULT_TEXTURE( () => {

    const xhrloader = new nk2.Load.XHRLoader();
    const imgloader = new nk2.Load.ImageLoader();
    const ssloader = new nk2.Load.SpritesheetLoader();
    let done = 0;
  
    xhrloader.Load( [
      { id: 'fontdataxml', src: './assets/xhr/font.fnt', type: 'xml' },
      { id: 'fontdatajson', src: './assets/xhr/font.json', type: 'json' },
      { id: 'fontNoK', src: './assets/xhr/fontNoK.xml', type: 'xml' },
      { id: 'particleExplosion', src: './assets/xhr/particle-explosion.json', type: 'json' }
    ] );
    imgloader.Load( [
      { id: 'fontimg', src: './assets/images/font.png' },
      { id: 'fontNoK', src: './assets/images/fontNoK.png' },
      { id: '1to8', src: './assets/images/1to8.png' },
      { id: '4dots', src: './assets/images/4dots.png' },
      { id: 'colors', src: './assets/images/colors.png' },
      { id: 'glass-of-blueberryjuice', src: './assets/images/glass-of-blueberryjuice.png' },
      { id: 'raindrop', src: './assets/images/raindrop.png' },
      { id: 'smudge', src: './assets/images/smudge.png' }
    ], true );
    ssloader.Load( [
      {
        id: 'sheet-default',
        image: {
          src: './../assets/images/invaders/invaders-sheet.png'
        },
        data: {
          src: './../assets/xhr/invaders.json',
          type: 'json'
        }
      }
    ] );
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
    ssloader.onComplete.Add( ( event ) => {

      console.log( event.data );
      done++;
      Go();

    } );
  
    function Go () {
  
      if ( done < 3 ) return ;
  
      const demos = [];
  
      window.testData = {
        xhrloader: xhrloader,
        imgloader: imgloader,
        ssloader: ssloader
      };
  
      const context = require.context( './', true, /\.(demo)$/ );
      
      context.keys().forEach( ( file ) => {
      
        demos.push( context( file ) );
      
      } );
      
      {
      
        let i = 0;
        const l = demos.length;
      
        for ( ; i < l; ++i ) {
      
          demos[ i ].default();
            
        }
      
      }
    
    }
  
  } );

} );
