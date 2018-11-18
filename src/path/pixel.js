/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../math/vector/vector2d';
import { P } from '../style';
import { Color } from '../utility/color';

export class Pixel extends Vector2D {

  constructor ( _x, _y, _style ) {

    super( _x, _y );
    
    this.style = P( _style );
    this.color = new Color();
    this.programController = null;
    this.bufferData = null;
  
  }
  GLRender ( _gl, _transform ) {

    if ( this.programController !== null ) {

      this.programController.Execute(
        _transform.worldTransform.AsArray( true ),
        this.x, this.y
      );
    
    }
  
  }
  LinkProgramController ( _pc ) {

    this.programController = _pc;
    this.LinkStyle();
  
  }
  UseProgramController ( _pc ) {

    this.programController = _pc;
  
  }
  LinkStyle () {

    const pc = this.programController;

    if ( pc !== null && pc.color !== null ) {

      pc.color.SetHex( this.style.pixel.color );
      pc.color.Normalize();
    
    }
  
  }
  GetBufferData () {

    if ( this.bufferData == null ) {

      this.bufferData = [];
    
    }

    const bufferData = this.bufferData;
    const color = this.color;

    bufferData[ 0 ] = this.x;
    bufferData[ 1 ] = this.y;
    bufferData[ 2 ] = color.r;
    bufferData[ 3 ] = color.g;
    bufferData[ 4 ] = color.b;
    bufferData[ 5 ] = color.a;
    bufferData[ 6 ] = this.style.pixel.size;

    return bufferData;
  
  }
  UpdateInBuffer ( _buffer, _index ) {

    const color = this.color;

    _buffer[ _index ] = this.x;
    _buffer[ _index + 1 ] = this.y;
    _buffer[ _index + 2 ] = color.r;
    _buffer[ _index + 3 ] = color.g;
    _buffer[ _index + 4 ] = color.b;
    _buffer[ _index + 5 ] = color.a;
    _buffer[ _index + 6 ] = this.style.pixel.size;
  
  }

}
