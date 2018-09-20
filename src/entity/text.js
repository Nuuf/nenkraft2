/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Container2D } from './container2d';
import { SaT } from '../style';
import { DEFAULT } from '../style/gco';

export class Text extends Container2D {

  constructor ( _x, _y, _text, _style ) {

    super( _x, _y );
    this.text = _text;
    this.style = SaT( _style );
    this.maxWidth = undefined;
    this.alpha = 1.0;
    this.gco = DEFAULT;
  
  }

  Draw ( _rc ) {
      
    this.PreDraw( _rc );

    if ( this.render === true ) {

      if ( this.transformShouldUpdate === true ) {

        this.UpdateTransform();
        if ( this.transformAutomaticUpdate === false ) this.transformShouldUpdate = false;
      
      }

      this.transform.ApplyGlobal( _rc );

      if ( this.display === true ) {

        const style = this.style;

        if ( style.shadow.applied === true ) {

          style.shadow.Apply( _rc );
        
        }

        if ( style.text.applied === true ) {

          style.text.Apply( _rc );
          _rc.globalAlpha = this.alpha;
          _rc.globalCompositeOperation = this.gco;
          _rc.fillText( this.text, 0, 0, this.maxWidth );
          _rc.strokeText( this.text, 0, 0, this.maxWidth );
        
        }
      
      }

      if ( this.children.length > 0 ) {

        this.DrawChildren( _rc );
      
      }
    
    }

  }

  IntersectsPoint () {

    return false;
  
  }

}
