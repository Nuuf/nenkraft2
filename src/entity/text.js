/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { VisualContainer2D } from './visual-container2d';
import { SaT } from '../style';
import { DEFAULT } from '../style/gco';

export class Text extends VisualContainer2D {

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   * @param {string} _text 
   * @param {object} _style 
   */
  constructor ( _x, _y, _text, _style ) {

    super( _x, _y );
    
    this.text = _text;
    this.style = SaT( _style );
    this.maxWidth = undefined;
    this.alpha = 1;
    this.gco = DEFAULT;
  
  }

  /**
   * 
   * @param {CanvasRenderingContext2D} _rc 
   * 
   * @return {void}
   */
  Render ( _rc ) {
      
    this.PreRender( _rc );

    if ( this.render === true ) {

      this.ProcessTransform( this.parent );

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

        this.RenderChildren( _rc );
      
      }
    
    }

  }

  /**
   * 
   * @return {boolean}
   */
  IntersectsPoint2D () {

    return false;
  
  }

}
