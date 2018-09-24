import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'Stage2D', ( conf ) => {

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

    stage.ticker.StartAF();
    stage.onProcess.Add( () => {

      console.log( 'tick' );
      stage.onProcess.Dump();

    } );

  } );

};
