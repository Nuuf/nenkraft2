import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'BitmapText', ( conf ) => {

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
    const bitmapText = new nk2.BitmapText(
      0, 0, 
      window.testData.imgloader.GetBasicTextureById( 'fontNoK' ),
      window.testData.xhrloader.GetDataById( 'fontNoK' ),
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    );

    bitmapText.scale.SetSame( 0.6 );

    bitmapText.x = HW - bitmapText.width * 0.5;
    bitmapText.y = HH - bitmapText.height * 0.5;

    bitmapText.Render( rc );

  } );

};
