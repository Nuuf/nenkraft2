/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { ApplyProperties } from '../utility';

export class FillStyle {

  /**
   * 
   * @param {object?} _props 
   */
  constructor ( _props ) {

    this.color = '#6496c8';
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

    _rc.fillStyle = this.color;
  
  }

}
