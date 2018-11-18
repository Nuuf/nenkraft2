import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'PGBLA', ( conf ) => {

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
      halt: false
    };
    const stage = conf.stage = new nk2.Stage2D( options );
    const root = new nk2.VisualContainer2D( 0, 0 );
    const camera = new nk2.Camera2D( new nk2.Vector2D( 0, 0 ), { position: new nk2.Vector2D( 0, 0 ) } );
    const scene = new nk2.VisualContainer2D( HW, HH );
    const dragStart = new nk2.Vector2D( 0, 0 );
    const dragOffset = new nk2.Vector2D( 0, 0 );
    let dragger = null;
    const g1 = new nk2.Graphic2D( 0, 0, new nk2.Path.AABB2D( -50, -50, 50, 50 ) );
    const g2 = new nk2.Graphic2D( 0, 0, new nk2.Path.Line2D( -50, -50, 50, 50 ) );
    const b1 = new nk2.Graphic2D( 0, 0, new nk2.Path.Circle( 0, 0, 25 ) );
    const b2 = new nk2.Graphic2D( 0, 0, new nk2.Path.Circle( 0, 0, 25 ) );
    const b3 = new nk2.Graphic2D( 0, 0, new nk2.Path.Circle( 0, 0, 25 ) );
    const b4 = new nk2.Graphic2D( 0, 0, new nk2.Path.Circle( 0, 0, 25 ) );
    const bA = {
      shape: g1.path,
      relative: g1.position
    };
    const bB = {
      shape: g2.path,
      relative: g2.position
    };
    const result = new nk2.Collision.AABB2DvsLine2D.Result();
    const COLLIDE = nk2.Collision.AABB2DvsLine2D.CollideRel;

    b1.interactive = 
    b2.interactive =
    b3.interactive =
    b4.interactive = false;

    camera.force.SetSame( 5 );

    stage
      .AddChild( root )
      .AddChild( camera )
      .AddChild( scene ).AddChildren( g1, g2, b1, b2, b3, b4 );

    const canvasManager = new nk2.CanvasManager( c, W, H, nk2.CanvasManager.KEEP_ASPECT_RATIO_FIT );

    canvasManager
      .BindStage( stage )
      .BindRootContainer( root )
      .Trigger();

    stage.mouse.AddOffset( scene ).AddOffset( camera );

    stage.onProcess.Add( () => {

      camera.Process();

      g2.path.Rotate( nk2.Math.RADIAN * 10 );

      result.Reset();

      COLLIDE( bA, bB, result );

      if ( result.top ) {

        b1.position.SetV( result.poc.a );
      
      }

      if ( result.right ) {

        b2.position.SetV( result.poc.b );
      
      }

      if ( result.bottom ) {

        b3.position.SetV( result.poc.c );
      
      }

      if ( result.left ) {

        b4.position.SetV( result.poc.d );
      
      }
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      if ( event.data.native.button !== 0 ) return;

      let i = scene.children.length;
      const p = event.data.position;

      while ( i-- ) {

        if ( scene.children[ i ].IntersectsPoint2D( p ) ) {

          dragStart.SetV( p );
          dragger = scene.children[ i ];
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
      
      }
    
    }, stage );

    stage.mouse.onUp.Add( () => {

      if ( dragger ) dragger = null;
    
    } );

  } );

};
