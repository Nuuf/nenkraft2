/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { BatchableContainer2D } from './batchable-container2d';
import { Vector2D } from '../math/vector/vector2d';

export class Graphic2D extends BatchableContainer2D {

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   * @param {Path2D} _path 
   */
  constructor ( _x, _y, _path ) {

    super( _x, _y );
    
    this.anchor = new Vector2D( 0, 0 );
    this.SetPath( _path );
    this.alpha = 1;
  
  }

  /**
   * 
   * @param {CanvasRenderingContext2D} _rc 
   * 
   * @return {void}
   */
  Render ( _rc ) {

    this.PreRender( _rc );

    if ( this.render === true ) {

      this.ProcessTransform( this.parent );

      this.transform.ApplyGlobal( _rc );

      const { path } = this;

      if ( path && path.Render && this.display === true ) {

        _rc.globalAlpha = this.alpha;
        _rc.globalCompositeOperation = this.gco;
        path.Render( _rc );
      
      }

      if ( this.children.length > 0 ) {

        this.RenderChildren( _rc );
      
      }
    
    }

    this.PostRender( _rc );
  
  }

  /**
   * 
   * @param {WebGLRenderingContext|WebGL2RenderingContext} _gl 
   * 
   * @return {void}
   */
  GLRender ( _gl ) {

    this.GLPreRender( _gl );

    if ( this.render === true ) {

      this.ProcessTransform( this.parent );

      const { path } = this;

      if ( path && path.GLRender && this.display === true ) {

        path.GLRender( _gl, this.transform );
      
      }

      if ( this.children.length > 0 && this.display === true ) {

        if ( this.isBatchParent === true ) {

          this.GLBatchRenderChildren( _gl );
        
        } else {

          this.GLRenderChildren( _gl );
        
        }
      
      }
    
    }

    this.GLPostRender( _gl );
  
  }

  /**
   * 
   * @return {number[]}
   */
  GetBufferData () {

    this.UpdateTransform( this.parent );

    const transformData = this.transform.globalTransform.AsArray( true );

    if ( this.bufferData == null ) {

      this.bufferData = [];
    
    }

    const { bufferData } = this;

    bufferData.length = 0;
    /* eslint-disable */
    bufferData[ 0 ] = transformData[ 0 ];
    bufferData[ 1 ] = transformData[ 1 ];
    bufferData[ 2 ] = transformData[ 2 ];
    bufferData[ 3 ] = transformData[ 3 ];
    bufferData[ 4 ] = transformData[ 4 ];
    bufferData[ 5 ] = transformData[ 5 ];
    bufferData[ 6 ] = transformData[ 6 ];
    bufferData[ 7 ] = transformData[ 7 ];
    bufferData[ 8 ] = transformData[ 8 ];
    /* eslint-enable */

    if ( this.path && this.path.GetBufferData ) {

      bufferData.push.apply( bufferData, this.path.GetBufferData() );
    
    }

    return bufferData;
  
  }

  /**
   * 
   * @return {void}
   */
  UpdateInBuffer () {

    this.UpdateTransform( this.parent );

    const transformData = this.transform.globalTransform.AsArray( true );
    const buffer = this.parent.childDataBuffer;
    const index = this.bufferStartIndex;

    /* eslint-disable */
    buffer[ index ] = transformData[ 0 ];
    buffer[ index + 1 ] = transformData[ 1 ];
    buffer[ index + 2 ] = transformData[ 2 ];
    buffer[ index + 3 ] = transformData[ 3 ];
    buffer[ index + 4 ] = transformData[ 4 ];
    buffer[ index + 5 ] = transformData[ 5 ];
    buffer[ index + 6 ] = transformData[ 6 ];
    buffer[ index + 7 ] = transformData[ 7 ];
    buffer[ index + 8 ] = transformData[ 8 ];
    /* eslint-enable */

    if ( this.path && this.path.UpdateInBuffer ) {

      this.path.UpdateInBuffer( buffer, index + 9 );
    
    }
  
  }

  /**
   * 
   * @param {Vector2D|object} _p 
   * 
   * @return {boolean}
   */
  IntersectsPoint2D ( _p ) {

    if ( this.interactive === false ) return false;
    PS_TP.SetV( _p );
    PS_TP.SubtractV( this.position );

    return this.path.shape.IntersectsPoint2D( PS_TP );
  
  }

  /**
   * 
   * @param {Path2D} _path 
   * 
   * @return {void}
   */
  SetPath ( _path ) {

    const { shape } = _path;

    if ( shape !== undefined ) {

      if ( shape.w !== undefined && shape.h !== undefined ) {

        this.w = shape.w;
        this.h = shape.h;
      
      }
      else if ( shape.GetLength !== undefined ) this.w = this.h = shape.GetLength();
      else if ( shape.diameter !== undefined ) this.w = this.h = shape.diameter;
      else if ( shape.aabb !== undefined ) {

        this.w = shape.aabb.w;
        this.h = shape.aabb.h;
      
      }

      this.path = _path;
    
    }
  
  }

}

// Private Static ----->
const PS_TP = new Vector2D( 0, 0 );
// <----- Private Static
