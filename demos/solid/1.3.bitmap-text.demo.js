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
      window.testData.lorem
    );

    bitmapText.scale.SetSame( 0.6 );

    bitmapText.x = HW - bitmapText.width * 0.5;
    bitmapText.y = HH - bitmapText.height * 0.5;

    bitmapText.Render( rc );

  } );

};
