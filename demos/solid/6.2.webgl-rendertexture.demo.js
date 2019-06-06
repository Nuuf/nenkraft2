import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'Rendertexture', ( conf ) => {

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
      halt: false,
      mode: 'WebGL2'
    };
    const stage = conf.stage = new nk2.Stage2D( options );
    const root = new nk2.VisualContainer2D( 0, 0 );
    const camera = new nk2.Camera2D( 
      new nk2.Vector2D( 0, 0 ), { position: new nk2.Vector2D( 0, 0 ) }
    );
    const scene = new nk2.VisualContainer2D( HW, HH );
    const bscene = new nk2.VisualContainer2D( HW, HH );
    const tpc = new nk2.Controller.ProgramController.GLTexture2DProgramController( stage.gl );

    tpc.BindBasicTexture( nk2.Sprite.DEFAULT_TEXTURE );

    const rtpc = new nk2.Controller.ProgramController.GLRendertextureProgramController(
      stage.gl, nk2.Shader.RENDERTEXTURE_INVERT 
    );

    rtpc.Config( W, H, stage.gl.LINEAR );
    const sprite1 = new nk2.Sprite( 0, 0, tpc );
    const sprite2 = new nk2.Sprite( 0, 0, tpc );

    sprite1.anchor.SetSame( 0.5 );
    sprite2.anchor.SetSame( 0.5 );

    sprite1.alpha = 0.5;

    sprite1.UpdateTextureTransform();
    sprite2.UpdateTextureTransform();

    stage.gl.clearColor( 0.3, 0.3, 0.3, 1.0 );

    root.GLPreRender = function ( gl ) {

      stage.SetFramebuffer( gl, rtpc );
    
    };

    root.GLPostRender = function () {

      stage.SetFramebuffer();
      rtpc.ExecuteClean();
    
    };

    camera.force.SetSame( 5 );

    stage
      .AddChild( root )
      .AddChild( camera )
      .Mount( scene, bscene );

    scene.Mount( sprite1 );
    bscene.Mount( sprite2 );

    const canvasManager = new nk2.CanvasManager( c, W, H, nk2.CanvasManager.KEEP_ASPECT_RATIO_FIT );

    canvasManager
      .BindStage( stage )
      .BindRootContainer( root )
      .Trigger();

    let a = 0;

    stage.onProcess.Add( () => {

      camera.Process();

      sprite1.x = Math.cos( a ) * 128.0;
      sprite1.y = Math.sin( a ) * 128.0;
      a += nk2.Math.RADIAN;
    
    } );

    stage.mouse.SetCoordinateTranslationEntity( scene, stage.glConvMatrix );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV( event.data.position );

    } );

  } );

};
