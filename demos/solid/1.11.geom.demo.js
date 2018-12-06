import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'Geom', ( conf ) => {

    const W = window.innerWidth;
    const H = window.innerHeight;
    const c = conf.canvas = document.createElement( 'canvas' );

    document.body.appendChild( c );
    c.setAttribute( 'width', W );
    c.setAttribute( 'height', H );
    c.style.display = 'initial';
    c.style.position = 'absolute';

    const rc = c.getContext( '2d' );
    const circle = new nk2.Path.Circle( 0, 0, 50 );
    const rectangle = new nk2.Path.AABB2D( 0, 0, 100, 100 );
    const butterfly = new nk2.Path.Polygon2D();
    const line = new nk2.Path.Line2D( 0, 0, 100, 100 );
    const polygon = new nk2.Path.Polygon2D();
    const rose = new nk2.Path.Polygon2D();

    nk2.Geom.PolygonConstruction.Butterfly( butterfly, 0, 0, 1000, 50 );
    nk2.Geom.PolygonConstruction.Star( polygon, 0, 0, 100, 50, 5 );
    nk2.Geom.PolygonConstruction.Rose( rose, 0, 0, 100, 7 / 9, 1000, 9 );

    const g1 = new nk2.Graphic2D( 100, 100, circle );
    const g2 = new nk2.Graphic2D( 200, 100, rectangle );
    const g3 = new nk2.Graphic2D( 350, 100, line );
    const g4 = new nk2.Graphic2D( 600, 200, butterfly );
    const g5 = new nk2.Graphic2D( 100, 300, polygon );
    const g6 = new nk2.Graphic2D( 400, 400, rose );

    g1.Render( rc );
    g2.Render( rc );
    g3.Render( rc );
    g4.Render( rc );
    g5.Render( rc );
    g6.Render( rc );

  } );

};
