/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Dispatcher } from '../event/dispatcher';
import { Frame } from './frame';

export class Animation {

  /**
   * 
   * @param {Controller} _controller 
   * @param {string|any?} _id 
   * @param {integer?}   _frameDuration 
   * @param {boolean?}   _dynamicSize 
   */
  constructor ( _controller, _id, _frameDuration, _dynamicSize ) {

    this.frames = [];
    this.controller = _controller;
    this.sprite = _controller.sprite;
    this.id = _id;
    this.onEnd = new Dispatcher();
    this.onStop = new Dispatcher();
    this.onStart = new Dispatcher();
    this.currentFrame = 0;
    this.currentFrameIndex = 0;
    this.playing = false;
    this.frameDuration = _frameDuration != null ? _frameDuration : 60;
    this.timer = 0;
    this.reverse = false;
    this.overrideFrameTimer = false;
    this.loop = false;
    this.dynamicSize = !!_dynamicSize;
  
  }

  /**
   * 
   * @param {integer}  _x 
   * @param {integer}  _y 
   * @param {integer}  _w 
   * @param {integer}  _h 
   * @param {integer}  _duration 
   * @param {integer?} _offsetX 
   * @param {integer?} _offsetY 
   * @param {integer?} _originW 
   * @param {integer?} _originH 
   * 
   * @return {void}
   */
  CreateFrame ( _x, _y, _w, _h, _duration, _offsetX, _offsetY, _originW, _originH ) {

    _duration = _duration == null ? this.frameDuration : _duration;
    this.frames.push( new Frame( 
      _x, _y,
      _w, _h,
      _duration, null,
      _offsetX, _offsetY,
      _originW, _originH
    ) );
  
  }

  /**
   *
   * @param {Frame} _frame 
   * 
   * @return {void}
   */
  AddFrame ( _frame ) {

    if ( _frame.duration == null || _frame.duration <= 0 ) {

      _frame.duration = this.frameDuration;
      
    }
  
    this.frames.push( _frame );
  
  }

  /**
   *
   * @param {integer} _frameWidth 
   * @param {integer} _frameHeight 
   * @param {integer} _imageWidth 
   * @param {integer} _imageHeight 
   * @param {integer} _amount 
   * @param {object?} _data 
   * 
   * @return {void}
   */
  GenerateFrames ( _frameWidth, _frameHeight, _imageWidth, _imageHeight, _amount, _data ) {

    let duration;
    const columns = _imageWidth / _imageHeight;

    _data = _data == null ? {} : _data;

    for ( var i = 0; i < _amount; ++i ) {

      duration = _data[ i ];
      this.CreateFrame( 
        ( i % columns ) * _frameWidth,
        ( ( i / columns ) | 0 ) * _frameHeight,
        _frameWidth,
        _frameHeight,
        duration
      );
    
    }
  
  }

  /**
   *
   * @param {integer} _index 
   * 
   * @return {void}
   */
  SetFrame ( _index ) {

    _index = _index == null ? 0 : _index;

    const frame = this.frames[ _index ];

    if ( frame !== undefined ) {

      this.currentFrame = frame;
      this.currentFrameIndex = _index;
      this.currentFrame.Apply( this.sprite, this.dynamicSize );
    
    }
  
  }

  /**
   * 
   * @param {string|any} _id 
   * @param {boolean?}   _returnIndex
   * 
   * @return {Frame|null}
   */
  GetFrameById ( _id, _returnIndex ) {

    const { frames } = this;

    for ( var i = 0; i < frames.length; ++i ) {

      if ( frames[ i ].id === _id ) {
    
        if ( _returnIndex === true ) return i;

        return frames[ i ];
        
      }
      
    }
  
  }

  /**
   * 
   * @param {any} _id
   * 
   * @return {void}
   */
  SetFrameById ( _id ) {

    const index = this.GetFrameById( _id, true );

    this.SetFrame( index );
  
  }

  /**
   *
   * @param {integer?} _index 
   * 
   * @return {void}
   */
  Start ( _index ) {
    
    if ( _index == null ) {

      if ( this.reverse ) {

        _index = this.frames.length - 1;
      
      } else {

        _index = 0;
      
      }
    
    }

    this.SetFrame( _index );
    this.ResetAllFrames();
    this.timer = this.frameDuration;
    this.playing = true;
    this.onStart.Dispatch();
  
  }

  /**
   *
   * @return {void}
   */
  Stop () {

    this.playing = false;
    this.onStop.Dispatch();
  
  }

  /**
   * 
   * @return {void}
   */
  Process () {

    if ( this.playing === true ) {

      if ( this.overrideFrameTimer === true ) {
  
        if ( --this.timer <= 0 ) {
  
          this.timer = this.frameDuration;
          this.NextFrame();
          
        }
        
      } else if ( this.currentFrame.Process() === true ) {
  
        this.NextFrame();
        
      }
      
    }
  
  }

  /**
   * 
   * @return {void}
   */
  NextFrame () {

    let done = false;
    const { frames } = this;
    const fsl = frames.length;

    if ( this.reverse === false ) {

      ++this.currentFrameIndex;
    
    }
    else {

      --this.currentFrameIndex;
    
    }

    if ( this.currentFrameIndex >= fsl ) {

      if ( this.loop === true ) {

        this.currentFrameIndex = 0;
      
      } else {

        this.currentFrameIndex = fsl - 1;
      
      }

      done = true;
        
    } else if ( this.currentFrameIndex < 0 ) {

      if ( this.loop === true ) {

        this.currentFrameIndex = fsl - 1;
      
      } else {

        this.currentFrameIndex = 0;
      
      }

      done = true;
    
    }
    
    this.currentFrame = frames[ this.currentFrameIndex ];
    this.currentFrame.Apply( this.sprite, this.dynamicSize );

    if ( done === true ) {

      this.onEnd.Dispatch();

      if ( this.loop === false ) {

        this.Stop();
      
      }
    
    }
  
  }

  /**
   * 
   * @return {void}
   */
  Clear () {

    this.frames = [];
    this.currentFrame = null;
    this.playing = false;
    this.currentFrameIndex = 0;
    this.timer = this.frameDuration;
  
  }

  /**
   * 
   * @return {void}
   */
  Reset () {

    this.SetFrame( 0 );
    this.ResetAllFrames();
    this.timer = this.frameDuration;
    this.playing = false;
  
  }

  /**
   * 
   * @return {void}
   */
  ResetAllFrames () {

    const { frames } = this;

    for ( var i = 0; i < frames.length; ++i ) {

      frames[ i ].Reset();
      
    }
  
  }

}
