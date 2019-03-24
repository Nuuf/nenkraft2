import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'CreateTexture', ( conf ) => {

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

    function createTexture () {

      const path = new nk2.Path.Polygon2D();

      nk2.Geom.PolygonConstruction.Supershape2D( path, 0, 0, 100, 100, 6, 0.3, 0.3, 0.3 );

      return new nk2.Graphic2D( 
        Math.abs( path.aabb.tl.x ), Math.abs( path.aabb.tl.y ), path
      );

    }

    const img = new Image();

    img.onload = function () {

      const sprite = new nk2.Sprite( HW, HH, new nk2.Texture.BasicTexture2D( img ) );

      sprite.anchor.Set( 0.5, 0.5 );

      sprite.Render( c.getContext( '2d' ) );

    };

    img.src = nk2.BrowserUtility.GenerateSimpleBase64PNG( createTexture, 'white' );

  } );

};
