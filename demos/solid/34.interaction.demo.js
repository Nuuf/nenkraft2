import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'Interaction', ( conf ) => {

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
    const camera = new nk2.Camera2D( new nk2.Vector2D( 0, 0 ), { position: new nk2.Vector2D( 0, 0 ) } );
    const scene = new nk2.VisualContainer2D( HW, HH );
    const tpc = new nk2.Controller.ProgramController.GLTexture2DProgramController( stage.gl );
    const cpc = new nk2.Controller.ProgramController.GLCircleProgramController( stage.gl );
    const lpc = new nk2.Controller.ProgramController.GLLine2DProgramController( stage.gl );

    tpc.BindBasicTexture( nk2.Sprite.DEFAULT_TEXTURE );

    const sprite = new nk2.Sprite( 0, 0, tpc );
    const circle = new nk2.Graphic2D( -100, -100, new nk2.Path.Circle( 0, 0, 50 ) );
    const line = new nk2.Graphic2D( 100, 100, new nk2.Path.Line2D( -100, 0, 100, 0 ) );

    circle.path.LinkProgramController( cpc );
    line.path.LinkProgramController( lpc );

    const dragStart = new nk2.Vector2D( 0, 0 );
    const dragOffset = new nk2.Vector2D( 0, 0 );
    let dragger = null;

    line.path.Rotate( 23 / 180 * Math.PI );

    camera.force.SetSame( 5 );

    stage
      .AddChild( root )
      .AddChild( camera )
      .AddChild( scene ).AddChildren( sprite, circle, line );

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

      let i = scene.children.length;
      const p = event.data.position;

      while ( i-- ) {

        if ( scene.children[ i ].IntersectsPoint2D( p ) ) {

          dragStart.SetV( p );
          dragger = scene.children[ i ];
          dragOffset.SetV( dragger.position );

          event.stopPropagation = true;

          dragger.SendToFront();
          break;

        }

      }

      if ( !dragger ) {

        camera.target.position.SetV( p );
      
      }

    } );

    stage.mouse.onMove.Add( ( event ) => {

      if ( dragger ) {

        const p = event.data.position;

        dragger.position.SetV( p ).AddV( dragOffset ).SubtractV( dragStart );
      
      }
    
    }, stage );

    stage.mouse.onUp.Add( () => {

      if ( dragger ) dragger = null;
    
    } );

  } );

};
