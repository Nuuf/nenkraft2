import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'PLAYTEST', ( conf ) => {

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
      halt: true
    };
    const stage = conf.stage = new nk2.Stage2D( options );
    const camera = new nk2.Camera2D( 
      new nk2.Vector2D( HW, HH ), { position: new nk2.Vector2D( 0, 0 ) }
    );
    const rootContainer = new nk2.VisualContainer2D( 0, 0 );
    const sprite = new nk2.Sprite( HW, HH );

    sprite.width *= 2;
    const dragStart = new nk2.Vector2D( 0, 0 );
    const dragOffset = new nk2.Vector2D( 0, 0 );
    let mouseIsDown = false;
    const draw = new nk2.Draw( {
      rc: stage.rc,
      fill: true,
      identity: true
    } );
    const canvasManager = new nk2.CanvasManager( c, W, H, nk2.CanvasManager.KEEP_ASPECT_RATIO_FIT );

    canvasManager
      .BindStage( stage )
      .BindRootContainer( rootContainer )
      .Trigger();

    sprite.anchor.SetSame( 0.5 );
    sprite.UpdateTextureTransform();

    stage
      .AddChild( camera )
      .AddChild( rootContainer )
      .AddChild( sprite );

    stage.ticker.StartAF();

    const Key = nk2.Input.Key;
    const keyboard = stage.keyboard;

    keyboard.NoProcessCapture( 
      Key.SHIFT,
      Key.A,
      Key.S
    );
    keyboard.Capture(
      Key.G,
      Key.B
    );

    const aKey = keyboard.GetKey( Key.A );
    const sKey = keyboard.GetKey( Key.S );
    const shiftKey = keyboard.GetKey( Key.SHIFT );
    const gKey = keyboard.GetKey( Key.G );
    const bKey = keyboard.GetKey( Key.B );
    let lock = true;

    keyboard.onDown.Add( () => {

      if ( lock && gKey.repetitions === 3 ) {

        lock = false;
        gKey.Reset();
        console.log( 'Unlocked' );
      
      }
    
    } );

    stage.onProcess.Add( () => {

      keyboard.Process();

      const b = sprite.ComputeGlobalBounds( sprite.anchor );
      
      draw.AABB( {
        tl: b.tl,
        br: b.br
      } );

      if ( shiftKey.isDown && !lock ) {

        if ( aKey.isDown ) {

          sprite.rotation -= nk2.Math.RADIAN * 10;
        
        } else if ( sKey.isDown ) {

          sprite.rotation += nk2.Math.RADIAN * 10;
        
        }
      
      }

      if ( !lock && bKey.duration >= 30 ) {

        lock = true;
        bKey.Reset();
        console.log( 'Locked' );
        keyboard.ReleaseAll();
        console.log( 'Throwing away key' );
      
      }
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      mouseIsDown = true;
      dragStart.SetV( event.data.position );
      dragOffset.SetV( camera.position );
    
    } );
    stage.mouse.onUp.Add( () => {

      mouseIsDown = false;
    
    } );
    stage.mouse.onMove.Add( ( event ) => {

      if ( mouseIsDown ) {

        camera.position.SetV( event.data.position ).AddV( dragOffset ).SubtractV( dragStart );
      
      }

    } );

  } );

};
