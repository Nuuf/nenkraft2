import { CreateTest } from '../testBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateTest( 'CollisionAABB2D', ( conf ) => {

    const W = 1920 / 1;
    const H = 1080 / 1;
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

    stage.mouse.AddOffset( scene ).AddOffset( camera );

    const CollideRel = nk2.Collision.AABB2DvsAABB2D.CollideRel;
    const result = new nk2.Collision.AABB2DvsAABB2D.Result();
    const g1 = scene.AddChild( new nk2.Graphic2D( 0, 100, new nk2.Path.AABB2D( 0, 0, 50, 50 ) ) );
    const g2 = scene.AddChild( new nk2.Graphic2D( 0, 0, new nk2.Path.AABB2D( 0, 0, 400, 100 ) ) );
    const bodyA = {
      shape: g1.path,
      relative: g1.position
    };
    const bodyB = {
      shape: g2.path,
      relative: g2.position
    };
    const dragStart = new nk2.Vector2D( 0, 0 );
    const dragOffset = new nk2.Vector2D( 0, 0 );
    let dragger = null;

    stage.onProcess.Add( () => {

      camera.Process();
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      let i = scene.children.length;
      const p = event.data.position;

      while ( i-- ) {

        if ( scene.children[i].IntersectsPoint( p ) ) {

          dragStart.SetV( p );
          dragger = scene.children[i];
          dragOffset.SetV( dragger.position );

          event.stopPropagation = true;

          dragger.SendToFront();
          break;

        }

      }

      if ( !dragger ) {

        camera.target.position.SetV( p );
      
      }

    } );

    stage.mouse.onMove.Add( ( event ) => {

      if ( dragger ) {

        const p = event.data.position;

        dragger.position.SetV( p ).AddV( dragOffset ).SubtractV( dragStart );

        result.Reset();

        CollideRel( bodyA, bodyB, result );

        if ( result.occured ) {

          bodyA.relative.AddV( result.mtv );

        }
      
      }
    
    }, stage );

    stage.mouse.onUp.Add( () => {

      if ( dragger ) dragger = null;
    
    } );

  } );

};