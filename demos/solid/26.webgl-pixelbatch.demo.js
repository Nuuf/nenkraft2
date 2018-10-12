import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'WebGLPixelBatch', ( conf ) => {

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

    const bp = new nk2.Container2D( 0, 0 );
    const pc = new nk2.Controller.ProgramController.GLPixelBatchProgramController( stage.gl );

    scene.AddChild( bp );

    bp.UseAsBatchParent( pc );

    {

      let i = 20000;

      while ( i-- ) {

        const p = new nk2.Path.Pixel( 0, 0 );

        p.color.r = 0.0;
        p.color.g = Math.random();
        p.color.b = 0.8;
        p.color.a = nk2.Utility.RandomFloat( 0.1, 0.6 );
        p.style.pixel.size = nk2.Utility.RandomFloat( 1, 2 );
        const g = new nk2.Graphic2D( 0, 0, p );

        g.data.velocity = new nk2.Vector2D( nk2.Utility.RandomFloat( -2, 2 ), nk2.Utility.RandomFloat( -2, 2 ) );
        g.data.torque = nk2.Utility.RandomFloat( -nk2.Math.RADIAN * 20, nk2.Math.RADIAN * 20 );
        bp.Mount( g );

        g.UpdateTransform();

      }

      bp.ComputeBatchBuffer();
    
    }

    stage.mouse.AddOffset( scene ).AddOffset( camera );

    stage.onProcess.Add( () => {

      camera.Process();

      let child;

      for ( var i = 0; i < bp.children.length; ++i ) {

        child = bp.children[ i ];

        child.data.velocity.Rotate( child.data.torque );
        child.position.AddV( child.data.velocity );
        child.UpdateInBuffer();
      
      }
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV( event.data.position );

    } );

  } );

};
