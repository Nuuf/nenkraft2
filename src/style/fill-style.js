/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { ApplyProperties } from '../utility';

export class FillStyle {

  constructor ( _props ) {

    this.color = '#36802d';
    this.applied = true;
    ApplyProperties( this, _props );

  }

  Apply ( _rc ) {

    _rc.fillStyle = this.color;
  
  }

}
