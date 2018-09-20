/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Event } from '../event/event';

export class Keyboard {

  constructor ( _element ) {

    this.element = _element;
    this.element.setAttribute( 'tabindex', '1' );
    this.element.focus();

    this.___bound___OnKeyDown = this.OnKeyDown.bind( this );
    this.___bound___OnKeyUp = this.OnKeyUp.bind( this );

    this.element.addEventListener( 'keydown', this.___bound___OnKeyDown );
    this.element.addEventListener( 'keyup', this.___bound___OnKeyUp );

    this.onDown = new Event();
    this.onUp = new Event();

  }

  OnKeyDown ( _event ) {

    _event.preventDefault();
    _event.stopPropagation();
    this.onDown.Dispatch( this.element, _event );
  
  }

  OnKeyUp ( _event ) {

    _event.preventDefault();
    _event.stopPropagation();
    this.onUp.Dispatch( this.element, _event );
  
  }

  Destroy () {

    this.element.removeEventListener( 'keydown', this.___bound___OnKeyDown );
    this.element.removeEventListener( 'keyup', this.___bound___OnKeyUp );
  
  }

}
