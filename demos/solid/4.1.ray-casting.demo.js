import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'RayCasting', ( conf ) => {

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

    const polygons = [];
    const rays = [];

    {

      let i = 25;

      while ( i-- ) {

        const p = new nk2.Path.Polygon2D();

        nk2.Geom.PolygonConstruction.Cyclic2D(
          p,
          nk2.Utility.RandomInteger( -W, W ),
          nk2.Utility.RandomInteger( -H, H ),
          nk2.Utility.RandomInteger( 30, 60 ),
          nk2.Utility.RandomInteger( 3, 8 )
        );

        p.Rotate( nk2.Utility.RandomFloat( 0, nk2.Math.PII ) );
        const g = new nk2.Graphic2D( 0, 0, p );

        polygons.push( g );

      }
    
    }

    {

      let i = 180;
      const angle = Math.PI * 2 / i;
      const r = 360;

      while ( i-- ) {

        const th = angle * i;
        const line = new nk2.Path.Ray2D( 0, 0, 0, 0 );

        line.style.stroke.lineWidth = 1;
        const g = new nk2.Graphic2D( 0, 0, line );

        g.interactive = false;
        g.data.angle = th;
        g.data.r = r;
        rays.push( g );

      }
    
    }

    scene.Mount( polygons.concat( rays ) );

    stage.mouse.AddOffset( scene ).AddOffset( camera );

    const contactPoint = new nk2.Vector2D( 0, 0 );

    stage.onProcess.Add( () => {

      camera.Process();

      rays.forEach( function ( ray ) {

        ray.path.s.SetV( stage.mouse.position );
        ray.path.e.SetV( ray.path.s );
        ray.path.e.Add( ray.data.r, ray.data.r );
        ray.path.e.RotateAroundV( ray.path.s, ray.data.angle );
      
      } );

      // NOTE! A broad phase should be used to check if the polygons are in radius

      let i = 0;
      let j = 0;
      let k = 0;
      let kk = 0;
      let ray = rays[ i ];
      let polygon;
      let vertexA;
      let vertexB;
      const rl = rays.length;
      const pl = polygons.length;
      let pvl = 0;

      for ( ; i < rl; ray = rays[ ++i ] ) {

        j = 0;
        polygon = polygons[ j ];

        for ( ; j < pl; polygon = polygons[ ++j ] ) {

          k = 0;
          pvl = polygon.path.vertices.length;
          kk = pvl - 1;

          for ( ; k < pvl; kk = k++ ) {

            vertexA = polygon.path.vertices[ k ];
            vertexB = polygon.path.vertices[ kk ];

            if ( nk2.Collision.Line2DvsLine2D.Line2DLine2DCollision(
              ray.path.s,
              ray.path.e,
              vertexA,
              vertexB,
              contactPoint
            ) ) {

              rays[ i ].path.e.SetV( contactPoint );
            
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
