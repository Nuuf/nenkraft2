import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'WebGLRectangle', ( conf ) => {

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

    const pc = new nk2.Controller.ProgramController.GLRectangleProgramController( stage.gl );
    const path = new nk2.Path.AABB2D( -100, -100, 100, 100 );

    path.style.stroke.lineWidth = 1;

    path.LinkProgramController( pc );

    const graphic = new nk2.Graphic2D( 0, 0, path );

    scene.Mount( graphic );

    stage.mouse.AddOffset( scene ).AddOffset( camera );

    stage.onProcess.Add( () => {

      camera.Process();

      graphic.rotation += nk2.Math.RADIAN;
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV( event.data.position );

    } );

  } );

};
