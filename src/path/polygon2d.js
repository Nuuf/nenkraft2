/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Polygon2D as Polygon2DGeom } from '../geom/polygon/polygon2d';
import { FFSa } from '../style';

export class Polygon2D extends Polygon2DGeom {

  constructor ( _vertices, _style ) {

    super( _vertices );
    
    this.programController = null;
    this.style = FFSa( _style );
  
  }

  Draw ( _rc ) {

    const vertices = this.vertices;
    const style = this.style;

    _rc.beginPath();
    _rc.moveTo( vertices[0].x, vertices[0].y );

    for ( var i = 1; i < vertices.length; ++i ) {

      _rc.lineTo( vertices[i].x, vertices[i].y );
    
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
   * GLDraw ( _gl, _transform2d ) {
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

}
