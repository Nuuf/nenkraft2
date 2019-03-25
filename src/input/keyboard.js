/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Dispatcher } from '../event/dispatcher';

export class Keyboard {

  /**
   * 
   * @param {DOMElement} _element 
   */
  constructor ( _element ) {

    this.element = _element;

    if ( this.element.setAttribute ) {

      this.element.setAttribute( 'tabindex', '1' );
    
    }

    if ( this.element.focus ) {

      this.element.focus();
    
    }

    this.___bound___OnKeyDown = this.OnKeyDown.bind( this );
    this.___bound___OnKeyUp = this.OnKeyUp.bind( this );

    this.element.addEventListener( 'keydown', this.___bound___OnKeyDown );
    this.element.addEventListener( 'keyup', this.___bound___OnKeyUp );

    this.onDown = new Dispatcher();
    this.onUp = new Dispatcher();

  }

  /**
   * 
   * @param {KeyboardEvent} _event 
   * 
   * @return {void}
   */
  OnKeyDown ( _event ) {

    _event.stopPropagation();
    this.onDown.Dispatch( this.element, _event );
  
  }

  /**
   * 
   * @param {KeyboardEvent} _event 
   * 
   * @return {void}
   */
  OnKeyUp ( _event ) {

    _event.stopPropagation();
    this.onUp.Dispatch( this.element, _event );
  
  }

  /**
   * 
   * @return {this}
   */
  Destroy () {

    this.element.removeEventListener( 'keydown', this.___bound___OnKeyDown );
    this.element.removeEventListener( 'keyup', this.___bound___OnKeyUp );

    return this;
  
  }

}
