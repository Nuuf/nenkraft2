/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../math/vector/vector2d';
import { Dispatcher } from '../event/dispatcher';

export class Mouse {

  /**
   * 
   * @param {DOMElement} _element 
   * @param {number}     _offsetX 
   * @param {number}     _offsetY 
   */
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

    this.onMove = new Dispatcher();
    this.onDown = new Dispatcher();
    this.onUp = new Dispatcher();
    this.onLeave = new Dispatcher();
    this.onWheel = new Dispatcher();
  
  }

  /**
   * 
   * @return {number}
   */
  get x () {

    return this.position.x;
  
  }

  /**
   * 
   * @return {number}
   */
  get y () {

    return this.position.y;
  
  }

  /**
   *
   * @param {MouseEvent} _event 
   * 
   * @return {boolean}
   */
  OnMove ( _event ) {

    this.CalculatePosition( _event.clientX, _event.clientY );
    this.eventData.native = _event;
    this.onMove.Dispatch( this.element, this.eventData );

    return false;
  
  }

  /**
   * 
   * @param {MouseEvent} _event 
   * 
   * @return {void}
   */
  OnDown ( _event ) {

    _event.stopPropagation();
    this.CalculatePosition( _event.clientX, _event.clientY );
    this.eventData.native = _event;
    this.onDown.Dispatch( this.element, this.eventData );
  
  }

  /**
   * 
   * @param {MouseEvent} _event 
   * 
   * @return {void}
   */
  OnUp ( _event ) {

    _event.stopPropagation();
    this.CalculatePosition( _event.clientX, _event.clientY );
    this.eventData.native = _event;
    this.onUp.Dispatch( this.element, this.eventData );
  
  }

  /**
   * 
   * @param {MouseEvent} _event 
   * 
   * @return {void}
   */
  OnLeave ( _event ) {

    _event.stopPropagation();
    this.CalculatePosition( _event.clientX, _event.clientY );
    this.eventData.native = _event;
    this.onLeave.Dispatch( this.element, this.eventData );
  
  }

  /**
   * 
   * @param {MouseEvent} _event 
   * 
   * @return {void}
   */
  OnWheel ( _event ) {

    _event.stopPropagation();
    this.CalculatePosition( _event.clientX, _event.clientY );
    this.eventData.native = _event;
    this.onWheel.Dispatch( this.element, this.eventData );
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   * 
   * @return {void}
   */
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

  /**
   * 
   * @param {Vector2D} _offset 
   * 
   * @return {this}
   */
  AddOffset ( _offset ) {

    this.offsets.push( _offset );

    return this;

  }

  /**
   * 
   * @return {this}
   */
  Destroy () {

    this.element.removeEventListener( 'mousemove', this.___bound___OnMove );
    this.element.removeEventListener( 'mousedown', this.___bound___OnDown );
    this.element.removeEventListener( 'mouseup', this.___bound___OnUp );
    this.element.removeEventListener( 'mouseleave', this.___bound___OnLeave );
    this.element.removeEventListener( 'wheel', this.___bound___OnWheel );

    return this;
  
  }

}
