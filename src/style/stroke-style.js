/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { ApplyProperties } from '../utility';
import { CAP_ROUND, JOIN_ROUND } from './line_conf';

export class StrokeStyle {

  constructor ( _props ) {

    this.color = '#c9df8a';
    this.lineCap = CAP_ROUND;
    this.lineJoin = JOIN_ROUND;
    this.lineWidth = 2;
    this.miterLimit = 10;
    this.applied = true;
    ApplyProperties( this, _props );

  }

  Apply ( _rc ) {
    
    _rc.strokeStyle = this.color;
    _rc.lineCap = this.lineCap;
    _rc.lineJoin = this.lineJoin;
    _rc.lineWidth = this.lineWidth;
    _rc.miterLimit = this.miterLimit;
  
  }

}
