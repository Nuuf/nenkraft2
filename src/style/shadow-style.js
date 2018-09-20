/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { ApplyProperties } from '../utility';

export class ShadowStyle {

  constructor ( _props ) {

    this.color = '#234d20';
    this.blur = 5;
    this.offsetX = 0;
    this.offsetY = 0;
    this.applied = false;
    ApplyProperties( this, _props );

  }

  Apply ( _rc ) {

    _rc.shadowColor = this.color;
    _rc.shadowBlur = this.blur;
    _rc.shadowOffsetX = this.offsetX;
    _rc.shadowOffsetY = this.offsetY;
  
  }

}
