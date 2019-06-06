import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'Tilemap', ( conf ) => {

    const W = 600;
    const H = 400;
    const HW = W * 0.5;
    const HH = H * 0.5;
    const c = conf.canvas = document.createElement( 'canvas' );

    document.body.appendChild( c );
    c.setAttribute( 'width', W );
    c.setAttribute( 'height', H );
    c.style.display = 'initial';
    c.style.position = 'absolute';

    /*
     * Important! Always add padding to tiles if using antialiasing
     * For example, 64x64 tiles original images should be 66x66.
     * If adding 1px padding then margin = margin + 1 and padding = padding + 2;
     * Padding should not be transparent
     * as this will result in black flickering lines between the tiles
     */

    const options = {
      canvas: c,
      halt: false,
      mode: 'webgl2',
      antialias: false
    };
    const stage = conf.stage = new nk2.Stage2D( options );
    const root = new nk2.VisualContainer2D( 0, 0 );
    const camera = new nk2.Camera2D( 
      new nk2.Vector2D( 0, 0 ), 
      { position: new nk2.Vector2D( 0, 0 ) }
    );
    const scene = new nk2.VisualContainer2D( HW, HH );
    const dragStart = new nk2.Vector2D( 0, 0 );
    const dragOffset = new nk2.Vector2D( 0, 0 );
    let mouseIsDown = false;
    const tpc = new nk2.Controller.ProgramController.GLTexture2DProgramController( stage.gl );

    tpc.BindBasicTexture( window.testData.tileset.basicTexture, stage.gl.LINEAR );
    const culler = new nk2.Culler2D( 0, 0, W, H ).SetConversionMatrix( stage.glConvMatrix );

    camera.force.SetSame( 5 );

    stage
      .AddChild( root )
      .AddChild( camera )
      .AddChild( scene );

    const canvasManager = new nk2.CanvasManager( c, W, H, nk2.CanvasManager.KEEP_ASPECT_RATIO_FIT );

    canvasManager
      .BindStage( stage )
      .BindRootContainer( root )
      .BindCuller( culler )
      .Trigger();

    window.testData.tileset.pc = tpc;

    const tm = new nk2.Tilemap( 
      -HW, -HH,
      window.testData.tileset,
      0
    );

    tm.Cull( culler );

    tm.scale.SetSame( 1 );

    scene.AddChild( tm );

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
