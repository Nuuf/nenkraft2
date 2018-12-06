import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'WebGLTilesprite', ( conf ) => {

    const W = 1920 / 2;
    const H = 1080 / 2;
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
    const camera = new nk2.Camera2D( new nk2.Vector2D( 0, 0 ), { position: new nk2.Vector2D( 0, 0 ) } );
    const scene = new nk2.VisualContainer2D( HW, HH );

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

    pc.BindBasicTexture( nk2.Tilesprite.DEFAULT_TEXTURE );

    const tilesprite = new nk2.Tilesprite( -W * 0.25, -H * 0.25, pc );

    tilesprite.GeneratePattern( null, W * 0.5, H * 0.5 );

    scene.AddChild( tilesprite );

    stage.mouse.AddOffset( scene ).AddOffset( camera );

    stage.onProcess.Add( () => {

      camera.Process();

      tilesprite.OffsetPattern( 1, 1 );
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV( event.data.position );

    } );

  } );

};
