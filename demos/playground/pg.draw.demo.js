import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'PGDRAW', ( conf ) => {

    const W = window.innerWidth;
    const H = window.innerHeight;
    const c = conf.canvas = document.createElement( 'canvas' );

    document.body.appendChild( c );
    c.setAttribute( 'width', W );
    c.setAttribute( 'height', H );
    c.style.display = 'initial';
    c.style.position = 'absolute';

    const options = {
      canvas: c,
      halt: true
    };
    const stage = conf.stage = new nk2.Stage2D( options );

    stage.PreRender( stage.rc );

    const d = new nk2.Draw( { 
      rc: stage.rc,
      fill: true,
      stroke: true,
      startAngle: 0,
      anticlockwise: false,
      radiusX: 100,
      radiusY: 50,
      endAngle: Math.PI
    } );
    const aabb = new nk2.Geom.AABB2D( 350, 350, 450, 450 );
    const drawAabbOpt = {
      tl: aabb.tl,
      br: aabb.br
    };
    const drawRectangleOpt = {
      x: 350, y: 350, w: 100, h: 100
    };
    const drawRoundRectangleOpt = {
      x: 350, y: 150, w: 100, h: 100, radius: 50
    };
    const circle = new nk2.Geom.Circle( 400, 320, 50 );
    const drawCircleOpt = { 
      center: circle.center, radius: circle.radius
    };
    const line = new nk2.Geom.Line2D( 400, 100, 400, 500 );
    const drawLineOpt = {
      s: line.s, e: line.e, fill: false
    };
    const polygon = new nk2.Geom.Polygon2D();
    const drawPolygonOpt = { 
      points: polygon.vertices, close: true
    };
    const drawArcOpt = {
      center: new nk2.Vector2D( 400, 500 ), radius: 100, close: true
    };
    const drawEllipseOpt = {
      center: new nk2.Vector2D( 400, 500 )
    };
    const drawEllipticArcOpt = {
      center: new nk2.Vector2D( 400, 100 ), close: true
    };
    const drawCurveOpt = {
      s: new nk2.Vector2D( 400, 500 ),
      c1: new nk2.Vector2D( 0, 200 ),
      e: new nk2.Vector2D( 400, 100 ),
      radius: 196,
      fill: false
    };
    const drawBezierCurveOpt = {
      s: new nk2.Vector2D( 400, 500 ),
      c1: new nk2.Vector2D( 0, 200 ),
      c2: new nk2.Vector2D( 0, 100 ),
      e: new nk2.Vector2D( 400, 100 ),
      radius: 200,
      fill: false
    };
    const drawChainOpt = {
      points: [
        { x: 350, y: 0 },
        { x: 450, y: 100 },
        { x: 350, y: 200 },
        { x: 450, y: 300 },
        { x: 350, y: 400 },
        { x: 450, y: 500 },
        { x: 350, y: 600 },
        { x: 450, y: 700 }
      ],
      fill: false
    };

    nk2.Geom.PolygonConstruction.Rose2D( polygon, 400, 500, 200, 100, 300, 10 );

    stage.mouse.onDown.Add( () => {

      d
        .Rectangle( drawRectangleOpt )
        .RoundRectangle( drawRoundRectangleOpt )
        .AABB( drawAabbOpt )
        .Circle( drawCircleOpt )
        .Line( drawLineOpt )
        .LineChain( drawPolygonOpt )
        .Ellipse( drawEllipseOpt )
        .EllipticArc( drawEllipticArcOpt )
        .Arc( drawArcOpt )
        .Curve( drawCurveOpt )
        .BezierCurve( drawBezierCurveOpt )
        .QuadraticCurve( drawBezierCurveOpt )
        .LineChain( drawChainOpt );

      stage.rc.translate( 800, 0 );
      stage.rc.scale( -1, 1 );

      d
        .Curve( drawCurveOpt )
        .BezierCurve( drawBezierCurveOpt )
        .QuadraticCurve( drawBezierCurveOpt );

    } );
    stage.mouse.onUp.Add( () => {
    
      stage.PreRender( stage.rc );

    } );

  } );

};
