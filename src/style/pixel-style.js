/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { ApplyProperties } from '../utility';

export class PixelStyle {

  constructor ( _props ) {

    this.color = '#6496c8';
    this.size = 1;
    ApplyProperties( this, _props );

  }

}
