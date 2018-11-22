import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'PGPACKING', ( conf ) => {

    const W = window.innerWidth;
    const H = window.innerHeight;
    const HW = W * 0.5;
    const HH = H * 0.5;
    const c = conf.canvas = document.createElement( 'canvas' );

    document.body.appendChild( c );
    c.setAttribute( 'width', W );
    c.setAttribute( 'height', H );
    c.style.display = 'initial';
    c.style.position = 'absolute';

    const options = {
      canvas: c,
      halt: true
    };
    const stage = conf.stage = new nk2.Stage2D( options );
    const camera = new nk2.Camera2D( new nk2.Vector2D( HW, HH ), { position: new nk2.Vector2D( 0, 0 ) } );
    const rootContainer = new nk2.VisualContainer2D( 0, 0 );
    const dragStart = new nk2.Vector2D( 0, 0 );
    const dragOffset = new nk2.Vector2D( 0, 0 );
    let mouseIsDown = false;
    let i = 15;
    const sprites = [];

    while ( i-- ) {

      const s = new nk2.Sprite( 0, 0 );

      s.w = ( 100 + Math.random() * 100 ) | 0;
      s.h = ( 100 + Math.random() * 10 ) | 0;

      sprites.push( s );
    
    }

    sprites.sort( ( a, b ) => {

      return b.w - a.w;
    
    } );

    const packer = new nk2.Packing.RectanglePacker().SetPadding( 10, 10 );
    const packingResult = packer.PackDynamic( sprites );

    packingResult.forEach( ( result, index ) => {

      if ( result ) {

        sprites[ index ].position.SetV( result.tl );
      
      }
    
    } );

    stage
      .AddChild( camera )
      .AddChild( rootContainer )
      .AddChildren( sprites );

    stage.ticker.StartAF();

    stage.mouse.onDown.Add( ( event ) => {

      mouseIsDown = true;
      dragStart.SetV( event.data.position );
      dragOffset.SetV( camera.position );
    
    } );
    stage.mouse.onUp.Add( () => {

      mouseIsDown = false;
    
    } );
    stage.mouse.onMove.Add( ( event ) => {

      if ( mouseIsDown ) {

        camera.position.SetV( event.data.position ).AddV( dragOffset ).SubtractV( dragStart );
      
      }

    } );

  } );

};
