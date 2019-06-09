/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { VisualContainer2D } from './visual-container2d';

export class BatchableContainer2D extends VisualContainer2D {

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   */
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

  /**
   * 
   * @return {void}
   */
  GLBatchRenderChildren () {

    if ( this.childDataBuffer != null && this.programController != null ) {

      this.programController.Execute( this.childDataBuffer, this.children.length );
    
    }
  
  }

  /**
   * 
   * @param {Function?} _getBufferData 
   * 
   * @return {void}
   */
  ComputeBatchBuffer ( _getBufferData ) {

    let child;
    let childData;
    const { children } = this;
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

  /**
   * 
   * @return {void}
   */
  UpdateInBuffer () {

    throw new Error( PS_ACCESS_BUFFER_ERROR_MSG );
  
  }

  /**
   * 
   * @return {void}
   */
  GetBufferData () {

    throw new Error( PS_ACCESS_BUFFER_ERROR_MSG );
  
  }

  /**
   * 
   * @param {ProgramController} _pc 
   * 
   * @return {void}
   */
  UseAsBatchParent ( _pc ) {

    this.isBatchParent = true;
    this.programController = _pc;
  
  }

}

// Private Static ----->
const PS_ACCESS_BUFFER_ERROR_MSG = 'Cannot access buffer data directly!';
// <----- Private Static
