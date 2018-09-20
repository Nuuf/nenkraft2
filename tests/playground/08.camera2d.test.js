import { CreateTest } from '../testBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateTest( 'Camera2D', ( conf ) => {

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
      x: HW,
      y: HH,
      halt: true
    };
    const stage = conf.stage = new nk2.Stage2D( options );
    const camera = new nk2.Camera2D( new nk2.Vector2D( 0, 0 ), { position: new nk2.Vector2D( 0, 0 ) } );
    const rootContainer = new nk2.Container2D( 0, 0 );
    const sprite = new nk2.Sprite( 0, 0 );

    stage
      .AddChild( camera )
      .AddChild( rootContainer )
      .AddChild( sprite );

    stage.ticker.StartAF();
    stage.onProcess.Add( () => {

      camera.Process();

    } );

    stage.mouse.onDown.Add( ( event ) => {

      const newPos = event.data.position
        .Copy()
        .SubtractV( camera.position );

      camera.target.position.SetV( newPos );

    } );

  } );

};
