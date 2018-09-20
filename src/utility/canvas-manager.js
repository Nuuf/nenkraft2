/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { SimplifyAspectRatio } from '../math';
import { Event } from '../event/event';

export class CanvasManager {

  constructor ( _canvas, _w, _h, _mode ) {

    this.canvas = _canvas;
    this.w = _w;
    this.h = _h;
    this.aspectRatio = SimplifyAspectRatio( _w, _h );
    this.onChange = new Event();
    this.mode = _mode;
    this.stage = null;
    this.rootContainer = null;
    this.currentWidth = 0;
    this.currentHeight = 0;

    _canvas.setAttribute( 'width', _w );
    _canvas.setAttribute( 'height', _h );

    this.___bound___OnWindowRsize = this.OnWindowResize.bind( this );
    window.addEventListener( 'resize', this.___bound___OnWindowRsize );
  
  }

  static get FILL_SCREEN () {

    return PS_FILL_SCREEN;
  
  }

  static get KEEP_ASPECT_RATIO () {

    return PS_KEEP_ASPECT_RATIO;
  
  }

  static get KEEP_ASPECT_RATIO_MIN () {

    return PS_KEEP_ASPECT_RATIO_MIN;
  
  }

  static get KEEP_ASPECT_RATIO_MAX () {

    return PS_KEEP_ASPECT_RATIO_MAX;
  
  }

  static get KEEP_ASPECT_RATIO_FIT () {

    return PS_KEEP_ASPECT_RATIO_FIT;
  
  }

  OnWindowResize () {

    this[this.mode]();
  
  }

  Trigger () {

    this.OnWindowResize();

    return this;
  
  }

  Reconfigure ( _w, _h, _mode ) {

    this.w = _w;
    this.h = _h;
    this.mode = _mode;

    return this;
  
  }

  BindStage ( _stage ) {

    this.stage = _stage;

    return this;
  
  }

  BindRootContainer ( _container ) {

    this.rootContainer = _container;

    return this;
  
  }

  SetCurrent ( _w, _h ) {

    this.canvas.setAttribute( 'width', _w );
    this.canvas.setAttribute( 'height', _h );

    this.currentWidth = _w;
    this.currentHeight = _h;

    if ( this.stage !== null ) {

      this.stage.w = _w;
      this.stage.h = _h;

      if ( this.stage.mouse ) {

        this.stage.mouse.scale.Set(
          _w / this.w,
          _h / this.h
        );
      
      } 

      if ( this.stage.touch ) {

        this.stage.touch.scale.Set(
          _w / this.w,
          _h / this.h
        );
      
      }

      if ( this.stage.usingWebGL === true ) {
        
        this.stage.GLConfig();

      }
    
    }

    if ( this.rootContainer !== null ) {
      
      this.rootContainer.scale.Set(
        _w / this.w,
        _h / this.h
      );

    } 
  
  }

  FillScreen () {

    this.SetCurrent( window.innerWidth, window.innerHeight );
  
  }

  KeepAspectRatio () {

    const w = window.innerWidth;
    const h = w / this.aspectRatio[0] * this.aspectRatio[1];

    this.SetCurrent( w, h );
  
  }

  KeepAspectRatioMIN () {

    let h;
    let w = window.innerWidth; 

    if ( w <= this.w ) {

      w = this.w;
      
    }

    h = w / this.aspectRatio[0] * this.aspectRatio[1];

    this.SetCurrent( w, h );
  
  }

  KeepAspectRatioMAX () {

    let h;
    let w = window.innerWidth;

    if ( w >= this.w ) {

      w = this.w;
      
    }

    h = w / this.aspectRatio[0] * this.aspectRatio[1];
      
    this.SetCurrent( w, h );
  
  }

  KeepAspectRatioFIT () {

    let w = window.innerWidth;
    let h = w / this.aspectRatio[0] * this.aspectRatio[1];

    if ( h >= window.innerHeight ) {

      h = window.innerHeight;
      w = h / this.aspectRatio[1] * this.aspectRatio[0];
    
    }

    this.SetCurrent( w, h );
  
  }

  Destroy () {

    window.removeEventListener( 'resize', this.___bound___OnWindowRsize );
  
  }

}

// Private Static ----->
const PS_FILL_SCREEN = 'FillScreen';
const PS_KEEP_ASPECT_RATIO = 'KeepAspectRatio';
const PS_KEEP_ASPECT_RATIO_MIN = 'KeepAspectRatioMIN';
const PS_KEEP_ASPECT_RATIO_MAX = 'KeepAspectRatioMAX';
const PS_KEEP_ASPECT_RATIO_FIT = 'KeepAspectRatioFIT';
// <----- Private static
