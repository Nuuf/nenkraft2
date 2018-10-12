import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'WebGLTexture2DBatch', ( conf ) => {

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
      halt: false,
      mode: 'WebGL'
    };
    const stage = conf.stage = new nk2.Stage2D( options );
    const root = new nk2.Container2D( 0, 0 );
    const camera = new nk2.Camera2D( new nk2.Vector2D( 0, 0 ), { position: new nk2.Vector2D( 0, 0 ) } );
    const scene = new nk2.Container2D( HW, HH );
    const sprite = new nk2.Sprite( 0, 0 );

    camera.force.SetSame( 5 );

    sprite.anchor.SetSame( 0.5 );

    stage
      .AddChild( root )
      .AddChild( camera )
      .AddChild( scene )
      .AddChild( sprite );

    const canvasManager = new nk2.CanvasManager( c, W, H, nk2.CanvasManager.KEEP_ASPECT_RATIO_FIT );

    canvasManager
      .BindStage( stage )
      .BindRootContainer( root )
      .Trigger();

    const bp = new nk2.Container2D( 0, 0 );
    const pc = new nk2.Controller.ProgramController.GLTexture2DBatchProgramController( stage.gl );

    pc.BindBasicTexture( window.testData.imgloader.GetBasicTextureById( 'colors' ) );

    scene.AddChild( bp );

    bp.UseAsBatchParent( pc );

    {

      let i = 5000;

      while ( i-- ) {

        const sprite = new nk2.Sprite( 0, 0, pc.originalTexture );
        
        sprite.w = 64;
        sprite.h = 64;
        sprite.scale.SetSame( 0.05 );

        sprite.anchor.SetSame( 0.5 );

        sprite.animationController = new nk2.Animator.Controller( sprite );

        const animation = sprite.animationController.CreateAnimation( 'animation', 60 );

        animation.GenerateFrames( 64, 64, 1024, 64, 16 );

        animation.SetFrame( nk2.Utility.RandomInteger( 0, 15 ) );

        sprite.data.velocity = new nk2.Vector2D( nk2.Utility.RandomFloat( -2, 2 ), nk2.Utility.RandomFloat( -2, 2 ) );
        sprite.data.torque = nk2.Utility.RandomFloat( -nk2.Math.RADIAN * 20, nk2.Math.RADIAN * 20 );

        bp.Mount( sprite );

        sprite.UpdateTransform();

      }

      bp.ComputeBatchBuffer();
    
    }

    stage.mouse.AddOffset( scene ).AddOffset( camera );

    stage.onProcess.Add( () => {

      camera.Process();

      let child;

      for ( var i = 0; i < bp.children.length; ++i ) {

        child = bp.children[ i ];

        child.data.velocity.Rotate( child.data.torque );
        child.position.AddV( child.data.velocity );
        child.UpdateInBuffer();
      
      }
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV( event.data.position );

    } );

  } );

};
