import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'Tilesprite', ( conf ) => {

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

    const rc = c.getContext( '2d' );
    const sprite = new nk2.Tilesprite( HW, HH, nk2.Tilesprite.DEFAULT_TEXTURE );

    sprite.GeneratePattern( rc, 64 * 10, 64 * 10 );

    sprite.x = HW - sprite.width * 0.5;
    sprite.y = HH - sprite.height * 0.5;

    sprite.Render( rc );

  } );

};
