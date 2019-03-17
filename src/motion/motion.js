/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import * as Ease from '../math/ease';
import { Dispatcher } from '../event/dispatcher';
import { Nested } from '../utility';

export class Motion {

  /**
   * 
   * @param {string}        _id 
   * @param {object|Entity} _target 
   * @param {string}        _propertyString 
   * @param {number}        _value 
   * @param {number}        _duration 
   * @param {string?}       _easing 
   */
  constructor ( _id, _target, _propertyString, _value, _duration, _easing ) {

    this.id = _id;
    this.target = _target;
    this.propertyString = _propertyString;
    this.value = _value;
    this.duration = _duration;
    this.easing = Ease[ _easing == null ? PS_DEFAULT_EASING : _easing ];
    this.time = 0;
    this.startValue = 0;
    this.change = 0;
    this.property = null;
    this.properyObject = null;
    this.running = false;
    this.onStart = new Dispatcher();
    this.onEnd = new Dispatcher();
    this.onStop = new Dispatcher();
    this.onReconfigure = new Dispatcher();
    this.onReset = new Dispatcher();
  
  }

  /**
   * 
   * @return {void}
   */
  Start () {

    const property = this.propertyString.split( '.' );

    this.property = property[ property.length - 1 ];
    this.propertyObject = Nested( this.target, this.propertyString, true );
    this.startValue = this.propertyObject[ this.property ];
    this.change = this.value - this.startValue;
    this.time = 0;
    this.running = true;
    this.onStart.Dispatch( this, null );
  
  }

  /**
   * 
   * @return {void}
   */
  Stop () {

    this.property = null;
    this.propertyObject = null;
    this.startValue = 0;
    this.change = 0;
    this.time = 0;
    this.running = false;
    this.onStop.Dispatch( this, null );
  
  }

  /**
   * 
   * @return {void}
   */
  Process () {

    if ( this.running === true ) {

      this.propertyObject[ this.property ] = this.easing( 
        this.time, this.startValue, this.change, this.duration
      );
  
      if ( ++this.time >= this.duration ) {
  
        this.running = false;
        this.propertyObject[ this.property ] = this.value;
        this.onEnd.Dispatch( this, null );
        
      }
      
    }
  
  }

  /**
   * 
   * @param {string}  _propertyString 
   * @param {number}  _value 
   * @param {number}  _duration 
   * @param {string?} _easing 
   * 
   * @return {void}
   */
  Reconfigure ( _propertyString, _value, _duration, _easing ) {

    if ( _propertyString != null ) this.propertyString = _propertyString;
    this.value = _value;
    this.duration = _duration;
    this.easing = Ease[ _easing == null ? PS_DEFAULT_EASING : _easing ];
    this.onReconfigure.Dispatch( this, null );
  
  }

  /**
   * 
   * @param {number} _value 
   * 
   * @return {void}
   */
  NewValue ( _value ) {
      
    this.value = _value;
    this.Start();
  
  }

  /**
   * 
   * @return {void}
   */
  Reset () {

    if ( this.propertyObject == null || this.property == null ) return false;
    this.propertyObject[ this.property ] = this.startValue;
    this.property = null;
    this.propertyObject = null;
    this.startValue = 0;
    this.change = 0;
    this.time = 0;
    this.running = false;
    this.onReset.Dispatch( this, null );
  
  }

}

// Private Static ----->
const PS_DEFAULT_EASING = 'Linear';
// <----- Private Static
