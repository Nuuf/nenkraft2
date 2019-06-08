/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { AABB2D as AABB2DGeom } from '../geom/aabb/aabb2d';
import { FFSa } from '../style';

export class AABB2D {

  /**
   * 
   * @param {number}  _tlx 
   * @param {number}  _tly 
   * @param {number}  _brx 
   * @param {number}  _bry 
   * @param {object?} _style 
   */
  constructor ( _tlx, _tly, _brx, _bry, _style ) {

    this.shape = new AABB2DGeom( _tlx, _tly, _brx, _bry );
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

    const tl = this.shape.tl;
    const br = this.shape.br;
    const style = this.style;

    _rc.beginPath();
    _rc.moveTo( tl.x, tl.y );
    _rc.lineTo( br.x, tl.y );
    _rc.lineTo( br.x, br.y );
    _rc.lineTo( tl.x, br.y );
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
   * 
   * @param {WebGLRenderingContext|WebGL2RenderingContext} _gl 
   * @param {Transform2D}                                  _transform2d 
   * 
   * @return {void}
   */
  GLRender ( _gl, _transform2d ) {

    if ( this.programController !== null ) {

      const shape = this.shape;

      this.programController.Execute(
        _transform2d.globalTransform.AsArray( true ),
        shape.tl.x, shape.tl.y, shape.w, shape.h
      );
      
    }
  
  }

  /**
   * 
   * @param {ProgramController} _pc 
   * 
   * @return {this}
   */
  LinkProgramController ( _pc ) {

    this.programController = _pc;
    this.LinkStyle();

    return this;
  
  }

  /**
   * 
   * @param {ProgramController} _pc
   * 
   * @return {this} 
   */
  UseProgramController ( _pc ) {

    this.programController = _pc;
    
    return this;
  
  }

  /**
   * 
   * @return {this}
   */
  LinkStyle () {

    const pc = this.programController;

    if ( pc !== null && pc.fillColor !== null && pc.outlineColor !== null && pc.outline !== null ) {

      pc.fillColor.SetHex( this.style.fill.color );
      pc.fillColor.Normalize();
      pc.outlineColor.SetHex( this.style.stroke.color );
      pc.outlineColor.Normalize();
      pc.outline = this.style.stroke.lineWidth + 0.2;
    
    }

    return this;
  
  }

  /**
   * 
   * @param {Geom.AABB2D} _shape 
   */
  SetShape ( _shape ) {

    this.shape = _shape;

    return this;

  }

}
