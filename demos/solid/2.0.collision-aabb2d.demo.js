import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'CollisionAABB2D', ( conf ) => {

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
      halt: false
    };
    const stage = conf.stage = new nk2.Stage2D( options );
    const root = new nk2.VisualContainer2D( 0, 0 );
    const camera = new nk2.Camera2D( 
      new nk2.Vector2D( 0, 0 ), { position: new nk2.Vector2D( 0, 0 ) }
    );
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

    const dragStart = new nk2.Vector2D( 0, 0 );
    const dragOffset = new nk2.Vector2D( 0, 0 );
    let dragger = null;
    const a = new nk2.Collision.Body2D( new nk2.Geom.AABB2D( 0, 0, 50, 200 ) );
    const b = new nk2.Collision.Body2D( new nk2.Geom.AABB2D( 0, 0, 100, 200 ) );
    const g1 = new nk2.Graphic2D( 100, 0, new nk2.Path.AABB2D( 0, 0, 0, 0 ).SetC( a.shape ) );
    const g2 = new nk2.Graphic2D( 0, 100, new nk2.Path.AABB2D( 0, 0, 0, 0 ).SetC( b.shape ) );

    a.SetRelative( g1.position );
    b.SetRelative( g2.position );
    const COLLIDE = nk2.Collision.AABB2DvsAABB2D.Collide;
    const RESPONSE = nk2.Collision.AABB2DvsAABB2D.SeparatingResponse;
    const result = new nk2.Collision.AABB2DvsAABB2D.Result();

    scene.Mount( g1, g2 );

    stage.onProcess.Add( () => {

      camera.Process();
    
    } );

    stage.mouse.SetCoordinateTranslationEntity( scene );

    stage.mouse.onDown.Add( ( event ) => {

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

        a.SetPositionV( g1 );
        b.SetPositionV( g2 );

        result.Reset();

        COLLIDE( a, b, result );

        if ( result.occured ) {

          // g1.position.SubtractV( result.mtv );
          RESPONSE( a, b, result );
      
        }
      
      }
    
    }, stage );

    stage.mouse.onUp.Add( () => {

      if ( dragger ) dragger = null;
    
    } );

  } );

};
