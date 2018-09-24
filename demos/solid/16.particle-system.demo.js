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
      x: 0,
      y: 0,
      halt: false
    };
    const stage = conf.stage = new nk2.Stage2D( options );
    const root = new nk2.Container2D( 0, 0 );
    const camera = new nk2.Camera2D( new nk2.Vector2D( 0, 0 ), { position: new nk2.Vector2D( 0, 0 ) } );
    const scene = new nk2.Container2D( HW, HH );
    const particleSystem = new nk2.Particle.Particle2D.System( 0, 0 );
    const pdata = window.testData.xhrloader.GetClonedDataById( 'particleExplosion' );
    const ptimer = new nk2.Time.Timer( 10 );
    const positions = new nk2.Geom.Polygon2D();

    nk2.Geom.PolygonConstruction.Cyclic( positions, 0, 0, 400, 72 );

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

    pdata.texture = nk2.Sprite.DEFAULT_TEXTURE;
    pdata.position = {
      points: positions.vertices,
      moduloWrapper: positions.vertices.length
    };
    pdata.velocity = {
      points: velocities.vertices,
      moduloWrapper: velocities.vertices.length
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
