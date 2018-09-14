/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Container2D } from './container2d';
import { Vector2D } from '../math/vector/vector2d';
import { Event } from '../event/event';
import { Ticker } from '../time/ticker/ticker';
import { DEFAULT } from '../style/gco';
import { Keyboard, Mouse, Touch } from '../input';

export class Stage2D extends Container2D {

  constructor ( _options ) {

    super( _options.x, _options.y );

    if ( typeof _options.canvas === 'string' ) {

      _options.canvas = document.getElementById( _options.canvas );
    
    }

    this.canvas = _options.canvas;
    this.w = _options.canvas.width;
    this.h = _options.canvas.height;
    this.id = null;
    this.backgroundColor = 'rgba(10,20,30,1)';
    this.clear = true;
    this.fill = true;
    this.usingWebGL = false;
    this.positionReconfiguration = new Vector2D( _options.x, _options.y );
    this.canvasManager = null;
    this.mouse = null;
    this.touch = null;

    if ( _options.mode === 'WebGL' ) {

      this.gl = _options.canvas.getContext( 'webgl', {
        antialias: _options.antialias,
        preserveDrawingBuffer: true
      } );

      if ( this.gl == null ) {

        this.gl = _options.canvas.getContext( 'experimental-webgl' );
      
      }

      if ( this.gl == null ) {

        throw new Error( 'WebGL is not supported!' );
      
      }

      this.gl.clearColor(
        0.0392156862745098,
        0.0784313725490196,
        0.11764705882352941,
        1.0
      );
      this.usingWebGL = true;

      if ( _options.noTicker !== true ) {

        this.ticker = new Ticker( this.GLProcess.bind( this ), 60, _options.halt );
      
      }

      this.GLConfig( this.gl );
    
    } else {

      this.rc = _options.canvas.getContext( '2d' );

      if ( _options.noTicker !== true ) {

        this.ticker = new Ticker( this.Process.bind( this ), 60, _options.halt );
      
      }
    
    }

    if ( _options.backgroundColor != null ) {

      this.backgroundColor = _options.backgroundColor;
    
    }

    if ( _options.clear === false ) {

      this.clear = false;
    
    }

    if ( _options.fill === false ) {

      this.fill = false;
    
    }

    if ( _options.id != null ) {

      this.id = _options.id;
    
    }

    this.onProcess = new Event();

    if ( _options.noMouse !== true ) {

      this.mouse = new Mouse( _options.canvas, _options.x, _options.y );
    
    }

    if ( _options.noKeyboard !== true ) {

      this.keyboard = new Keyboard( _options.canvas );
    
    }

    if ( _options.noTouch !== true ) {

      this.touch = new Touch( _options.canvas, _options.x, _options.y );

    }

  }

  PreDraw ( _rc ) {

    _rc.setTransform( 1, 0, 0, 1, 0, 0 );
    _rc.globalAlpha = 1.0;
    _rc.globalCompositeOperation = DEFAULT;

    if ( this.fill === true ) {

      _rc.fillStyle = this.backgroundColor;
      _rc.fillRect( 0, 0, this.w, this.h );
    
    }
    else if ( this.clear === true ) {

      _rc.clearRect( 0, 0, this.w, this.h );
    
    }
  
  }

  GLConfig ( _gl ) {

    if ( _gl == null ) _gl = this.gl;

    this.position.Set( 0, 0 );
    this.scale.Set( 2 / this.w, -2 / this.h );
    this.position.Add( -1, 1 );
    this.position.Add( 
      this.positionReconfiguration.x * this.scale.x, 
      this.positionReconfiguration.y * this.scale.y
    );
    this.UpdateTransform();
    _gl.viewport( 0, 0, this.w, this.h );
    _gl.enable( _gl.BLEND );
    _gl.disable( _gl.DEPTH_TEST );
    _gl.blendFunc( _gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA );
  
  }

  GLPreDraw ( _gl ) {

    if ( this.clear === true ) {

      _gl.clear( _gl.COLOR_BUFFER_BIT );
      
    }
  
  }

  GLPostDraw ( _gl ) {

    _gl.flush();
  
  }

  Process ( _delta ) {

    this.Draw( this.rc );
    this.onProcess.Dispatch( this, _delta );
  
  }

  GLProcess ( _delta ) {

    this.GLDraw( this.gl );
    this.GLPostDraw( this.gl );
    this.onProcess.Dispatch( this, _delta );
  
  }

  MixedProcess ( _delta ) {
      
    if ( this.usingWebGL === true ) {

      this.GLDraw( this.gl );
      this.GLPostDraw( this.gl );
      
    } else {
  
      this.Draw( this.rc );
      
    }
  
    this.onProcess.Dispatch( this, _delta );
  
  }

}
