import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'CollisionLine2DCircle', ( conf ) => {

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

    const circles = [];
    const lines = [];

    {

      let i = 50;

      while ( i-- ) {

        const path = new nk2.Path.Circle( 0, 0, nk2.Utility.RandomInteger( 5, 8 ) );
        const graphic = new nk2.Graphic2D( 0, 0, path );

        graphic.data.body = {
          shape: path,
          relative: graphic.position,
          velocity: new nk2.Vector2D( nk2.Utility.RandomFloat( -4, 4 ), nk2.Utility.RandomFloat( -4, 4 ) )
        };
        scene.AddChild( graphic );
        circles.push( graphic.data.body );
      
      }
    
    }

    {

      let i = 50;

      while ( i-- ) {

        const path = new nk2.Path.Line2D( 0, 0, nk2.Utility.RandomInteger( 10, 25 ), nk2.Utility.RandomInteger( 10, 25 ) );
        const graphic = new nk2.Graphic2D( nk2.Utility.RandomInteger( -HW, HW ), nk2.Utility.RandomInteger( -HH, HH ), path );

        path.Rotate( nk2.Math.RADIAN * nk2.Utility.RandomInteger( 0, 360 ) );

        graphic.data.body = {
          shape: path,
          relative: graphic.position
        };
        scene.AddChild( graphic );
        lines.push( graphic.data.body );
      
      }
    
    }

    const CollideRel = nk2.Collision.CirclevsLine.CollideRel;
    const Response = nk2.Collision.CirclevsLine.ReflectingResponse;
    const result = new nk2.Collision.CirclevsLine.Result();

    stage.mouse.AddOffset( scene ).AddOffset( camera );

    stage.onProcess.Add( () => {

      camera.Process();

      let circle;
      let line;

      for ( var i = 0; i < circles.length; ++i ) {

        circle = circles[i];

        circle.relative.AddV( circle.velocity );

        if ( circle.relative.y < -HH ) {

          circle.relative.y = -HH;
          circle.velocity.y *= -1;
        
        }

        if ( circle.relative.y > HH ) {

          circle.relative.y = HH;
          circle.velocity.y *= -1;
        
        }

        if ( circle.relative.x < -HW ) {

          circle.relative.x = -HW;
          circle.velocity.x *= -1;
        
        }

        if ( circle.relative.x > HW ) {

          circle.relative.x = HW;
          circle.velocity.x *= -1;
        
        }

        for ( var j = 0; j < lines.length; ++j ) {

          line = lines[j];

          result.Reset();

          CollideRel( circle, line, result );

          if ( result.occured ) {

            Response( circle, line, result );

          }

        }
      
      }
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV( event.data.position );

    } );

  } );

};
