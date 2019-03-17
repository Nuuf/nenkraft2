/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { ApplyProperties } from '../utility';

export class ShadowStyle {

  /**
   * 
   * @param {object?} _props 
   */
  constructor ( _props ) {

    this.color = '#c89664';
    this.blur = 5;
    this.offsetX = 0;
    this.offsetY = 0;
    this.applied = false;
    ApplyProperties( this, _props );

  }

  /**
   * 
   * @param {CanvasRenderingContext2D} _rc 
   * 
   * @return {void}
   */
  Apply ( _rc ) {

    _rc.shadowColor = this.color;
    _rc.shadowBlur = this.blur;
    _rc.shadowOffsetX = this.offsetX;
    _rc.shadowOffsetY = this.offsetY;
  
  }

}
