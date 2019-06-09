/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Dispatcher } from '../event/dispatcher';
import { Key } from './key';

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

    this.keys = [];
    this.keysToProcess = [];

  }

  /**
   * 
   * @param {KeyboardEvent} _event 
   * 
   * @return {void}
   */
  OnKeyDown ( _event ) {

    _event.stopPropagation();

    const { keyCode } = _event;
    const { keys } = this;
    let [ key ] = keys;

    for ( var i = 0; i < keys.length; key = keys[ ++i ] ) {

      if ( key.code === keyCode && key.isDown === false ) {

        key.isDown = true;
        key.duration = 0;
        key.repetitions++;
        key.repetitionsTimer = 0;

      }

    }

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

    const { keyCode } = _event;
    const { keys } = this;
    let [ key ] = keys;

    for ( var i = 0; i < keys.length; key = keys[ ++i ] ) {

      if ( key.code === keyCode && key.isDown === true ) {

        key.isDown = false;

      }

    }

    this.onUp.Dispatch( this.element, _event );
  
  }

  /**
   * 
   * @return {this}
   */
  Destroy () {

    this.element.removeEventListener( 'keydown', this.___bound___OnKeyDown );
    this.element.removeEventListener( 'keyup', this.___bound___OnKeyUp );
    this.ReleaseAll();

    return this;
  
  }

  /**
   * 
   * @return {void}
   */
  Process () {
    
    const keys = this.keysToProcess;
    let [ key ] = keys;

    for ( var i = 0; i < keys.length; key = keys[ ++i ] ) {

      if ( key.isDown === true ) {

        key.duration++;
      
      }

      if ( ++key.repetitionsTimer >= key.repetitionsSpeed ) {

        key.repetitions = 0;
        key.repetitionsTimer = 0;
      
      }

    }
  
  }

  /**
   * 
   * @param {integer} _code 
   * 
   * @return {boolean}
   */
  KeyCodeBeingCaptured ( _code ) {

    const { keys } = this;

    for ( var i = 0; i < keys.length; ++i ) {

      if ( keys[ i ].code === _code ) return true;
    
    }

    return false;
  
  }

  /**
   * 
   * @param {integer} _code 
   * 
   * @return {boolean}
   */
  KeyCodeBeingProcessed ( _code ) {

    const keys = this.keysToProcess;

    for ( var i = 0; i < keys.length; ++i ) {

      if ( keys[ i ].code === _code ) return true;
    
    }

    return false;
  
  }

  /**
   * 
   * @param {integer} _code 
   * 
   * @return {Key}
   */
  GetKey ( _code ) {

    const { keys } = this;

    for ( var i = 0; i < keys.length; ++i ) {

      if ( keys[ i ].code === _code ) return keys[ i ];
    
    }

    throw new Error( 'KeyCode not being captured!' );
  
  }

  /**
   * 
   * @return {void}
   */
  Capture () {

    for ( var i = 0; i < arguments.length; ++i ) {

      if ( this.KeyCodeBeingCaptured( i ) ) {

        throw new Error( 'KeyCode already being captured!' );
      
      }

      const key = new Key( arguments[ i ] );
      
      this.keys.push( key );
      this.keysToProcess.push( key );

    }
  
  }

  /**
   * 
   * @return {void}
   */
  NoProcessCapture () {

    for ( var i = 0; i < arguments.length; ++i ) {

      if ( this.KeyCodeBeingCaptured( i ) ) {

        throw new Error( 'KeyCode already being captured!' );
      
      }

      const key = new Key( arguments[ i ] );
      
      this.keys.push( key );

    }
  
  }

  /**
   * 
   * @return {void}
   */
  Release () {

    for ( var i = 0; i < arguments.length; ++i ) {

      const key = this.GetKey( arguments[ i ] );

      this.keys.fickleSplice( this.keys.indexOf( key ) );
        
      this.keysToProcess.fickleSplice( this.keysToProcess.indexOf( key ) );

    }
  
  }

  /**
   * 
   * @return {void}
   */
  ReleaseAll () {

    this.keys.length = 0;
    this.keysToProcess.length = 0;
  
  }

}
