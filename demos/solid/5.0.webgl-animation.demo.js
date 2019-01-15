import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'WebGLAnimation', ( conf ) => {

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
      mode: 'WebGL2',
      antialias: true
    };
    const stage = conf.stage = new nk2.Stage2D( options );
    const root = new nk2.VisualContainer2D( 0, 0 );
    const camera = new nk2.Camera2D( new nk2.Vector2D( 0, 0 ), { position: new nk2.Vector2D( 0, 0 ) } );
    const scene = new nk2.VisualContainer2D( HW, HH );

    camera.force.SetSame( 5 );

    camera.SetMax( 100, 100 );
    camera.SetMin( -100, -100 );

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

    const pc = new nk2.Controller.ProgramController.GLDynamicTexture2DProgramController( stage.gl, 3 );

    pc.BindBasicTexture( nk2.Sprite.DEFAULT_TEXTURE, 0 );
    pc.BindBasicTexture( window.testData.imgloader.GetBasicTextureById( '1to8' ), 1 );
    pc.BindBasicTexture( window.testData.characterSheet.basicTexture, 2, stage.gl.NEAREST );

    const sprite = new nk2.Sprite( 0, 0, pc, 1 );
    const sprite2 = new nk2.Sprite( 0, 0, pc, 0 );
    const sprite3 = new nk2.Sprite( 0, 0, pc, 2 );

    sprite3.CreateAnimation( {
      spritesheet: window.testData.characterSheet,
      frames: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9'
      ],
      loop: true,
      overrideFrameTimer: true,
      frameDuration: 7,
      id: 'run',
      dynamicSize: true
    } );

    sprite3.anchor.SetSame( 0.5 );
    sprite3.UpdateTextureTransform();

    sprite.anchor.SetSame( 0.5 );

    sprite2.anchor.SetSame( 0.5 );
    sprite2.UpdateTextureTransform();
    sprite2.alpha = 0.5;

    scene.AddChildren( sprite, sprite2, sprite3 );

    const ac = sprite.animationController = new nk2.Animator.Controller( sprite );
    const animation = ac.CreateAnimation( 'play', 25 );

    sprite.width = 64;
    sprite.height = 64;

    sprite3.PlayAnimation( 'run' );

    sprite3.scale.SetSame( 3 );

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
      sprite3.animationController.Process();
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV( event.data.position );

    } );

  } );

};
