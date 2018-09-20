/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../math/vector/vector2d';
import { Event } from '../event/event';

export class Touch {

  constructor ( _element, _offsetX, _offsetY ) {

    this.element = _element;
    this.position = new Vector2D();
    this.scale = new Vector2D( 1, 1 );
    this.offset = new Vector2D( _offsetX, _offsetY );
    this.eventData = { position: this.position, native: null };

    this.___bound___OnMove = this.OnMove.bind( this );
    this.___bound___OnStart = this.OnStart.bind( this );
    this.___bound___OnEnd = this.OnEnd.bind( this ); 
    this.___bound___OnCancel = this.OnCancel.bind( this );

    this.element.addEventListener( 'touchmove', this.___bound___OnMove );
    this.element.addEventListener( 'touchstart', this.___bound___OnStart, { passive: true } );
    this.element.addEventListener( 'touchend', this.___bound___OnEnd );
    this.element.addEventListener( 'touchcancel', this.___bound___OnCancel );

    this.onMove = new Event();
    this.onStart = new Event();
    this.onEnd = new Event();
    this.onCancel = new Event();

  }

  static get x () {

    return this.position.x;
  
  }

  static get y () {

    return this.position.y;
  
  }

  OnMove ( _event ) {

    _event.preventDefault();
    _event.stopPropagation();
    this.CalculatePosition( _event.touches.item( 0 ).pageX, _event.touches.item( 0 ).pageY );
    this.eventData.native = _event;
    this.onMove.Dispatch( this.element, this.eventData );

    return false;
  
  }

  OnStart ( _event ) {

    _event.stopPropagation();
    this.CalculatePosition( _event.touches.item( 0 ).pageX, _event.touches.item( 0 ).pageY );
    this.eventData.native = _event;
    this.onStart.Dispatch( this.element, this.eventData );
  
  }

  OnEnd ( _event ) {

    _event.stopPropagation();
    this.eventData.native = _event;
    this.onEnd.Dispatch( this.element, this.eventData );
  
  }

  OnCancel ( _event ) {

    _event.stopPropagation();
    this.eventData.native = _event;
    this.onCancel.Dispatch( this.element, this.eventData );
  
  }

  CalculatePosition ( _x, _y ) {

    const pos = this.position;

    pos.Set( _x, _y );
    pos.Subtract( this.element.offsetLeft, this.element.offsetTop );
    pos.SubtractV( this.offset );
    pos.DivideV( this.scale );
  
  }

  Destroy () {

    this.element.removeEventListener( 'touchmove', this.___bound___OnMove );
    this.element.removeEventListener( 'touchstart', this.___bound___OnStart );
    this.element.removeEventListener( 'touchend', this.___bound___OnEnd );
    this.element.removeEventListener( 'touchcancel', this.___bound___OnCancel );
  
  }

}
