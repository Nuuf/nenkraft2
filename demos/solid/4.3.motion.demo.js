import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'Motion', ( conf ) => {

    class Branch extends nk2.Graphic2D {

      constructor ( start, end, container ) {

        super( 0, 0, new nk2.Path.Line2D( start.x, start.y, end.x, end.y ) );
        this.path.style.stroke.color = new nk2.Color( 
          nk2.Utility.RandomInteger( this.w, 200 ),
          nk2.Utility.RandomInteger( this.w, 150 ),
          nk2.Utility.RandomInteger( 0, 20 )
          , 1 ).value;
        this.path.style.stroke.lineWidth = this.w / 12;
        container.AddChild( this );
        this.x = nk2.Utility.RandomFloat( -HW, HW );
        this.y = nk2.Utility.RandomFloat( 0, H );
        this.rotation = nk2.Utility.RandomInteger( 0, nk2.Math.PII );
        this.rotation = nk2.Utility.FlipACoin( this.rotation, -this.rotation );
        var mm = this.motionManager = new nk2.Motion.Manager( this );
        const mx = mm.Create( 'moveX', 'x', 0, 120, 'SineInOut' );
        const my = mm.Create( 'moveY', 'y', 0, 120, 'SineInOut' );
        const mr = mm.Create( 'rotate', 'rotation', 0, 120, 'SineInOut' );

        mm.Start( 'moveX' );

        mx.onEnd.Add( () => {

          mr.Start();
        
        } );

        mr.onEnd.Add( () => {

          my.Start();
        
        } );

        if ( this.w > 12 ) {

          this.Grow();
      
        }
      
      }

      Grow () {

        const newEndL = this.path.e.SubtractVC( this.path.s );
        const newEndR = newEndL.Copy();

        newEndL.Rotate( 
          nk2.Math.RADIAN * 50 + nk2.Utility.RandomFloat( 
            -nk2.Math.RADIAN * 20, nk2.Math.RADIAN * 20
          )
        );
        newEndR.Rotate( 
          -nk2.Math.RADIAN * 50 + nk2.Utility.RandomFloat( 
            -nk2.Math.RADIAN * 20, nk2.Math.RADIAN * 20
          )
        );
        newEndL.Multiply( 0.67, 0.67 );
        newEndR.Multiply( 0.67, 0.67 );
        newEndL.AddV( this.path.e );
        newEndR.AddV( this.path.e );
        new Branch( this.path.e, newEndL, this.parent );
        new Branch( this.path.e, newEndR, this.parent );
      
      }
    
    }

    const W = 1920;
    const H = 1080;
    const HW = W * 0.5;
    // const HH = H * 0.5;
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
    const scene = new nk2.VisualContainer2D( HW, H );

    scene.scale.Set( 1, -1 );

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

    new Branch( new nk2.Vector2D( 0, 0 ), new nk2.Vector2D( 0, 300 ), scene );

    const timer = new nk2.Time.Timer( 500 );

    timer.onFinish.Add( () => {

      stage.ticker.Stop();

    } );

    timer.Start();

    stage.onProcess.Add( () => {

      camera.Process();

      scene.children.forEach( ( child ) => {

        child.motionManager.Process();

      } );

      timer.Process();
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV( event.data.position );

    } );

  } );

};
