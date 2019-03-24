import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'Text', ( conf ) => {

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
    c.style.backgroundColor = 'white';

    const rc = c.getContext( '2d' );
    const text = new nk2.Text( HW, HH, window.testData.lorem );

    text.style.text.align = nk2.Style.TextConf.ALIGN_CENTER;
    text.style.text.baseline = nk2.Style.TextConf.BASELINE_MIDDLE;
    text.style.text.lineWidth = 0.3;
    text.style.text.font = '40px Arial';

    text.Render( rc );

  } );

};
