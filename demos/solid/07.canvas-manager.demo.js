import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'CanvasManager', ( conf ) => {

    const W = 1920;
    const H = 1080;
    /*
     *const HW = W * 0.5;
     *const HH = H * 0.5;
     */
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
    const rootContainer = new nk2.VisualContainer2D( 0, 0 );
    const canvasManager = conf.canvasManager = new nk2.CanvasManager(
      c,
      W,
      H,
      nk2.CanvasManager.KEEP_ASPECT_RATIO_FIT
    );

    canvasManager
      .BindStage( stage )
      .BindRootContainer( rootContainer )
      .Trigger();

  } );

};
