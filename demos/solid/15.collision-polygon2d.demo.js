import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'CollisionPolygon2D', ( conf ) => {

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
      halt: false
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
    const bodies = [];
    const CollideRel = nk2.Collision.Polygon2DvsPolygon2D.CollideRel;
    const result = new nk2.Collision.Polygon2DvsPolygon2D.Result();
    const dragStart = new nk2.Vector2D( 0, 0 );
    const dragOffset = new nk2.Vector2D( 0, 0 );
    let dragger = null;

    {

      let i = 100;

      while ( i-- ) {

        const path = new nk2.Path.Polygon2D();

        nk2.Geom.PolygonConstruction.Cyclic( path, 0, 0, nk2.Utility.RandomInteger( 30, 60 ), nk2.Utility.RandomInteger( 3, 6 ) );

        const graphic = new nk2.Graphic2D( 0, 0, path );

        graphic.data.body = {
          shape: path,
          relative: graphic.position
        };

        bodies.push( graphic.data.body );

        scene.AddChild( graphic );

      }
    
    }

    canvasManager
      .BindStage( stage )
      .BindRootContainer( root )
      .Trigger();

    stage.mouse.AddOffset( scene ).AddOffset( camera );

    stage.onProcess.Add( () => {

      camera.Process();

      {

        let i = 0;
        let j = 0;
        const l = bodies.length;
        let bodyA;
        let bodyB;

        for ( ; i < l; ++i ) {

          bodyA = bodies[ i ];

          for ( j = 0; j < l; ++j ) {

            bodyB = bodies[ j ];

            if ( bodyA !== bodyB ) {

              result.Reset();

              CollideRel( bodyA, bodyB, result );

              if ( result.occured ) {

                if ( dragger ) {

                  if ( bodyA.relative !== dragger.position ) bodyA.relative.SubtractV( result.mtv );
                  if ( bodyB.relative !== dragger.position ) bodyB.relative.AddV( result.mtv );
                
                } else {

                  result.mtv.Multiply( 0.5, 0.5 );

                  bodyA.relative.SubtractV( result.mtv );
                  bodyB.relative.AddV( result.mtv );

                }

              }

            }

          }

        }
      
      }
    
    } );

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
      
      }
    
    }, stage );

    stage.mouse.onUp.Add( () => {

      if ( dragger ) dragger = null;
    
    } );

  } );

};
