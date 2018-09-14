/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { ApplyProperties } from '../utilities';

export class PixelStyle {

  constructor ( _props ) {

    this.color = '#c9df8a';
    this.size = 1.0;
    ApplyProperties( this, _props );

  }

}
