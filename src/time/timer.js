/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Dispatcher } from '../event/dispatcher';

const Round = Math.round;

export class Timer {

  constructor ( _stopTime ) {

    this.stopTime = Round( _stopTime == null ? 0 : _stopTime );
    this.time = 0;
    this.isRunning = false;
    this.canResume = false;
    this.count = 0;
    this.onStop = new Dispatcher();
    this.onFinish = new Dispatcher();
    this.onStart = new Dispatcher();
    this.onReset = new Dispatcher();
    this.onPause = new Dispatcher();
    this.onResume = new Dispatcher();
  
  }

  Reset () {

    this.onReset.Dispatch( this, null );
    this.count = 0;
    this.time = 0;
    this.isRunning = false;
    this.canResume = false;
  
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
