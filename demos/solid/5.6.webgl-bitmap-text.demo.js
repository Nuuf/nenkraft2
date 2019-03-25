import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'WebGLBitmapText', ( conf ) => {

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

    const options = {
      canvas: c,
      halt: false,
      mode: 'WebGL'
    };
    const stage = conf.stage = new nk2.Stage2D( options );
    const root = new nk2.VisualContainer2D( 0, 0 );
    const camera = new nk2.Camera2D( 
      new nk2.Vector2D( 0, 0 ), { position: new nk2.Vector2D( 0, 0 ) }
    );
    const scene = new nk2.VisualContainer2D( HW, HH );

    stage.gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    camera.force.SetSame( 5 );

    stage
      .AddChild( root )
      .AddChild( camera )
      .AddChild( scene );

    const canvasManager = new nk2.CanvasManager( c, W, H, nk2.CanvasManager.KEEP_ASPECT_RATIO_FIT );

    canvasManager
      .BindStage( stage )
      .BindRootContainer( root )
      .Trigger();

    const pc = new nk2.Controller.ProgramController.GLTexture2DProgramController( stage.gl );

    pc.BindBasicTexture( window.testData.imgloader.GetBasicTextureById( 'fontimg' ) );

    const bitmapText = new nk2.BitmapText(
      0, 0,
      pc,
      window.testData.xhrloader.GetDataById( 'fontdataxml' ),
      window.testData.lorem
    );

    bitmapText.scale.SetSame( 0.3 );

    bitmapText.x = -bitmapText.width * 0.5;
    bitmapText.y = -bitmapText.height * 0.5;

    scene.AddChild( bitmapText );

    stage.mouse.AddOffset( scene ).AddOffset( camera );

    stage.onProcess.Add( () => {

      camera.Process();
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV( event.data.position );

    } );

  } );

};
