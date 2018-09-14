/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { CoreEntity2D } from './core-entity2d';
import { IsArray } from '../utilities';

const Abs = Math.abs;

export class Container2D extends CoreEntity2D {

  constructor ( _x, _y ) {

    super( _x, _y );
    this.children = [];
    this.render = true;
    this.display = true;
    this.transformShouldUpdate = true;
    this.transformAutomaticUpdate = true;
    //
    this.isBatchParent = false;
    this.childDataBuffer = null;
    this.bufferData = null;
    this.programController = null;
    this.bufferStartIndex = 0;
    this.bufferEndIndex = 0;

  }

  PreDraw () {

    return;
  
  }

  GLPreDraw () {

    return;
  
  }

  Draw ( _rc ) {

    this.PreDraw( _rc );

    if ( this.render === true ) {

      if ( this.transformShouldUpdate === true ) {

        this.UpdateTransform();
        if ( this.transformAutomaticUpdate === false ) this.transformShouldUpdate = false;
      
      }

      if ( this.children.length > 0 && this.display === true ) {

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

      if ( this.children.length > 0 && this.display === true ) {

        if ( this.isBatchParent === true ) {

          this.GLBatchDrawChildren();
        
        } else {

          this.GLDrawChildren( _gl );
        
        }
      
      }
    
    }
  
  }

  RequestTransformUpdate () {

    this.transformShouldUpdate = true;
  
  }

  DrawChildren ( _rc ) {

    let i = 0;
    const children = this.children;
    const l = children.length;

    for ( ; i < l; ++i ) {

      children[i].Draw( _rc );
    
    }
  
  }

  GLDrawChildren ( _gl ) {

    let i = 0;
    const children = this.children;
    const l = children.length;

    for ( ; i < l; ++i ) {

      children[i].GLDraw( _gl );
    
    }
  
  }

  GLBatchDrawChildren () {

    if ( this.childDataBuffer != null && this.programController != null ) {

      this.programController.Execute( this.childDataBuffer, this.children.length );
    
    }
  
  }

  ComputeBatchBuffer ( _getBufferData ) {

    let i = 0;
    let child;
    let childData;
    const children = this.children;
    const l = children.length;
    var childDataBuffer = [];

    for ( ; i < l; ++i ) {

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

  AddChild ( _child ) {

    const parent = _child.parent;

    if ( parent !== null ) {

      parent.RemoveChild( _child );
    
    }

    this.children.push( _child );
    _child.parent = this;
    return _child;
  
  }

  AddChildren () {

    let i = 0;
    let children = arguments;

    if ( IsArray( children[ 0 ] ) ) {

      children = children[ 0 ];
    
    }

    const l = children.length;

    for ( ; i < l; ++i ) {

      this.AddChild( children[ i ] );
    
    }
  
  }

  AddSibling ( _sibling ) {

    const parent = this.parent;

    if ( parent !== null ) {

      parent.AddChild( _sibling );
    
    }

    return _sibling;
  
  }

  RemoveChild ( _child ) {

    const children = this.children;
    const index = children.indexOf( _child );

    if ( index !== -1 ) {

      _child.parent = null;
      return children.fickleSplice( index );
    
    }
  
  }

  RemoveChildren () {

    let i = 0;
    let aChildren = arguments;
    let child;
    let index;

    if ( IsArray( children[ 0 ] ) ) {

      children = children[ 0 ];
    
    }

    const children = this.children;
    const rChildren = [];
    const l = aChildren.length;

    for ( ; i < l; ++i ) {

      child = aChildren[ i ];
      index = children.indexOf( child );

      if ( index !== -1 ) {

        rChildren.push( children.fickleSplice( index ) );
        child.parent = null;
      
      }
    
    }

    return rChildren;
  
  }

  Swap ( _index ) {

    if ( this.parent !== null ) {

      const pChildren = this.parent.children;
      const index = pChildren.indexOf( this );

      if ( index !== -1 ) {

        if ( _index === -1 ) {

          _index = pChildren.length - 1;

        }

        const sibling = pChildren[_index];

        pChildren[_index] = this;
        pChildren[index] = sibling; 

      }

    }
  
  }

  SendToFront () {

    this.Swap( -1 );
  
  }

  SendToBack () {

    this.Swap( 0 );
  
  }

  Dump () {

    let i = 0;
    const children = this.children;
    const l = children.length;

    for ( ; i < l; ++i ) {

      children[i].parent = null;

    }

    children.length = 0;
  
  }

  Destroy () {

    this.Dump();
    if ( this.parent !== null ) this.parent.RemoveChild( this );
  
  }

  AttachTo ( _parent ) {

    _parent.AddChild( this );
  
  }

  Detach () {

    if ( this.parent !== null ) return this.parent.RemoveChild( this );
    return null;
  
  }

  GetChildClosestTo ( _object, _filter ) {

    let i = 0;
    let child;
    let distance = Infinity;
    let tempDistance;
    let closestChild;
    const children = this.children;
    const l = children.length;

    if ( children.length !== 0 ) {

      for ( ; i < l; ++i ) {

        child = children[ i ];

        if ( _filter !== undefined ) {

          if ( _filter( child ) === false ) continue;
        
        }

        tempDistance = Abs( child.position.GetDistanceSquared( _object.x, _object.y ) );

        if ( tempDistance < distance ) {

          distance = tempDistance;
          closestChild = child;
        
        }
      
      }

      return closestChild;
    
    }

    return null;
  
  }

  GetChildFurthestFrom ( _object, _filter ) {

    let i = 0;
    let child;
    let distance = 0;
    let tempDistance;
    let closestChild;
    const children = this.children;
    const l = children.length;

    if ( children.length !== 0 ) {

      for ( ; i < l; ++i ) {

        child = children[ i ];

        if ( _filter !== undefined ) {

          if ( _filter( child ) === false ) continue;
        
        }

        tempDistance = Abs( child.position.GetDistanceSquared( _object.x, _object.y ) );

        if ( tempDistance > distance ) {

          distance = tempDistance;
          closestChild = child;
        
        }
      
      }

      return closestChild;
    
    }

    return null;
  
  }

  UseAsBatchParent ( _pc ) {

    this.isBatchParent = true;
    this.programController = _pc;
  
  }

}

// Alias
Container2D.prototype.Mount = Container2D.prototype.AddChildren;

// Private Static ----->
const PS_ACCESS_BUFFER_ERROR_MSG = 'Cannot access buffer data directly on Container2D!';
// <----- Private static
