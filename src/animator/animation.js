/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Event } from '../event/event';
import { Frame } from './frame';

export class Animation {

  constructor ( _controller, _id, _rate ) {

    this.frames = [];
    this.controller = _controller;
    this.sprite = _controller.sprite;
    this.id = _id;
    this.onEnd = new Event();
    this.onStop = new Event();
    this.onStart = new Event();
    this.currentFrame = 0;
    this.currentFrameIndex = 0;
    this.playing = false;
    this.rate = 60;
    this.timer = 0;
    this.reverse = false;
    this.overrideFrameRate = false;
    if ( _rate != null ) this.rate = _rate;
  
  }

  CreateFrame ( _x, _y, _w, _h, _rate ) {

    _rate = _rate == null ? this.rate : _rate;
    this.frames.push( new Frame( _x, _y, _w, _h, _rate ) );
  
  }

  AddFrame ( _frame ) {

    if ( _frame.rate == null || _frame.rate <= 0 ) {

      _frame.rate = this.rate;
      
    }
  
    this.frames.push( _frame );
  
  }

  GenerateFrame ( _frameWidth, _frameHeight, _imageWidth, _imageHeight, _amount, _data ) {

    let i = 0;
    let rate;
    const columns = _imageWidth / _imageHeight;

    _data = _data == null ? {} : _data;

    for ( ; i < _amount; ++i ) {

      rate = _data[ i ];
      this.CreateFrame( ( i % columns ) * _frameWidth, ( ( i / columns ) | 0 ) * _frameHeight, _frameWidth, _frameHeight, rate );
    
    }
  
  }

  SetFrame ( _index ) {

    _index = _index == null ? 0 : _index;

    const frame = this.frames[ _index ];

    if ( frame !== undefined ) {

      this.currentFrame = frame;
      this.currentFrameIndex = _index;
      this.currentFrame.Apply( this.sprite );
    
    }
  
  }

  GetFrameById ( _id, _returnIndex ) {

    let i = 0;
    const frames = this.frames;
    const l = frames.length;

    for ( ; i < l; ++i ) {

      if ( frames[i].id === _id ) {
    
        if ( _returnIndex === true ) return i;
        return frames[i];
        
      }
      
    }
  
  }

  SetFrameById ( _id ) {

    const index = this.GetFrameById( _id, true );
    this.SetFrame( index );
  
  }

  Start () {

    this.playing = true;
    this.onStart.Dispatch();
  
  }

  Stop () {

    this.playing = false;
    this.onStop.Dispatch();
  
  }

  Process () {

    if ( this.playing === true ) {

      if ( this.overrideFrameRate === true ) {
  
        if ( --this.timer <= 0 ) {
  
          this.timer = this.rate;
          this.NextFrame();
          
        }
        
      } else if ( this.currentFrame.Process() === true ) {
  
        this.NextFrame();
        
      }
      
    }
  
  }

  NextFrame () {

    let done = false;
    const frames = this.frames;
    const fsl = frames.length;

    if ( this.reverse === false ) ++this.currentFrameIndex;
    else --this.currentFrameIndex;

    if ( this.currentFrameIndex >= fsl ) {

      this.currentFrameIndex = 0;
      done = true;
        
    } else if ( this.currentFrameIndex < 0 ) {

      this.currentFrameIndex = fsl - 1;
      done = true;
    
    }

    this.currentFrame = frames[ this.currentFrameIndex ];
    this.currentFrame.Apply( this.sprite );
    if ( done === true ) this.onEnd.Dispatch();
  
  }

  Clear () {

    this.frames = [];
    this.currentFrame = null;
    this.playing = false;
    this.currentFrameIndex = 0;
    this.timer = this.rate;
  
  }

  Restart ( _index ) {

    this.SetFrame( _index );
    this.ResetAllFrames();
    this.Start();
    this.timer = this.rate;
  
  }

  Reset () {

    this.SetFrame( 0 );
    this.ResetAllFrames();
    this.timer = this.rate;
    this.playing = false;
  
  }

  ResetAllFrames () {

    let i = 0;
    const frames = this.frames;
    const l = frames.length;

    for ( ; i < l; ++i ) {

      frames[i].Reset();
      
    }
  
  }

}
