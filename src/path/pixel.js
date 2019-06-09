/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../math/vector/vector2d';
import { P } from '../style';
import { Color } from '../utility/color';

export class Pixel {

  constructor ( _x, _y, _style ) {

    this.shape = new Vector2D( _x, _y );
    this.style = P( _style );
    this.color = new Color();
    this.programController = null;
    this.bufferData = null;
  
  }

  /**
   * 
   * @param {WebGLRenderingContext|WebGL2RenderingContext} _gl 
   * @param {Transform2D}                                  _transform2d 
   * 
   * @return {void}
   */
  GLRender ( _gl, _transform ) {

    if ( this.programController !== null ) {

      this.programController.Execute(
        _transform.worldTransform.AsArray( true ),
        this.shape.x, this.shape.y
      );
    
    }
  
  }

  /**
   *
   * @param {ProgramController} _pc 
   *
   * @return {this}
   */
  LinkProgramController ( _pc ) {

    this.programController = _pc;
    this.LinkStyle();

    return this;
  
  }

  /**
   * 
   * @param {ProgramController} _pc 
   * 
   * @return {this}
   */
  UseProgramController ( _pc ) {

    this.programController = _pc;

    return this;
  
  }

  /**
   *
   * @return {this}
   */
  LinkStyle () {

    const pc = this.programController;

    if ( pc !== null && pc.color !== null ) {

      pc.color.SetHex( this.style.pixel.color );
      pc.color.Normalize();
    
    }

    return this;
  
  }

  /**
   * 
   * @return {number[]}
   */
  GetBufferData () {

    if ( this.bufferData == null ) {

      this.bufferData = [];
    
    }

    const { bufferData } = this;
    const { color } = this;

    bufferData[ 0 ] = this.shape.x;
    bufferData[ 1 ] = this.shape.y;
    bufferData[ 2 ] = color.r;
    bufferData[ 3 ] = color.g;
    bufferData[ 4 ] = color.b;
    bufferData[ 5 ] = color.a;
    bufferData[ 6 ] = this.style.pixel.size;

    return bufferData;
  
  }

  /**
   * 
   * @param {Float32Array} _buffer 
   * @param {integer}      _index 
   * 
   * @return {void}
   */
  UpdateInBuffer ( _buffer, _index ) {

    const { color } = this;

    _buffer[ _index ] = this.shape.x;
    _buffer[ _index + 1 ] = this.shape.y;
    _buffer[ _index + 2 ] = color.r;
    _buffer[ _index + 3 ] = color.g;
    _buffer[ _index + 4 ] = color.b;
    _buffer[ _index + 5 ] = color.a;
    _buffer[ _index + 6 ] = this.style.pixel.size;
  
  }

  /**
   * 
   * @param {Vector2D} _shape 
   */
  SetShape ( _shape ) {

    this.shape = _shape;

    return this;

  }

}
