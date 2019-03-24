/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { PrecisionRound } from '../../math';

export class ServerTicker {

  /**
   * 
   * @param {Function} _onProcess 
   * @param {number}   _rate 
   * @param {boolean}  _halt 
   */
  constructor ( _onProcess, _rate, _halt ) {

    this.SetDesiredRate( _rate );
    this.onProcess = _onProcess;
    this.intervalId = null;
    this.delta = 0;
    this.then = 0;
    this.now = 0;
    this.desiredRate = 0;

    if ( !_halt ) {

      this.Start();
      
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
   * @param {number} _rate
   * 
   * @return {void} 
   */
  SetDesiredRate ( _rate ) {

    this.desiredRate = _rate === undefined ? 16.66 : 1000 / _rate;
  
  }

  /**
   * 
   * @param {boolean} _force
   * 
   * @return {void} 
   */
  Start ( _force ) {

    if ( this.intervalId !== null ) {
  
      if ( _force === true ) {
  
        this.Stop();
        this.intervalId = setInterval( this.Process.bind( this ), this.desiredRate );
        Log( 'Ticker: Starting interval!' );
        
      }
      else {

        Log( 'Ticker: Interval already running!' );
        
      }
      
    }
    else {
  
      this.intervalId = setInterval( this.Process.bind( this ), this.desiredRate );
      Log( 'Ticker: Starting interval!' );
      
    }
  
  }

  /**
   * 
   * @return {void}
   */
  Stop () {

    if ( this.intervalId !== null ) {

      clearInterval( this.intervalId );
      this.intervalId = null;
      Log( 'Ticker: Stopping interval!' );
      
    }
  
  }

}

// Private Static ----->
const PS_LOG = true;
const Log = function () {

  if ( PS_LOG === false ) return;
  console.log.apply( null, arguments );
  
};
// <----- Private Static
