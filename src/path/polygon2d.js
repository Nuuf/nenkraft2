/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Polygon2D as Polygon2DGeom } from '../geom/polygon/polygon2d';
import { FFSa } from '../style';

export class Polygon2D {

  /**
   * 
   * @param {Vector2D[]?} _vertices 
   * @param {object?}     _style 
   */
  constructor ( _vertices, _style ) {

    this.shape = new Polygon2DGeom( _vertices );
    this.programController = null;
    this.style = FFSa( _style );
  
  }

  /**
   *
   * @param {CanvasRenderingContext2D} _rc 
   *
   * @return {void}
   */
  Render ( _rc ) {

    const vertices = this.shape.vertices;
    const style = this.style;

    _rc.beginPath();
    _rc.moveTo( vertices[ 0 ].x, vertices[ 0 ].y );

    for ( var i = 1; i < vertices.length; ++i ) {

      _rc.lineTo( vertices[ i ].x, vertices[ i ].y );
    
    }

    _rc.closePath();
    
    if ( style.shadow.applied === true ) style.shadow.Apply( _rc );

    if ( style.fill.applied === true ) {

      style.fill.Apply( _rc );
      _rc.fill();
    
    }

    if ( style.stroke.applied === true ) {

      style.stroke.Apply( _rc );
      _rc.stroke();
    
    }
  
  }
 
  /**
   * TODO
   * GLRender ( _gl, _transform2d ) {
   * }
   *
   * LinkProgramController ( _pc ) {
   *
   * this.programController = _pc;
   * this.LinkStyle();
   *
   * }
   *
   * UseProgramController ( _pc ) {
   *
   * this.programController = _pc;
   *
   * }
   *
   * LinkStyle () {
   * }
   */

  /**
   * 
   * @param {Geom.Polygon2D} _shape 
   */
  SetShape ( _shape ) {

    this.shape = _shape;

    return this;

  }

}
