import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'PGUNDEMO', ( conf ) => {

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
      x: 0,
      y: 0,
      halt: false,
      mode: 'WebGL'
    };
    const stage = conf.stage = new nk2.Stage2D( options );
    const root = new nk2.Container2D( 0, 0 );
    const camera = new nk2.Camera2D( new nk2.Vector2D( 0, 0 ), { position: new nk2.Vector2D( 0, 0 ) } );
    const scene = new nk2.Container2D( HW, HH );

    stage.gl.clearColor( 0.9, 0.9, 0.9, 1.0 );

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

    const pc = new nk2.Controller.ProgramController.GLUnProgramController( stage.gl, nk2.Shader.UN );
    let i = 1;

    while ( i-- ) {

      const glentity = new nk2.GLEntity2D( 
        0, 0,
        pc
      );

      glentity.transformAutomaticUpdate = true;
    
      glentity.transformShouldUpdate = true;

      const size = 12; // nk2.Utility.RandomFloat( 1, 10 );

      glentity.w = glentity.h = 32 * size;

      glentity.w = W;
      glentity.h = H;

      glentity.timeInc = 0.05 / size;

      glentity.ComputeBounds( { x: 0.5, y: 0.5 } );

      glentity.position.Set( 
        nk2.Utility.RandomInteger( -HW, HW ),
        nk2.Utility.RandomInteger( -HH, HH ) );

      glentity.position.Set( 0, 0 );

      scene.AddChild( glentity );
    
    }

    stage.mouse.AddOffset( scene ).AddOffset( camera );

    stage.onProcess.Add( () => {

      camera.Process();
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV( event.data.position );

    } );

  } );

};
