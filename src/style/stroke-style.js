/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { ApplyProperties } from '../utility';
import { CAP_ROUND, JOIN_ROUND } from './line_conf';

export class StrokeStyle {

  /**
   * 
   * @param {object?} _props 
   */
  constructor ( _props ) {

    this.color = '#c89664';
    this.lineCap = CAP_ROUND;
    this.lineJoin = JOIN_ROUND;
    this.lineWidth = 2;
    this.lineDashOffset = 0;
    this.lineDash = [ 0, 0 ];
    this.miterLimit = 10;
    this.applied = true;
    ApplyProperties( this, _props );

  }

  /**
   * 
   * @param {CanvasRenderingContext2D} _rc 
   * 
   * @return {void}
   */
  Apply ( _rc ) {
    
    _rc.strokeStyle = this.color;
    _rc.lineCap = this.lineCap;
    _rc.lineJoin = this.lineJoin;
    _rc.lineWidth = this.lineWidth;
    _rc.miterLimit = this.miterLimit;
    _rc.lineDashOffset = this.lineDashOffset;
    _rc.setLineDash( this.lineDash );
  
  }

}
