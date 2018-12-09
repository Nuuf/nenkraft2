/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../math/vector/vector2d';
import { Dispatcher } from '../event/dispatcher';

export class Touch {

  constructor ( _element, _offsetX, _offsetY ) {

    this.element = _element;
    this.position = new Vector2D();
    this.scale = new Vector2D( 1, 1 );
    this.offset = new Vector2D( _offsetX, _offsetY );
    this.eventData = { position: this.position, native: null };
    this.offsets = [];

    this.___bound___OnMove = this.OnMove.bind( this );
    this.___bound___OnStart = this.OnStart.bind( this );
    this.___bound___OnEnd = this.OnEnd.bind( this ); 
    this.___bound___OnCancel = this.OnCancel.bind( this );

    this.element.addEventListener( 'touchmove', this.___bound___OnMove );
    this.element.addEventListener( 'touchstart', this.___bound___OnStart );
    this.element.addEventListener( 'touchend', this.___bound___OnEnd );
    this.element.addEventListener( 'touchcancel', this.___bound___OnCancel );

    this.onMove = new Dispatcher();
    this.onStart = new Dispatcher();
    this.onEnd = new Dispatcher();
    this.onCancel = new Dispatcher();

  }

  get x () {

    return this.position.x;
  
  }

  get y () {

    return this.position.y;
  
  }

  OnMove ( _event ) {

    _event.stopPropagation();
    this.CalculatePosition( _event.touches.item( 0 ).clientX, _event.touches.item( 0 ).clientY );
    this.eventData.native = _event;
    this.onMove.Dispatch( this.element, this.eventData );

    return false;
  
  }

  OnStart ( _event ) {

    _event.stopPropagation();
    this.CalculatePosition( _event.touches.item( 0 ).clientX, _event.touches.item( 0 ).clientY );
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

    this.element.removeEventListener( 'touchmove', this.___bound___OnMove );
    this.element.removeEventListener( 'touchstart', this.___bound___OnStart );
    this.element.removeEventListener( 'touchend', this.___bound___OnEnd );
    this.element.removeEventListener( 'touchcancel', this.___bound___OnCancel );
  
  }

}
