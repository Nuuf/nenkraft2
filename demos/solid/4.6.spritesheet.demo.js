import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'Spritesheet', ( conf ) => {

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
      halt: false,
      backgroundColor: 'white'
    };
    const stage = conf.stage = new nk2.Stage2D( options );
    const root = new nk2.VisualContainer2D( 0, 0 );
    const camera = new nk2.Camera2D( 
      new nk2.Vector2D( 0, 0 ), { position: new nk2.Vector2D( 0, 0 ) }
    );
    const scene = new nk2.VisualContainer2D( HW, HH );
    const sprite1 = new nk2.Sprite( 0, 0, window.testData.invadersSpritesheet.basicTexture );
    const sprite2 = new nk2.Sprite( 0, 50, window.testData.invadersSpritesheet.basicTexture );

    window.testData.invadersSpritesheet.GetFrameById( 'Ship' ).FullApply( sprite1 );
    window.testData.invadersSpritesheet.GetFrameById( 'Explo-f1' ).FullApply( sprite2 );

    sprite2.CreateAnimation( {
      spritesheet: window.testData.invadersSpritesheet,
      id: 'explode',
      frames: [
        { id: 'Explo-f1', duration: 20 },
        { id: 'Explo-f2', duration: 10 },
        { id: 'Explo-f3', duration: 20 },
        { id: 'Explo-f4', duration: 10 }
      ],
      loop: true,
      reverse: false
    } );
    sprite2.PlayAnimation( 'explode' );
    sprite2.anchor.SetSame( 0.5 );
    sprite2.UpdateTextureTransform();
    sprite2.scale.SetSame( 5.0 );

    camera.force.SetSame( 5 );

    stage
      .AddChild( root )
      .AddChild( camera )
      .AddChild( scene )
      .AddChildren( sprite1, sprite2 );

    const canvasManager = new nk2.CanvasManager( c, W, H, nk2.CanvasManager.KEEP_ASPECT_RATIO_FIT );

    canvasManager
      .BindStage( stage )
      .BindRootContainer( root )
      .Trigger();

    stage.mouse.AddOffset( scene ).AddOffset( camera );

    stage.onProcess.Add( () => {

      camera.Process();
      sprite2.animationController.Process();
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV( event.data.position );

    } );

  } );

};
