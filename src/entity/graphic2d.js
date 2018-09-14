/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Container2D } from './container2d';
import { Vector2D } from '../math/vector/vector2d';
import { DEFAULT } from '../style/gco';

export class Graphic2D extends Container2D {

  constructor ( _x, _y, _path ) {

    super( _x, _y );
    this.anchor = new Vector2D( 0, 0 );
    this.SetPath( _path );
    this.alpha = 1.0;
    this.gco = DEFAULT;
    this.interactive = true;
  
  }

  Draw ( _rc ) {

    this.PreDraw( _rc );

    if ( this.render === true ) {

      if ( this.transformShouldUpdate === true ) {

        this.UpdateTransform();
        if ( this.transformAutomaticUpdate === false ) this.transformShouldUpdate = false;
      
      }

      this.transform.ApplyGlobal( _rc );

      const path = this.path;

      if ( path && path.Draw && this.display === true ) {

        _rc.globalAlpha = this.alpha;
        _rc.globalCompositeOperation = this.gco;
        path.Draw( _rc );
      
      }

      if ( this.children.length > 0 ) {

        this.DrawChildren( _rc );
      
      }
    
    }
  
  }

  GLDraw ( _gl ) {

    this.GLPreDraw( _gl );

    if ( this.render === true ) {

      if ( this.transformShouldUpdate === true ) {

        this.UpdateTransform();
        if ( this.transformAutomaticUpdate === false ) this.transformShouldUpdate = false;
      
      }

      const path = this.path;

      if ( path && path.GLDraw && this.display === true ) {

        path.GLDraw( _gl, this.transform );
      
      }

      if ( this.children.length > 0 && this.display === true ) {

        if ( this.isBatchParent === true ) {

          this.GLBatchDrawChildren( _gl );
        
        } else {

          this.GLDrawChildren( _gl );
        
        }
      
      }
    
    }
  
  }

  GetBufferData () {

    this.UpdateTransform();

    const transformData = this.transform.globalTransform.AsArray( true );

    if ( this.bufferData == null ) {

      this.bufferData = [];
    
    }

    const bufferData = this.bufferData;

    bufferData.length = 0;
    bufferData[ 0 ] = transformData[ 0 ];
    bufferData[ 1 ] = transformData[ 1 ];
    bufferData[ 2 ] = transformData[ 2 ];
    bufferData[ 3 ] = transformData[ 3 ];
    bufferData[ 4 ] = transformData[ 4 ];
    bufferData[ 5 ] = transformData[ 5 ];
    bufferData[ 6 ] = transformData[ 6 ];
    bufferData[ 7 ] = transformData[ 7 ];
    bufferData[ 8 ] = transformData[ 8 ];

    if ( this.path && this.path.GetBufferData ) {

      bufferData.push.apply( bufferData, this.path.GetBufferData() );
    
    }

    return bufferData;
  
  }

  UpdateInBuffer () {

    this.UpdateTransform();

    const transformData = this.transform.globalTransform.AsArray( true );
    const buffer = this.parent.childDataBuffer;
    const index = this.bufferStartIndex;

    buffer[ index ] = transformData[ 0 ];
    buffer[ index + 1 ] = transformData[ 1 ];
    buffer[ index + 2 ] = transformData[ 2 ];
    buffer[ index + 3 ] = transformData[ 3 ];
    buffer[ index + 4 ] = transformData[ 4 ];
    buffer[ index + 5 ] = transformData[ 5 ];
    buffer[ index + 6 ] = transformData[ 6 ];
    buffer[ index + 7 ] = transformData[ 7 ];
    buffer[ index + 8 ] = transformData[ 8 ];

    if ( this.path && this.path.UpdateInBuffer ) {

      this.path.UpdateInBuffer( buffer, index + 9 );
    
    }
  
  }

  IntersectsPoint ( _p ) {

    if ( this.interactive === false ) return false;
    PS_TP.SetV( _p );
    PS_TP.SubtractV( this.position );
    return this.path.IntersectsPoint( PS_TP );
  
  }

  SetPath ( _path ) {

    if ( _path !== undefined ) {

      if ( _path.w !== undefined && _path.h !== undefined ) {

        this.w = _path.w;
        this.h = _path.h;
      
      }
      else if ( _path.GetLength !== undefined ) this.w = this.h = _path.GetLength();
      else if ( _path.diameter !== undefined ) this.w = this.h = _path.diameter;
      else if ( _path.aabb !== undefined ) {

        this.w = _path.aabb.w;
        this.h = _path.aabb.h;
      
      }

      this.path = _path;
    
    }
  
  }

}

// Private Static ----->
const PS_TP = new Vector2D( 0, 0 );
// <----- Private static
