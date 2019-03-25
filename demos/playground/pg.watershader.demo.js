import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'PGWATERSHADER', ( conf ) => {

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
    const tpc = new nk2.Controller.ProgramController.GLTexture2DProgramController( stage.gl );

    tpc.BindBasicTexture( window.testData.imgloader.GetBasicTextureById( 'watertest' ) );

    const rtpc = new nk2.Controller.ProgramController.GLRendertextureProgramController( 
      stage.gl, nk2.Shader.WT
    );

    rtpc.Config( W, H, stage.gl.LINEAR, 0, 0, W, H );
    const sprite1 = new nk2.Sprite( -HW, -HH, tpc );

    sprite1.width = W;
    sprite1.height = H * 0.8;

    sprite1.UpdateTextureTransform();

    stage.gl.clearColor( 0.3, 0.3, 0.3, 1.0 );

    const e1 = new nk2.TextureEntity2D( 
      0, H, new nk2.Texture.BasicTexture2D( null, 'noid', W, H, W, H )
    );
    const e2 = new nk2.TextureEntity2D( 
      0, H * 0.8, new nk2.Texture.BasicTexture2D( null, 'noid', W, H, W, H )
    );

    e1.scale.y = -1;

    e2.textureTransformation.ApplyTranslation( 0, 0.2 );

    root.GLPreRender = function ( gl ) {

      stage.SetFramebuffer( gl, rtpc );
    
    };

    root.GLPostRender = function () {

      stage.SetFramebuffer();

      e1.UpdateTransform( root );
      e2.UpdateTransform( root );

      rtpc.Execute(
        e1.transform.globalTransform.AsArray( true ),
        e1.textureTranslation.AsArray( true ),
        e1.textureTransformation.AsArray( true )
      );

      rtpc.Execute(
        e2.transform.globalTransform.AsArray( true ),
        e2.textureTranslation.AsArray( true ),
        e2.textureTransformation.AsArray( true )
      );

    };

    camera.force.SetSame( 0.5 );

    stage
      .AddChild( root )
      .AddChild( camera )
      .Mount( scene );

    scene.Mount( sprite1 );

    const canvasManager = new nk2.CanvasManager( c, W, H, nk2.CanvasManager.KEEP_ASPECT_RATIO_FIT );

    canvasManager
      .BindStage( stage )
      .BindRootContainer( root )
      .Trigger();

    stage.mouse.AddOffset( scene ).AddOffset( camera );

  } );

};
