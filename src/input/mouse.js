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
    this.offsets = [];

    this.___bound___OnMove = this.OnMove.bind( this );
    this.___bound___OnDown = this.OnDown.bind( this ); 
    this.___bound___OnUp = this.OnUp.bind( this );
    this.___bound___OnLeave = this.OnLeave.bind( this );
    this.___bound___OnWheel = this.OnWheel.bind( this );

    this.element.addEventListener( 'mousemove', this.___bound___OnMove );
    this.element.addEventListener( 'mousedown', this.___bound___OnDown );
    this.element.addEventListener( 'mouseup', this.___bound___OnUp );
    this.element.addEventListener( 'mouseleave', this.___bound___OnLeave );
    this.element.addEventListener( 'wheel', this.___bound___OnWheel, { passive: true } );

    this.onMove = new Event();
    this.onDown = new Event();
    this.onUp = new Event();
    this.onLeave = new Event();
    this.onWheel = new Event();
  
  }

  get x () {

    return this.position.x;
  
  }

  get y () {

    return this.position.y;
  
  }

  OnMove ( _event ) {

    this.CalculatePosition( _event.clientX, _event.clientY );
    this.eventData.native = _event;
    this.onMove.Dispatch( this.element, this.eventData );

    return false;
  
  }

  OnDown ( _event ) {

    _event.stopPropagation();
    _event.preventDefault();
    this.CalculatePosition( _event.clientX, _event.clientY );
    this.eventData.native = _event;
    this.onDown.Dispatch( this.element, this.eventData );
  
  }

  OnUp ( _event ) {

    _event.stopPropagation();
    _event.preventDefault();
    this.CalculatePosition( _event.clientX, _event.clientY );
    this.eventData.native = _event;
    this.onUp.Dispatch( this.element, this.eventData );
  
  }

  OnLeave ( _event ) {

    _event.stopPropagation();
    this.CalculatePosition( _event.clientX, _event.clientY );
    this.eventData.native = _event;
    this.onLeave.Dispatch( this.element, this.eventData );
  
  }

  OnWheel ( _event ) {

    _event.stopPropagation();
    this.CalculatePosition( _event.clientX, _event.clientY );
    this.eventData.native = _event;
    this.onWheel.Dispatch( this.element, this.eventData );
  
  }

  CalculatePosition ( _x, _y ) {

    const offsets = this.offsets;
    const pos = this.position;
    const rect = this.element.getBoundingClientRect();

    pos
      .Set( _x, _y )
      .Subtract( rect.left, rect.top )
      .SubtractV( this.offset )
      .DivideV( this.scale );

    for ( var i = 0; i < offsets.length; ++i ) {

      pos.SubtractV( offsets[ i ] );
    
    }
  
  }

  AddOffset ( _offset ) {

    this.offsets.push( _offset );

    return this;

  }

  Destroy () {

    this.element.removeEventListener( 'mousemove', this.___bound___OnMove );
    this.element.removeEventListener( 'mousedown', this.___bound___OnDown );
    this.element.removeEventListener( 'mouseup', this.___bound___OnUp );
    this.element.removeEventListener( 'mouseleave', this.___bound___OnLeave );
    this.element.removeEventListener( 'wheel', this.___bound___OnWheel );
  
  }

}
