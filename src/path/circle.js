/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Circle as CircleGeom } from '../geom/circle';
import { PII } from '../math';
import { FFSa } from '../style';

export class Circle extends CircleGeom {

  /**
   * 
   * @param {number}  _x 
   * @param {number}  _y 
   * @param {number}  _radius 
   * @param {object?} _style 
   */
  constructor ( _x, _y, _radius, _style ) {

    super( _x, _y, _radius );
    
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

    const style = this.style;
    
    _rc.beginPath();
    _rc.arc( this.x, this.y, this.radius, 0, PII, false );

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

      this.programController.Execute(
        _transform2d.globalTransform.AsArray( true ),
        this.x, this.y, this.radius
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

}
