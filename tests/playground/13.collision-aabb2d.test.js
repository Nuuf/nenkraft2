import { CreateTest } from '../testBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateTest( 'CollisionAABB2D', ( conf ) => {

    const W = 1920 * 2;
    const H = 1080 * 2;
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
    const stage = new nk2.Stage2D( options );
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

    const CollideRel = nk2.Collision.AABB2DvsAABB2D.CollideRel;
    const result = new nk2.Collision.AABB2DvsAABB2D.Result();
    const bodies = [];

    {

      let i = 50;

      while ( i-- ) {

        const sprite = new nk2.Sprite( 0, 0 );

        sprite.anchor.SetSame( 0.5 );

        sprite.data.body = {
          shape: sprite.shape,
          relative: sprite.position,
          anchor: new nk2.Vector2D( 0, 0 ),
          velocity: new nk2.Vector2D( nk2.Utility.RandomFloat( -15, 15 ), nk2.Utility.RandomFloat( -15, 15 ) )
        };

        sprite.AttachTo( scene );

        bodies.push( sprite.data.body );

      }
    
    }

    stage.onProcess.Add( () => {

      camera.Process();

      {

        let i = 0;
        let j = 0;
        const l = bodies.length;
        let bodyA;
        let bodyB;

        for ( i; i < l;++i ) {

          bodyA = bodies[i];

          bodyA.relative.AddV( bodyA.velocity );

          if ( bodyA.relative.x > HW ) {

            bodyA.velocity.x = -bodyA.velocity.x;
            bodyA.relative.x = HW;
          
          } else if ( bodyA.relative.x < -HW ) {

            bodyA.velocity.x = -bodyA.velocity.x;
            bodyA.relative.x = -HW;
          
          }

          if ( bodyA.relative.y > HH ) {

            bodyA.velocity.y = -bodyA.velocity.y;
            bodyA.relative.y = HH;
          
          } else if ( bodyA.relative.y < -HH ) {

            bodyA.velocity.y = -bodyA.velocity.y;
            bodyA.relative.y = -HH;
          
          }

          for ( j = 0; j < l; ++j ) {

            bodyB = bodies[j];

            if ( bodyA !== bodyB ) {

              result.Reset();

              CollideRel( bodyA, bodyB, result );

              if ( result.occured ) {

                if ( result.mtv.x > 0 ) {

                  bodyA.relative.SubtractV( result.mtv );
                  bodyB.relative.AddV( result.mtv );
                
                } else {

                  bodyB.relative.SubtractV( result.mtv );
                  bodyA.relative.AddV( result.mtv );
                
                }

                if ( result.mtv.x !== 0 ) {

                  bodyA.velocity.x = -bodyA.velocity.x;
                  bodyB.velocity.x = -bodyB.velocity.x;

                } else if ( result.mtv.y !== 0 ) {

                  bodyA.velocity.y = -bodyA.velocity.y;
                  bodyB.velocity.y = -bodyB.velocity.y;
                
                }
              
              }

            }

          }

        }
      
      }
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV(
        event.data.position
          .SubtractVC( scene )
          .SubtractV( camera.position )
      );

    } );

  } );

};
