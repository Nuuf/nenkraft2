/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { ApplyProperties } from '../utility';
import { ALIGN_LEFT, BASELINE_TOP } from './text_conf';

export class TextStyle {

  constructor ( _props ) {

    this.fillColor = '#36802d';
    this.strokeColor = '#36802d';
    this.fontSize = 45;
    this.font = null;
    this.fontFamily = 'Arial';
    this.align = ALIGN_LEFT;
    this.baseline = BASELINE_TOP;
    this.lineWidth = 0.5;
    this.applied = true;
    ApplyProperties( this, _props );
    this.ConcatFont();

  }

  Apply ( _rc ) {
    
    _rc.fillStyle = this.fillColor;
    _rc.strokeStyle = this.strokeColor;
    _rc.font = this.font;
    _rc.textAlign = this.align;
    _rc.textBaseline = this.baseline;
    _rc.lineWidth = this.lineWidth;
  
  }

  ConcatFont () {

    this.font = this.fontSize + 'px ' + this.fontFamily;
  
  }

}
