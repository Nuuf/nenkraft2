import { CreateTest } from '../testBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateTest( 'Container2D', ( conf ) => {

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

    const sprite = new nk2.Sprite( HW, HH, nk2.Sprite.DEFAULT_TEXTURE );

    sprite.anchor.SetSame( 0.5 );

    const container = new nk2.Container2D( 0, 0 );

    container.AddChild( sprite );

    container.Draw( c.getContext( '2d' ) );

  } );

};
