/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { PrecisionRound } from '../math';

export class Ticker {

  /**
   * 
   * @param {Function} _onProcess 
   * @param {number?}  _rate 
   * @param {boolean?} _halt 
   */
  constructor ( _onProcess, _rate, _halt ) {

    this.onProcess = _onProcess;
    this.intervalId = null;
    this.afId = null;
    this.immediateId = null;
    this.timeoutId = null;
    this.delta = 0;
    this.then = 0;
    this.now = 0;
    this.desiredRate = 0;
    this.type = null;

    this.ProcessAccurate = this.ProcessAccurate.bind( this );

    this.SetDesiredRate( _rate );

    if ( !_halt ) {

      this.StartAF();
      
    }

  }

  /**
   * 
   * @return {boolean}
   */
  static get LOG () {

    return PS_LOG;
  
  }

  /**
   * 
   * @param {boolean} _value
   */
  static set LOG ( _value ) {

    PS_LOG = !!_value;
  
  }

  /**
   *
   * @return {void}
   */
  Process () {

    this.onProcess( this.ComputeDelta() );
  
  }

  /**
   * 
   * @return {void}
   */
  ProcessAccurate () {

    this.now = Date.now();

    if ( this.then + this.desiredRate <= this.now ) {

      this.delta = this.now - this.then;
      this.then = this.now;
      this.onProcess( this.delta );
    
    }

    if ( Date.now() - this.then < this.desiredRate - 16 ) {

      this.timeoutId = setTimeout( this.ProcessAccurate );
    
    } else {

      this.immediateId = setImmediate( this.ProcessAccurate );
    
    }

  }

  /**
   *
   * @return {void}
   */
  ProcessAF () {

    this.onProcess( this.ComputeDelta() );
    if ( this.afId === null ) return;
    this.afId = requestAnimationFrame( this.ProcessAF );
  
  }

  /**
   * 
   * @return {number}
   */
  ComputeDelta () {
      
    this.now = Date.now();
    this.delta = this.now - this.then;
    this.then = this.now;

    return this.delta;
  
  }

  /**
   * 
   * @return {number}
   */
  GetTPS () {

    return PrecisionRound( 1 / this.delta * 1000, 2 );
  
  }

  /**
   * 
   * @param {number?} _rate
   * 
   * @return {void} 
   */
  SetDesiredRate ( _rate ) {

    this.desiredRate = _rate === undefined ? 16.66 : 1000 / _rate;
  
  }

  /**
   * 
   * @return {boolean}
   */
  IsRunning () {

    if ( this.type !== null ) {

      Log( '%cTicker: ' + this.type + ' is running!', 'color:#F00;'.concat( PS_LOG_CSS ) );

      return true;
    
    }

    return false;
  
  }

  /**
   *
   *
   * @return {void} 
   */
  Start () {

    if ( this.IsRunning() ) return null;
  
    this.now = this.then = Date.now();
    this.intervalId = setInterval( this.Process.bind( this ), this.desiredRate );
    this.type = PS_INTERVAL;
    Log( '%cTicker: Starting ' + this.type, 'color:#0F0;'.concat( PS_LOG_CSS ) );
  
  }

  StartAccurate () {

    if ( this.IsRunning() ) return null;

    this.now = this.then = Date.now();
    this.timeoutId = setTimeout( this.ProcessAccurate );
    this.type = PS_ACCURATE_INTERVAL;
    Log( '%cTicker: Starting ' + this.type, 'color:#0F0;'.concat( PS_LOG_CSS ) );
  
  }

  /**
   *
   *
   * @return {void} 
   */
  StartAF () {

    if ( this.IsRunning() ) return null;
  
    this.now = this.then = Date.now();
    this.ProcessAF = this.ProcessAF.bind( this );
    this.afId = requestAnimationFrame( this.ProcessAF );
    this.type = PS_RAF;
    Log( '%cTicker: Starting ' + this.type, 'color:#0F0;'.concat( PS_LOG_CSS ) );
  
  }

  /**
   * 
   * @return {void}
   */
  Stop () {

    if ( this.intervalId !== null ) {

      clearInterval( this.intervalId );
      this.intervalId = null;
      
    }
  
    if ( this.afId !== null ) {
  
      cancelAnimationFrame( this.afId );
      this.afId = null;
      
    }

    if ( this.immediateId !== null ) {

      clearImmediate( this.immediateId );
      this.immediateId = null;

    }

    if ( this.timeoutId !== null ) {

      clearTimeout( this.timeoutId );
      this.timeoutId = null;
    
    }

    if ( this.type !== null ) {

      Log( '%cTicker: Stopping ' + this.type, 'color:cyan;'.concat( PS_LOG_CSS ) );
    
    }

    this.type = null;
  
  }

}

// Private Static ----->
const PS_RAF = 'RAF';
const PS_INTERVAL = 'INTERVAL';
const PS_ACCURATE_INTERVAL = 'ACCURATE INTERVAL';
const PS_LOG = true;
const PS_LOG_CSS = 
  'background-color:#304860;font-family:Arial;font-size:18px;font-weight:900;padding:5px;';
const Log = function () {

  if ( PS_LOG === false ) return;
  console.log.apply( null, arguments );

};
// <----- Private Static
