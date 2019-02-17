/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { PrecisionRound } from '../../math';

export class Ticker {

  constructor ( _onProcess, _rate, _halt ) {

    this.SetDesiredRate( _rate );
    this.onProcess = _onProcess;
    this.intervalId = null;
    this.afId = null;
    this.delta = 0;
    this.then = 0;
    this.now = 0;
    this.desiredRate = 0;

    if ( !_halt ) {

      this.StartAF();
      
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

  ProcessAF () {

    this.onProcess( this.ComputeDelta() );
    if ( this.afId === null ) return;
    this.afId = requestAnimationFrame( this.ProcessAF );
  
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

    if ( this.afId !== null ) {

      Log( '%cTicker: RAF is running!', 'color:#F00;'.concat( PS_LOG_CSS ) );

      return null;
      
    }
  
    if ( this.intervalId !== null ) {
  
      if ( _force === true ) {
  
        this.Stop();
        this.intervalId = setInterval( this.Process.bind( this ), this.desiredRate );
        Log( '%cTicker: Starting interval!', 'color:#0F0;'.concat( PS_LOG_CSS ) );
        
      }
      else {
  
        Log( '%cTicker: Interval already running!', 'color:#F00;'.concat( PS_LOG_CSS ) );
        
      }
      
    }
    else {
  
      this.intervalId = setInterval( this.Process.bind( this ), this.desiredRate );
      Log( '%cTicker: Starting interval!', 'color:#0F0;'.concat( PS_LOG_CSS ) );
      
    }
  
  }

  StartAF ( _force ) {

    if ( this.intervalId !== null ) {

      Log( '%cTicker: Interval is running!', 'color:#F00;'.concat( PS_LOG_CSS ) );

      return null;
      
    }
  
    if ( this.afId !== null ) {
  
      if ( _force === true ) {
  
        this.Stop();
        this.ProcessAF = this.ProcessAF.bind( this );
        this.afId = requestAnimationFrame( this.ProcessAF );
        Log( '%cTicker: Starting RAF!', 'color:#0F0;'.concat( PS_LOG_CSS ) );
        
      }
      else {
  
        Log( '%cTicker: RAF already running!', 'color:#F00;'.concat( PS_LOG_CSS ) );
        
      }
      
    }
    else {
  
      this.ProcessAF = this.ProcessAF.bind( this );
      this.afId = requestAnimationFrame( this.ProcessAF );
      Log( '%cTicker: Starting RAF!', 'color:#0F0;'.concat( PS_LOG_CSS ) );
      
    }
  
  }

  Stop () {

    if ( this.intervalId !== null ) {

      clearInterval( this.intervalId );
      this.intervalId = null;
      Log( '%cTicker: Stopping interval!', 'color:cyan;'.concat( PS_LOG_CSS ) );
      
    }
  
    if ( this.afId !== null ) {
  
      cancelAnimationFrame( this.afId );
      this.afId = null;
      Log( '%cTicker: Stopping RAF!', 'color:cyan;'.concat( PS_LOG_CSS ) );
      
    }
  
  }

}

// Private Static ----->
const PS_LOG = true;
const PS_LOG_CSS = 'background-color:#304860;font-family:Arial;font-size:18px;font-weight:900;padding:5px;';
const Log = function () {

  if ( PS_LOG === false ) return;
  console.log.apply( null, arguments );

};
// <----- Private Static
