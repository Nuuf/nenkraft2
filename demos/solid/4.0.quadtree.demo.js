import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'Quadtree', ( conf ) => {

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
      halt: false
    };
    const stage = conf.stage = new nk2.Stage2D( options );
    const bounds = new nk2.Geom.AABB2D( 0, 0, W, H );
    const rootNode = new nk2.QuadtreeNode( bounds, 0, 4, 5 );
    const nodes = [];
    const objs = [];
    const drawOpt = {
      rc: stage.rc,
      fill: true,
      stroke: true,
      tl: null,
      br: null,
      globalAlpha: 0.2
    };

    stage.onProcess.Add( () => {
    
      nodes.forEach( function ( node ) {

        drawOpt.tl = node.aabb.tl;
        drawOpt.br = node.aabb.br;

        nk2.Draw.AABB2D( drawOpt );
      
      } );

    } );

    stage.mouse.onDown.Add( ( event ) => {

      var obj = new nk2.Graphic2D( event.data.position.x, event.data.position.y, new nk2.Path.AABB2D( 0, 0, 10, 10 ) );

      obj.ComputeLocalBounds( obj.anchor );
      stage.AddChild( obj );
      objs.push( obj );
      rootNode.Dump();
      objs.forEach( function ( obj ) {

        rootNode.Add( obj.bounds.local );
      
      } );
      nodes.length = 0;
      rootNode.ConcatNodes( nodes );
    
    } );

  } );

};
