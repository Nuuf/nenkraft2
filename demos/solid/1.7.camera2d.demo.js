import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'Camera2D', ( conf ) => {

    const W = window.innerWidth;
    const H = window.innerHeight;
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
      halt: true
    };
    const stage = conf.stage = new nk2.Stage2D( options );
    const camera = new nk2.Camera2D( 
      new nk2.Vector2D( HW, HH ), { position: new nk2.Vector2D( 0, 0 ) }
    );
    const rootContainer = new nk2.VisualContainer2D( 0, 0 );
    const sprite = new nk2.Sprite( 0, 0 );

    stage
      .AddChild( camera )
      .AddChild( rootContainer )
      .AddChild( sprite );

    stage.mouse.AddOffset( camera );

    stage.ticker.StartAF();
    stage.onProcess.Add( () => {

      camera.Process();

    } );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV( event.data.position );

    } );

  } );

};
