/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Event } from '../event/event';

const Round = Math.round;

export class Timer {

  constructor () {

    this.stopTime = null;
    this.time = 0;
    this.isRunning = false;
    this.canResume = false;
    this.count = 0;
    this.onStop = new Event();
    this.onFinish = new Event();
    this.onStart = new Event();
    this.onReset = new Event();
    this.onPause = new Event();
    this.onResume = new Event();
  
  }

  Reset () {

    this.onReset.Dispatch( this, null );
    this.count = 0;
    this.time = 0;
    this.isRunning = false;
    this.canResume = false;
    this.stopTime = null;
  
  }

  Start ( _stopTime ) {

    this.stopTime = Round( _stopTime == null ? this.stopTime : _stopTime );

    if ( this.stopTime > 0 ) {

      this.time = 0;
      this.isRunning = true;
      this.canResume = false;
      this.onStart.Dispatch( this, { stopTime: this.stopTime } );
    
    }
  
  }

  Stop () {

    if ( this.isRunning === true ) {

      this.isRunning = false;
      this.onStop.Dispatch( this, null );
      
    }
  
  }

  Pause () {

    if ( this.isRunning === true && this.canResume === false ) {

      this.isRunning = false;
      this.canResume = true;
      this.onPause.Dispatch( this, null );
      
    }
  
  }

  Resume () {

    if ( this.canResume === true ) {

      this.isRunning = true;
      this.canResume = false;
      this.onResume.Dispatch( this, null );
      
    }
  
  }

  Process () {

    if ( this.time < this.stopTime && this.isRunning === true ) {

      if ( ++this.time >= this.stopTime ) {
  
        this.isRunning = false;
        this.count++;
        this.onFinish.Dispatch( this, null );
        
      }
      
    }
  
  }

}
