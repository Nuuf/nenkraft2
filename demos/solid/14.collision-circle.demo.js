import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'CollisionCircle', ( conf ) => {

    const W = 1920 * 3;
    const H = 1080 * 3;
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
    const bodies = [];
    const CollideRel = nk2.Collision.CirclevsCircle.CollideRel;
    const Response = nk2.Collision.CirclevsCircle.ElasticResponse;
    const result = new nk2.Collision.CirclevsCircle.Result();

    {

      let i = 50;

      while ( i-- ) {

        const mass = nk2.Utility.RandomInteger( 50, 125 );
        const path = new nk2.Path.Circle( 0, 0, mass );
        const graphic = new nk2.Graphic2D(
          nk2.Utility.RandomFloat( -HW, HW ),
          nk2.Utility.RandomFloat( -HH, HH ),
          path
        );

        graphic.data.body = {
          shape: path,
          relative: graphic.position,
          mass: mass,
          velocity: new nk2.Vector2D( nk2.Utility.RandomInteger( -30, 30 ), nk2.Utility.RandomInteger( -30, 30 ) )
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

        for ( ; i < l;++i ) {

          bodyA = bodies[ i ];

          bodyA.relative.AddV( bodyA.velocity );

          if ( bodyA.relative.x > HW ) {

            bodyA.relative.x = HW;
            bodyA.velocity.x = -bodyA.velocity.x;

          } else if ( bodyA.relative.x < -HW ) {

            bodyA.relative.x = -HW;
            bodyA.velocity.x = -bodyA.velocity.x;
          
          }

          if ( bodyA.relative.y > HH ) {

            bodyA.relative.y = HH;
            bodyA.velocity.y = -bodyA.velocity.y;

          } else if ( bodyA.relative.y < -HH ) {

            bodyA.relative.y = -HH;
            bodyA.velocity.y = -bodyA.velocity.y;
          
          }

          for ( j = 0; j < l; ++j ) {

            bodyB = bodies[ j ];

            if ( bodyA !== bodyB ) {

              result.Reset();

              CollideRel( bodyA, bodyB, result );

              if ( result.occured ) {

                Response( bodyA, bodyB, result );

              }

            }

          }

        }
      
      }
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV( event.data.position );

    } );

  } );

};
