import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'Sprite', ( conf ) => {

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

    const sprite = new nk2.Sprite( HW, HH );
    const l1 = new nk2.Graphic2D( HW, HH, new nk2.Path.Line2D( -HW, 0, HW, 0 ) );
    const l2 = new nk2.Graphic2D( HW, HH, new nk2.Path.Line2D( 0, -HH, 0, HH ) );

    sprite.anchor.SetSame( 0.5 );

    sprite.UpdateTextureTransform();

    const ctx = c.getContext( '2d' );

    sprite.Render( ctx );
    l1.Render( ctx );
    l2.Render( ctx );

  } );

};
