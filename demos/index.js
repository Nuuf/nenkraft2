require( '../style/default.css' );

const nk2 = require( '../src/fe.index' );

console.log( nk2, nk2.Shader.UN );

nk2.Utility.PRINT_VERSION();

nk2.Sprite.BUILD_DEFAULT_TEXTURE( () => {

  nk2.Tilesprite.BUILD_DEFAULT_TEXTURE( () => {

    const loaderCombiner = new nk2.Load.LoaderCombiner( [ 
      {
        loader: new nk2.Load.ImageLoader( null, null, () => console.log( 'IMAGE Finished' ) ),
        args: [
          [
            { id: 'fontimg', src: './assets/images/font.png' },
            { id: 'fontNoK', src: './assets/images/fontNoK.png' },
            { id: '1to8', src: './assets/images/1to8.png' },
            { id: '4dots', src: './assets/images/4dots.png' },
            { id: 'colors', src: './assets/images/colors.png' },
            { id: 'glass-of-blueberryjuice', src: './assets/images/glass-of-blueberryjuice.png' },
            { id: 'raindrop', src: './assets/images/raindrop.png' },
            { id: 'smudge', src: './assets/images/smudge.png' },
            { id: 'watertest', src: './assets/images/watertest.jpg' }
          ], 
          true
        ]
      },
      {
        loader: new nk2.Load.XHRLoader( null, () => console.log( 'XHR Finished' ) ),
        args: [
          [
            { id: 'fontdataxml', src: './assets/xhr/font.fnt', type: 'xml' },
            { id: 'fontdatajson', src: './assets/xhr/font.json', type: 'json' },
            { id: 'fontNoK', src: './assets/xhr/fontNoK.xml', type: 'xml' },
            { id: 'particleExplosion', src: './assets/xhr/particle-explosion.json', type: 'json' },
            { id: 'lorem', src: './assets/xhr/lorem.json', type: 'json' }
          ]
        ]
      },
      {
        loader: new nk2.Load.SpritesheetLoader( null, () => console.log( 'Spritesheet Finished' ) ),
        args: [
          [
            {
              id: 'sheet-default',
              image: {
                src: './../assets/images/invaders/invaders-sheet.png'
              },
              data: {
                src: './../assets/xhr/invaders.json',
                type: 'json'
              }
            },
            {
              id: 'sheet-character',
              image: {
                src: './../assets/images/spritesheet-character.png'
              },
              data: {
                src: './../assets/xhr/spritesheet-character.json',
                type: 'json'
              }
            }
          ]
        ]
      },
      {
        loader: new nk2.Load.TilesetLoader( null, () => console.log( 'Tileset Finished' ) ),
        args: [
          [
            {
              id: 'tileset',
              image: {
                src: './../assets/images/aseprite-tiles.png'
              },
              mapData: {
                src: './../assets/xhr/aseprite-tiles.json',
                type: 'json'
              },
              setData: {
                src: './../assets/xhr/aseprite-tiles.tsx',
                type: 'xml'
              }
            }
          ]
        ]
      }
    ] );

    loaderCombiner.onComplete.Once( () => {

      console.log( loaderCombiner );
      Go();
    
    } );
    loaderCombiner.Load();
  
    function Go () {
  
      const demos = [];
  
      window.testData = {
        xhrloader: loaderCombiner.loaders[ 1 ],
        imgloader: loaderCombiner.loaders[ 0 ],
        ssloader: loaderCombiner.loaders[ 2 ],
        tsloader: loaderCombiner.loaders[ 3 ],
        invadersSpritesheet: loaderCombiner.loaders[ 2 ].GetSpritesheetById( 'sheet-default' ),
        characterSheet: loaderCombiner.loaders[ 2 ].GetSpritesheetById( 'sheet-character' ),
        tileset: loaderCombiner.loaders[ 3 ].GetTilesetById( 'tileset' ),
        lorem: loaderCombiner.loaders[ 1 ].GetDataById( 'lorem' ).lorem
      };

      window.testData.invadersSpritesheet.GenerateFrames();
      window.testData.characterSheet.GenerateFrames();
  
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
