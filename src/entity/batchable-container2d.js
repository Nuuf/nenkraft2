/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { VisualContainer2D } from './visual-container2d';

export class BatchableContainer2D extends VisualContainer2D {

  constructor ( _x, _y ) {

    super( _x, _y );
    //
    this.isBatchParent = false;
    this.childDataBuffer = null;
    this.bufferData = null;
    this.programController = null;
    this.bufferStartIndex = 0;
    this.bufferEndIndex = 0;

  }

  Render ( _rc ) {

    this.PreRender( _rc );

    if ( this.render === true ) {

      this.ProcessTransform( this.parent );

      if ( this.children.length > 0 && this.display === true ) {

        this.RenderChildren( _rc );
      
      }
    
    }

    this.PostRender( _rc );
  
  }

  GLRender ( _gl ) {

    this.GLPreRender( _gl );

    if ( this.render === true ) {

      this.ProcessTransform( this.parent );

      if ( this.children.length > 0 && this.display === true ) {

        if ( this.isBatchParent === true ) {

          this.GLBatchRenderChildren();
        
        } else {

          this.GLRenderChildren( _gl );
        
        }
      
      }
    
    }

    this.GLPostRender( _gl );
  
  }

  GLBatchRenderChildren () {

    if ( this.childDataBuffer != null && this.programController != null ) {

      this.programController.Execute( this.childDataBuffer, this.children.length );
    
    }
  
  }

  ComputeBatchBuffer ( _getBufferData ) {

    let child;
    let childData;
    const children = this.children;
    const childDataBuffer = [];

    for ( var i = 0; i < children.length; ++i ) {

      child = children[ i ];

      if ( _getBufferData != null ) {

        childData = _getBufferData( child );
      
      } else {

        childData = child.GetBufferData();
      
      }

      child.bufferStartIndex = childDataBuffer.length;
      child.bufferEndIndex = childDataBuffer.length + childData.length;
      childDataBuffer.push.apply( childDataBuffer, childData );
    
    }

    this.childDataBuffer = new Float32Array( childDataBuffer );
  
  }

  UpdateInBuffer () {

    throw new Error( PS_ACCESS_BUFFER_ERROR_MSG );
  
  }

  GetBufferData () {

    throw new Error( PS_ACCESS_BUFFER_ERROR_MSG );
  
  }

  UseAsBatchParent ( _pc ) {

    this.isBatchParent = true;
    this.programController = _pc;
  
  }

}

// Private Static ----->
const PS_ACCESS_BUFFER_ERROR_MSG = 'Cannot access buffer data directly!';
// <----- Private Static
