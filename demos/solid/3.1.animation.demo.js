import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'Animation', ( conf ) => {

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

    const sprite = new nk2.Sprite( 0, 0, window.testData.imgloader.GetBasicTextureById( '1to8' ) );

    sprite.anchor.SetSame( 0.5 );
    sprite.UpdateTextureTransform();

    scene.AddChild( sprite );

    const ac = sprite.animationController = new nk2.Animator.Controller( sprite );
    const animation = ac.CreateAnimation( 'play', 25 );

    sprite.width = 64;
    sprite.height = 64;

    animation.GenerateFrames( 64, 64, 512, 64, 8, {
      '5': 10,
      '3': 8,
      '1': 6
    } );

    animation.reverse = true;
    animation.loop = true;
    animation.Start();

    animation.onEnd.Add( () => {

      console.log( 'end' );
    
    } );

    stage.onProcess.Add( () => {

      camera.Process();
      animation.Process();
    
    } );

    stage.mouse.SetCoordinateTranslationEntity( scene );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV( event.data.position );

    } );

  } );

};
