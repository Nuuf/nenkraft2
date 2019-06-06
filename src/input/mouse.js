/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../math/vector/vector2d';
import { Dispatcher } from '../event/dispatcher';

export class Mouse {

  /**
   * 
   * @param {DOMElement} _element 
   */
  constructor ( _element ) {

    this.element = _element;
    this.position = new Vector2D();
    this.eventData = { position: this.position, native: null };
    this.coordinateTranslationEntity = null;
    this.coordinateConversionMatrix = null;

    this.___bound___OnMove = this.OnMove.bind( this );
    this.___bound___OnDown = this.OnDown.bind( this ); 
    this.___bound___OnUp = this.OnUp.bind( this );
    this.___bound___OnLeave = this.OnLeave.bind( this );
    this.___bound___OnEnter = this.OnEnter.bind( this );
    this.___bound___OnWheel = this.OnWheel.bind( this );

    this.element.addEventListener( 'mousemove', this.___bound___OnMove );
    this.element.addEventListener( 'mousedown', this.___bound___OnDown );
    this.element.addEventListener( 'mouseup', this.___bound___OnUp );
    this.element.addEventListener( 'mouseleave', this.___bound___OnLeave );
    this.element.addEventListener( 'mouseenter', this.___bound___OnEnter );
    this.element.addEventListener( 'wheel', this.___bound___OnWheel, { passive: true } );

    this.onMove = new Dispatcher();
    this.onDown = new Dispatcher();
    this.onUp = new Dispatcher();
    this.onLeave = new Dispatcher();
    this.onEnter = new Dispatcher();
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
  OnEnter ( _event ) {

    _event.stopPropagation();
    this.CalculatePosition( _event.clientX, _event.clientY );
    this.eventData.native = _event;
    this.onEnter.Dispatch( this.element, this.eventData );

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

    const pos = this.position;
    const rect = this.element.getBoundingClientRect();

    pos
      .Set( _x, _y )
      .Subtract( rect.left, rect.top );

    if ( this.coordinateTranslationEntity ) {

      this.coordinateTranslationEntity.GlobalToLocalPoint( 
        pos, 
        this.coordinateConversionMatrix
      );

    }
  
  }

  /**
   * 
   * @param {Entity}   _entity
   * @param {Matrix2D} _conversion
   * 
   * @return {this} 
   */
  SetCoordinateTranslationEntity ( _entity, _conversion ) {

    this.coordinateTranslationEntity = _entity;
    this.coordinateConversionMatrix = _conversion;

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
