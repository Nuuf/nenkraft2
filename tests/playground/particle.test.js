import { Time, Sprite, Stage2D, Camera2D, Vector2D, Container2D, CanvasManager, Math as NKMath, Geom, Particle } from '../../src/fe.index';

export default () => {

  const buttonContainer = document.getElementById( 'buttons' );
  const button = document.createElement( 'input' );
  const backButton = document.getElementById( 'back-button' );

  button.setAttribute( 'value', 'Particle' );
  button.setAttribute( 'type', 'button' );
  button.addEventListener( 'click', Run );
  buttonContainer.appendChild( button );
  
  let conf = {
    canvas: [
  
    ]
  };
  
  function Run () {
  
    const c = document.createElement( 'canvas' );

    document.body.appendChild( c );
    c.setAttribute( 'width', window.innerWidth );
    c.setAttribute( 'height', window.innerHeight );
    c.style.display = 'initial';
    c.style.position = 'absolute';
    conf.canvas.push( c );
    buttonContainer.style.display = 'none';
    backButton.onclick = Back;

    const RADIAN = NKMath.RADIAN;
    const W = 1920;
    const H = 1080;
    const HW = W * 0.5;
    const HH = H * 0.5;
    const stage = conf.stage = new Stage2D( {
      canvas: c,
      x: 0,
      y: 0,
      halt: false
    } );
    const root = new Container2D( 0, 0 );
    const camera = new Camera2D( new Vector2D( 0, 0 ), { position: new Vector2D( 0, 0 ) } );
    const scene = new Container2D( HW, HH );

    stage.AddChild( root );
    root.AddChild( camera );
    camera.AddChild( scene );

    const canvasManager = new CanvasManager( c, W, H, CanvasManager.KEEP_ASPECT_RATIO_FIT );

    canvasManager
      .BindStage( stage )
      .BindRootContainer( root )
      .Trigger();

    const shapePolygon = new Geom.Polygon2D();

    Geom.PolygonConstruction.Star( shapePolygon, 0, 0, 50, 25, 5 );

    const points = shapePolygon.GenerateRandomPoints( 1000, false, true );
    const pdata = {
      texture: Sprite.DEFAULT_TEXTURE,
      anchor: { 
        x: 0.5, 
        y: 0.5 
      },
      amount: 5,
      rotation: {
        min: 0,
        max: RADIAN * 360
      },
      position: {
        points: points
      },
      lifespan: 200,
      velocity: {
        x: 0,
        y: {
          min: -2,
          max: 2
        }
      },
      fade: true,
      deflate: true,
      spin: {
        min: -RADIAN * 360,
        max: RADIAN * 360
      },
      scale: {
        xy: {
          min: 1,
          max: 2
        }
      },
      oscillation: {
        gravity: {
          y: {
            from: -0.1,
            to: 0.1,
            amplitude: 7
          },
          x: {
            from: -0.4,
            to: 0.25,
            amplitude: 7
          }
        }
      }
    };
    const xdata = {
      texture: Sprite.DEFAULT_TEXTURE,
      anchor: { 
        x: 0.5,
        y: 0.5
      },
      amount: 23,
      rotation: {
        min: 0,
        max: RADIAN * 360
      },
      position: {
        points: points
      },
      lifespan: 150,
      velocity: {
        x: {
          min: 0,
          max: 25
        }
      },
      fade: true,
      scale: {
        xy: 1
      }
    };
    const nps = [];

    for ( var i = 0; i <= 360; i += 12 ) {

      nps.push( {
        x: Math.cos( NKMath.DegreesToRadians( i ) ) * 3,
        y: Math.sin( NKMath.DegreesToRadians( i ) ) * 3
      } );
      
    }

    const ydata = {
      texture: Sprite.DEFAULT_TEXTURE,
      anchor: { 
        x: 0.5,
        y: 0.5
      },
      amount: nps.length,
      rotation: {
        min: 0,
        max: RADIAN * 360
      },
      position: {
        xy: 0
      },
      lifespan: 150,
      velocity: {
        points: nps,
        moduloWrapper: nps.length - 1
      },
      fade: true,
      scale: {
        xy: 1
      }
    };
    const particleSystem = scene.AddChild( new Particle.Particle2D.System( 0, 0 ) );
    const pulseTimer = new Time.Timer( 5 );

    pulseTimer.onFinish.Add( () => {

      particleSystem.Emit( xdata );
      particleSystem.Emit( ydata );
      particleSystem.Emit( pdata );
      pulseTimer.Start();
      
    } );
    pulseTimer.Start();

    stage.onProcess.Add( () => {

      camera.Process();
      particleSystem.Process();
      pulseTimer.Process();
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV( 
        event.data.position
          .Copy()
          .SubtractV( scene.position )
          .SubtractV( camera.position )
      );

    } );
    
  }
  
  function Back () {

    buttonContainer.style.display = null;
  
    conf.canvas.forEach( ( c ) => {
  
      c.parentNode.removeChild( c );
      
    } );
  
    conf.canvas.length = 0;
  
    backButton.onclick = null;
    
  }
  
};
