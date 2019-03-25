import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'Culler', ( conf ) => {

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
      mode: 'webgl2'
    };
    const stage = conf.stage = new nk2.Stage2D( options );
    const root = new nk2.VisualContainer2D( 0, 0 );
    const camera = new nk2.Camera2D( 
      new nk2.Vector2D( 0, 0 ), { position: new nk2.Vector2D( 0, 0 ) }
    );
    const scene = new nk2.VisualContainer2D( HW, HH );
    const culler = new nk2.Culler2D( 0, 0, W, H );
    const tpc = new nk2.Controller.ProgramController.GLTexture2DProgramController( stage.gl );

    tpc.BindBasicTexture( nk2.Sprite.DEFAULT_TEXTURE );
    const sprite = new nk2.Sprite( 0, 0, tpc );

    sprite.anchor.SetSame( 0.5 );
    sprite.UpdateTextureTransform();

    culler.BindContainer( scene );
    culler.SetRootMatrix( stage.transform.globalTransform );
    culler.onIn.Add( ( event ) => {

      event.target.display = true;
      console.log( 'in' );
    
    } );
    culler.onOut.Add( ( event ) => {

      event.target.display = false;
      console.log( 'out' );
    
    } );

    camera.force.SetSame( 5 );

    stage
      .AddChild( root )
      .AddChild( camera )
      .AddChild( scene )
      .AddChildren( sprite );

    const canvasManager = new nk2.CanvasManager( c, W, H, nk2.CanvasManager.KEEP_ASPECT_RATIO_FIT );

    canvasManager
      .BindStage( stage )
      .BindRootContainer( root )
      .BindCuller( culler )
      .Trigger();

    console.log( culler );

    stage.mouse.AddOffset( scene ).AddOffset( camera );

    stage.onProcess.Add( () => {

      camera.Process();
      culler.Process();
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV( event.data.position );

    } );

  } );

};
