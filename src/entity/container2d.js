/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { CoreEntity2D } from './core-entity2d';
import { IsArray } from '../utility';
import { AABB2D } from '../geom/aabb/aabb2d';

const Abs = Math.abs;
const Min = Math.min;
const Max = Math.max;

export class Container2D extends CoreEntity2D {

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   */
  constructor ( _x, _y ) {

    super( _x, _y );
    
    this.parent = null;
    this.children = [];
  
  }

  /**
   * 
   * @return {void}
   */
  Render () {

    if ( this.render === true ) {

      this.ProcessTransform( this.parent );

      if ( this.children.length > 0 ) {

        this.RenderChildren();
      
      }
    
    }
  
  }

  /**
   * 
   * @return {void}
   */
  RenderChildren () {

    const children = this.children;

    for ( var i = 0 ; i < children.length; ++i ) {

      children[ i ].Render();
    
    }
  
  }

  /**
   * 
   * @param {Entity} _child 
   * 
   * @return {Entity}
   */
  AddChild ( _child ) {

    const parent = _child.parent;

    if ( parent != null ) {

      parent.RemoveChild( _child );
    
    }

    this.children.push( _child );
    _child.parent = this;

    return _child;
  
  }

  /**
   * 
   * @return {this}
   */
  AddChildren () {

    let children = arguments;

    if ( IsArray( children[ 0 ] ) ) {

      children = children[ 0 ];
    
    }

    for ( var i = 0 ; i < children.length; ++i ) {

      this.AddChild( children[ i ] );
    
    }

    return this;
  
  }

  /**
   * 
   * @param {Entity} _sibling 
   * 
   * @return {Entity}
   */
  AddSibling ( _sibling ) {

    const parent = this.parent;

    if ( parent != null ) {

      parent.AddChild( _sibling );
    
    }

    return _sibling;
  
  }

  /**
   * 
   * @param {Entity} _child 
   * 
   * @return {Entity}
   */
  RemoveChild ( _child ) {

    const children = this.children;
    const index = children.indexOf( _child );

    if ( index !== -1 ) {

      _child.parent = null;

      return children.fickleSplice( index );
    
    }
  
  }

  /**
   * 
   * @return {Entity[]}
   */
  RemoveChildren () {

    let aChildren = arguments;
    let child;
    let index;

    if ( IsArray( children[ 0 ] ) ) {

      children = children[ 0 ];
    
    }

    const children = this.children;
    const rChildren = [];

    for ( var i = 0; i < aChildren.length; ++i ) {

      child = aChildren[ i ];
      index = children.indexOf( child );

      if ( index !== -1 ) {

        rChildren.push( children.fickleSplice( index ) );
        child.parent = null;
      
      }
    
    }

    return rChildren;
  
  }

  /**
   * 
   * @param {integer} _withIndex 
   * 
   * @return {this}
   */
  Swap ( _withIndex ) {

    if ( this.parent != null ) {

      const pChildren = this.parent.children;
      const index = pChildren.indexOf( this );

      if ( index !== -1 ) {

        if ( _withIndex === -1 ) {

          _withIndex = pChildren.length - 1;

        }

        const sibling = pChildren[ _withIndex ];

        pChildren[ _withIndex ] = this;
        pChildren[ index ] = sibling; 

      }

    }

    return this;
  
  }

  /**
   * 
   * @return {this}
   */
  SendToFront () {

    this.Swap( -1 );

    return this;
  
  }

  /**
   * 
   * @return {this}
   */
  SendToBack () {

    this.Swap( 0 );

    return this;
  
  }

  /**
   * 
   * @return {this}
   */
  Dump () {

    const children = this.children;

    for ( var i = 0; i < children.length; ++i ) {

      children[ i ].parent = null;

    }

    children.length = 0;

    return this;
  
  }

  /**
   * 
   * @return {this}
   */
  Destroy () {

    this.Dump();
    if ( this.parent != null ) this.parent.RemoveChild( this );

    return this;
  
  }

  /**
   * 
   * @param {Container2D} _parent 
   * 
   * @return {this}
   */
  AttachTo ( _parent ) {

    _parent.AddChild( this );

    return this;
  
  }

  /**
   * 
   * @return {Entity|null}
   */
  Detach () {

    if ( this.parent != null ) return this.parent.RemoveChild( this );

    return null;
  
  }

  /**
   * 
   * @param {Entity|Vector2D|Object} _object 
   * @param {Function?}             _filter 
   * 
   * @return {Entity|null}
   */
  GetChildClosestTo ( _object, _filter ) {

    let child;
    let distance = Infinity;
    let tempDistance;
    let closestChild;
    const children = this.children;

    if ( children.length !== 0 ) {

      for ( var i = 0; i < children.length; ++i ) {

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

  /**
   * 
   * @param {Entity|Vector2D|Objct} _object 
   * @param {Function?}             _filter 
   * 
   * @return {Entity|null}
   */
  GetChildFurthestFrom ( _object, _filter ) {

    let child;
    let distance = 0;
    let tempDistance;
    let furthestChild;
    const children = this.children;

    if ( children.length !== 0 ) {

      for ( var i = 0; i < children.length; ++i ) {

        child = children[ i ];

        if ( _filter && _filter( child ) ) continue;

        tempDistance = Abs( child.position.GetDistanceSquared( _object.x, _object.y ) );

        if ( tempDistance > distance ) {

          distance = tempDistance;
          furthestChild = child;
        
        }
      
      }

      return furthestChild;
    
    }

    return null;
  
  }

  /**
   * 
   * @return {this}
   */
  ClusterBind () {

    const children = this.children;
    let child = children[ 0 ];
    let cBounds;

    PS_minmax.Set( 0, 0, 0, 0 );
    const tl = PS_minmax.tl;
    const br = PS_minmax.br;

    for ( var i = 0; i < children.length; child = children[ ++i ] ) {

      cBounds = child.ComputeLocalBounds( child.anchor );

      tl.x = Min( tl.x, cBounds.tl.x );
      tl.y = Min( tl.y, cBounds.tl.y );
      br.x = Max( br.x, cBounds.br.x );
      br.y = Max( br.y, cBounds.br.y );

    }

    PS_minmax.ComputeWH();

    this.w = PS_minmax.w;
    this.h = PS_minmax.h;

    this.bounds.ComputeLocal( tl.x, tl.y, this.width, this.height, null, this );

    return this;

  }

}

// Alias
Container2D.prototype.Mount = Container2D.prototype.AddChildren;
Container2D.prototype.Unmount = Container2D.prototype.RemoveChildren;

// Private Static ----->
const PS_minmax = new AABB2D( 0, 0, 0, 0 );
// <----- Private Static
