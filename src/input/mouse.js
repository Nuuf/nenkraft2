/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../math/vector/vector2d';
import { Event } from '../event/event';

export class Mouse {

  constructor ( _element, _offsetX, _offsetY ) {

    this.element = _element;
    this.position = new Vector2D();
    this.scale = new Vector2D( 1, 1 );
    this.offset = new Vector2D( _offsetX, _offsetY );
    this.eventData = { position: this.position, native: null };

    this.element.addEventListener( 'mousemove', this.OnMove.bind( this ) );
    this.element.addEventListener( 'mousedown', this.OnDown.bind( this ) );
    this.element.addEventListener( 'mouseup', this.OnUp.bind( this ) );
    this.element.addEventListener( 'mouseleave', this.OnLeave.bind( this ) );
    this.element.addEventListener( 'wheel', this.OnWheel.bind( this ), { passive: true } );

    this.onMove = new Event();
    this.onDown = new Event();
    this.onUp = new Event();
    this.onLeave = new Event();
    this.onWheel = new Event();
  
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
    this.CalculatePosition( _event.pageX, _event.pageY );
    this.eventData.native = _event;
    this.onMove.Dispatch( this.element, this.eventData );

    return false;
  
  }

  OnDown ( _event ) {

    _event.stopPropagation();
    this.CalculatePosition( _event.pageX, _event.pageY );
    this.eventData.native = _event;
    this.onDown.Dispatch( this.element, this.eventData );
  
  }

  OnUp ( _event ) {

    _event.stopPropagation();
    this.eventData.native = _event;
    this.onUp.Dispatch( this.element, this.eventData );
  
  }

  OnLeave ( _event ) {

    _event.stopPropagation();
    this.eventData.native = _event;
    this.onLeave.Dispatch( this.element, this.eventData );
  
  }

  OnWheel ( _event ) {

    _event.stopPropagation();
    this.eventData.native = _event;
    this.onWheel.Dispatch( this.element, this.eventData );
  
  }

  CalculatePosition ( _x, _y ) {

    const pos = this.position;

    pos.Set( _x, _y );
    pos.Subtract( this.element.offsetLeft, this.element.offsetTop );
    pos.SubtractV( this.offset );
    pos.DivideV( this.scale );
  
  }

}
