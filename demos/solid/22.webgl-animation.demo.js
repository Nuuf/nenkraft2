import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'WebGLAnimation', ( conf ) => {

    const W = 600 / 3;
    const H = 400 / 3;
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
      halt: false,
      mode: 'WebGL',
      antialias: true
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

    stage.mouse.AddOffset( scene ).AddOffset( camera );

    const pc = new nk2.Controller.ProgramController.GLDynamicTexture2DProgramController( stage.gl, 2 );

    pc.BindBasicTexture( nk2.Sprite.DEFAULT_TEXTURE, 0 );
    pc.BindBasicTexture( window.testData.imgloader.GetBasicTextureById( '1to8' ), 1 );

    const sprite = new nk2.Sprite( 0, 0, pc, 1 );
    const sprite2 = new nk2.Sprite( 0, 0, pc, 0 );

    sprite.anchor.SetSame( 0.5 );

    sprite2.anchor.SetSame( 0.5 );
    sprite2.UpdateTextureTransform();
    sprite2.alpha = 0.5;

    scene.AddChildren( sprite, sprite2 );

    const ac = sprite.animationController = new nk2.Animator.Controller( sprite );
    const animation = ac.CreateAnimation( 'play', 25 );

    sprite.width = 64;
    sprite.height = 64;

    animation.GenerateFrames( 64, 64, 512, 64, 8, {
      '5': 10,
      '3': 8,
      '1': 6
    } );

    animation.loop = true;
    animation.Start();

    stage.onProcess.Add( () => {

      camera.Process();
      animation.Process();
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV( event.data.position );

    } );

  } );

};
