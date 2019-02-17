/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { PrecisionRound } from '../../math';

export class ServerTicker {

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

  static get LOG () {

    return PS_LOG;
  
  }

  static set LOG ( _value ) {

    PS_LOG = !!_value;
  
  }

  Process () {

    this.onProcess( this.ComputeDelta() );
  
  }

  ComputeDelta () {
      
    this.now = Date.now();
    this.delta = this.now - this.then;
    this.then = this.now;

    return this.delta;
  
  }

  GetTPS () {

    return PrecisionRound( 1 / this.delta * 1000, 2 );
  
  }

  SetDesiredRate ( _rate ) {

    this.desiredRate = _rate === undefined ? 16.66 : 1000 / _rate;
  
  }

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
