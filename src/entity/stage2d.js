/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { VisualContainer2D } from './visual-container2d';
import { Dispatcher } from '../event/dispatcher';
import { Ticker } from '../time/ticker/ticker';
import { DEFAULT } from '../style/gco';
import { Keyboard, Mouse, Touch } from '../input';

export class Stage2D extends VisualContainer2D {

  constructor ( _options ) {

    super( 0, 0 );

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
    this.canvasManager = null;
    this.mouse = null;
    this.touch = null;
    this.ticker = null;

    if ( _options.mode != null && ( _options.mode.toLowerCase() === 'webgl2' || _options.mode.toLowerCase() === 'webgl' ) ) {

      this.gl = _options.canvas.getContext( _options.mode.toLowerCase(), {
        antialias: _options.antialias,
        powerPreference: _options.powerPreference,
        preserveDrawingBuffer: true
      } );

      if ( this.gl != null ) {

        console.log( '%cWebGL!', 'color:#f0f7da;background-color:#304860;font-family:Arial;font-size:18px;font-weight:900;padding:5px;' );
      
      } else {

        this.gl = _options.canvas.getContext( 'experimental-webgl' );

        if ( this.gl != null ) {

          console.warn( 'Experimental WebGL!' );
        
        }
      
      }

      if ( this.gl == null ) {

        throw new Error( 'WebGL is not supported!' );
      
      }

      this.gl.clearColor(
        0.0392156862745098,
        0.0784313725490196,
        0.11764705882352941,
        1
      );
      this.usingWebGL = true;

      if ( _options.noTicker !== true ) {

        this.ticker = new Ticker( this.GLProcess.bind( this ), 60, _options.halt );
      
      }

      this.GLConfig( this.gl );
    
    } else {

      this.rc = _options.canvas.getContext( '2d' );

      console.log( '%cCanvas 2D!', 'color:#f0f7da;background-color:#304860;font-family:Arial;font-size:18px;font-weight:900;padding:5px;' );

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

    this.onProcess = new Dispatcher();

    if ( _options.noMouse !== true ) {

      this.mouse = new Mouse( _options.canvas, 0, 0 );
    
    }

    if ( _options.noKeyboard !== true ) {

      this.keyboard = new Keyboard( _options.canvas );
    
    }

    if ( _options.noTouch !== true ) {

      this.touch = new Touch( _options.canvas, 0, 0 );

    }

  }

  PreRender ( _rc ) {

    _rc.setTransform( 1, 0, 0, 1, 0, 0 );
    _rc.globalAlpha = 1;
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

    this.position.Set( -1, 1 );
    this.scale.Set( 2 / this.w, -2 / this.h );
    this.UpdateTransform();
    _gl.viewport( 0, 0, this.w, this.h );
    _gl.enable( _gl.BLEND );
    _gl.disable( _gl.DEPTH_TEST );
    _gl.blendFunc( _gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA );
  
  }

  GLPreRender ( _gl ) {

    if ( this.clear === true ) {

      _gl.clear( _gl.COLOR_BUFFER_BIT );
      
    }
  
  }

  GLPostRender ( /* _gl*/ ) {

    // _gl.flush();
  
  }

  Process ( _delta ) {

    this.Render( this.rc );
    this.onProcess.Dispatch( this, _delta );
  
  }

  GLProcess ( _delta ) {

    this.GLRender( this.gl );
    this.onProcess.Dispatch( this, _delta );
  
  }

  MixedProcess ( _delta ) {
      
    if ( this.usingWebGL === true ) {

      this.GLRender( this.gl );
      
    } else {
  
      this.Render( this.rc );
      
    }
  
    this.onProcess.Dispatch( this, _delta );
  
  }

  SetFramebuffer ( _gl, _buffer ) {

    if ( _gl == null ) _gl = this.gl;

    if ( _buffer == null ) {

      _gl.viewport( 0, 0, this.w, this.h );
      _gl.bindFramebuffer( _gl.FRAMEBUFFER, null );

    } else {

      _gl.viewport( 0, 0, _buffer.w, _buffer.h );
      _gl.bindFramebuffer( _gl.FRAMEBUFFER, _buffer.frameBuffer );
      _gl.clear( _gl.COLOR_BUFFER_BIT );

    }
  
  }

  Destroy () {

    this.Dump();
    if ( this.keyboard !== null ) this.keyboard.Destroy();
    if ( this.mouse !== null ) this.mouse.Destroy();
    if ( this.touch !== null ) this.touch.Destroy();
    if ( this.ticker !== null ) this.ticker.Stop();
  
  }

}
