/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import * as Ease from '../math/ease';
import { Event } from '../event/event';
import { Nested } from '../utility';

export class Motion {

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
    this.onStart = new Event();
    this.onEnd = new Event();
    this.onStop = new Event();
    this.onReconfigure = new Event();
    this.onReset = new Event();
  
  }

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

  Stop () {

    this.property = null;
    this.propertyObject = null;
    this.startValue = 0;
    this.change = 0;
    this.time = 0;
    this.running = false;
    this.onStop.Dispatch( this, null );
  
  }

  Process () {

    if ( this.running === true ) {

      this.propertyObject[ this.property ] = this.easing( this.time, this.startValue, this.change, this.duration );
  
      if ( ++this.time >= this.duration ) {
  
        this.running = false;
        this.propertyObject[ this.property ] = this.value;
        this.onEnd.Dispatch( this, null );
        
      }
      
    }
  
  }

  Reconfigure ( _propertyString, _value, _duration, _easing ) {

    if ( _propertyString != null ) this.propertyString = _propertyString;
    this.value = _value;
    this.duration = _duration;
    this.easing = Ease[ _easing == null ? PS_DEFAULT_EASING : _easing ];
    this.onReconfigure.Dispatch( this, null );
  
  }

  NewValue ( _value ) {
      
    this.value = _value;
    this.Start();
  
  }

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
