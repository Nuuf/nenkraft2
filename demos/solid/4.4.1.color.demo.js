import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'Color', ( conf ) => {

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
    const camera = new nk2.Camera2D( new nk2.Vector2D( 0, 0 ), { position: new nk2.Vector2D( 0, 0 ) } );
    const scene = new nk2.VisualContainer2D( HW, HH );
    const img = nk2.BrowserUtility.ImageFromDataURL( nk2.BrowserUtility.GenerateSimpleBase64PNG( () => {

      const osize = 25;
      let prevColor = new nk2.Color( 255, 255, 255, 1 );
      const container = new nk2.VisualContainer2D( 0, 0 );

      for ( var i = 0; i < 260; ++i ) {

        const path = new nk2.Path.AABB2D( 0, 0, osize, osize );

        path.style.fill.color = new nk2.Color( i, 0, 0, 1 ).Mix( prevColor, 0.6 ).ComputeValueRGBA().value;
        path.style.stroke.color = new nk2.Color( 0, 255 - i, 0, 1 ).Mix( prevColor, 0.9 ).ComputeValueRGBA().value;
        const graphic = new nk2.Graphic2D( 0, 0, path );

        container.AddChild( graphic );

      }

      nk2.Math.LikeASquareGrid( container.children, 25 * 20, osize, osize );

      container.ClusterBind();

      return container;

    }, 'white' ), () => {

      scene.AddChild( new nk2.Sprite( -HW, -HH, new nk2.Texture.BasicTexture2D( img, null, img.width, img.height ) ) );
    
    } );

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

    stage.onProcess.Add( () => {

      camera.Process();
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV( event.data.position );

    } );

  } );

};
