import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'ParticleSystem', ( conf ) => {

    const W = 1920;
    const H = 1080;
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
      mode: 'webgl2'
    };
    const stage = conf.stage = new nk2.Stage2D( options );
    const root = new nk2.VisualContainer2D( 0, 0 );
    const camera = new nk2.Camera2D( 
      new nk2.Vector2D( 0, 0 ), { position: new nk2.Vector2D( 0, 0 ) }
    );
    const scene = new nk2.VisualContainer2D( HW, HH );
    const particleSystem = new nk2.Particle.P2D.System( 0, 0 );
    const pdata = window.testData.xhrloader.CloneDataById( 'particleExplosion' );
    const ptimer = new nk2.Time.Timer( 10 );
    const positions = new nk2.Geom.Polygon2D();

    nk2.Geom.PolygonConstruction.Cyclic2D( positions, 0, 0, 400, 72 );

    const velocities = positions.Copy();

    velocities.vertices.forEach( ( vertex ) => {

      vertex.Invert();
      vertex.Multiply( 0.1, 0.1 );
    
    } );

    ptimer.onFinish.Add( () => {

      particleSystem.Emit( pdata );
      ptimer.Start();
    
    } );
    ptimer.Start();

    const tpc = new nk2.Controller.ProgramController.GLTexture2DProgramController( stage.gl );

    tpc.BindBasicTexture( nk2.Sprite.DEFAULT_TEXTURE );

    pdata.texture = tpc;
    pdata.position = {
      points: positions.vertices,
      moduloWrapper: positions.vertices.length,
      indexGap: 8
    }; 
    pdata.velocity = {
      points: velocities.vertices,
      moduloWrapper: positions.vertices.length,
      indexGap: 4,
      scalar: { xy: { min: 0.1, max: 1.9 } }
    }; 
    pdata.oscillation = {
      velocity: {
        x: { from: -20, to: 20, amplitude: 5 }
      },
      torque: {
        from: -0.5, to: 0.5, amplitude: 0.1
      }
    };

    camera.force.SetSame( 0.1 );
    stage
      .AddChild( root )
      .AddChild( camera )
      .AddChild( scene )
      .AddChild( particleSystem );

    const canvasManager = new nk2.CanvasManager( c, W, H, nk2.CanvasManager.KEEP_ASPECT_RATIO_FIT );

    canvasManager
      .BindStage( stage )
      .BindRootContainer( root )
      .Trigger();

    stage.mouse.AddOffset( scene ).AddOffset( camera );

    stage.onProcess.Add( () => {

      camera.Process();
      particleSystem.Process();
      ptimer.Process();
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV( event.data.position );

    } );

  } );

};
