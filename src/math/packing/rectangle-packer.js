/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { AABB2D } from '../../geom';
import { Vector2D } from '../vector/vector2d';

export class RectanglePacker {

  /**
   * 
   * @param {number} _w 
   * @param {number} _h 
   */
  constructor ( _w, _h ) {

    this.root = null;
    this.propW = 'width';
    this.propH = 'height';
    this.w = _w;
    this.h = _h;
    this.__dynamic = !_w;
    this.padding = new Vector2D( 0, 0 );

  }

  /**
   * 
   * @param {object[]} _objects 
   * @param {boolean}  _suppress 
   * 
   * @return {object[]}
   */
  Pack ( _objects, _suppress ) {

    const l = _objects.length;
    const pw = this.propW;
    const ph = this.propH;
    const px = this.padding.x;
    const py = this.padding.y;
    let obj = _objects[ 0 ];
    let ow = obj[ pw ] + px;
    let oh = obj[ ph ] + py;
    let node = null;
    const arr = [];

    this.root = new AABB2D( 0, 0, 0, 0 )
      .SetXYWH( 0, 0, this.w, this.h );

    for ( var i = 0; i < l; obj = _objects[ ++i ] ) {

      ow = obj[ pw ] + px;
      oh = obj[ ph ] + py;

      if ( i === l - 1 ) {

        ow -= px;
        oh -= py;
      
      }

      node = this.Find( this.root, ow, oh );

      if ( node ) {

        arr[ i ] = this.Partition( node, ow, oh ) ;

      }

      if ( arr[ i ] == null && _suppress !== true ) {

        throw new Error( PS_PACK_SIZE_ERROR );
      
      }

    }    

    return arr;
  
  }

  /**
   * 
   * @param {object[]} _objects 
   * @param {boolean}  _suppress 
   * 
   * @return {object[]}
   */
  PackDynamic ( _objects, _suppress ) {

    const l = _objects.length;
    const prw = this.propW;
    const prh = this.propH;
    const px = this.padding.x;
    const py = this.padding.y;
    let obj = _objects[ 0 ];
    let ow = obj[ prw ] + px;
    let oh = obj[ prh ] + py;
    let node = null;
    const arr = [];

    this.root = new AABB2D( 0, 0, 0, 0 )
      .SetXYWH( 0, 0, ow, oh );

    for ( var i = 0; i < l; obj = _objects[ ++i ] ) {

      ow = obj[ prw ] + px;
      oh = obj[ prh ] + py;

      if ( i === l - 1 ) {

        ow -= px;
        oh -= py;
      
      }

      node = this.Find( this.root, ow, oh );

      if ( node ) {

        arr[ i ] = this.Partition( node, ow, oh ) ;

      } else {

        arr[ i ] = this.Extend( ow, oh );
      
      }

      if ( arr[ i ] == null && _suppress !== true ) {

        throw new Error( PS_PACK_SIZE_ERROR );
      
      }

    }    

    return arr;

  }

  /**
   * 
   * @param {AABB2D} _node 
   * @param {number} _w 
   * @param {number} _h 
   * 
   * @return {AABB2D|null}
   */
  Find ( _node, _w, _h ) {

    if ( _node.vertical && _node.horizontal ) {

      return this.Find( _node.horizontal, _w, _h ) || this.Find( _node.vertical, _w, _h );

    } else if ( ( _w <= _node.w ) && ( _h <= _node.h ) ) {

      return _node;
    
    }

    return null;

  }

  /**
   * 
   * @param {AABB2D} _node 
   * @param {number} _w 
   * @param {number} _h 
   * 
   * @return {AABB2D}
   */
  Partition ( _node, _w, _h ) {

    _node.vertical = new AABB2D( 0, 0, 0, 0 )
      .SetXYWH( _node.tl.x, _node.tl.y + _h, _node.w, _node.h - _h );
    _node.horizontal = new AABB2D( 0, 0, 0, 0 )
      .SetXYWH( _node.tl.x + _w, _node.tl.y, _node.w - _w, _h );

    return _node;
  
  }

  /**
   * 
   * @param {number} _w 
   * @param {number} _h
   * 
   * @return {AABB2D|null} 
   */
  Extend ( _w, _h ) {

    const a = ( _w <= this.root.w );
    const b = ( _h <= this.root.h );
    const c = a && ( this.root.w >= ( this.root.h + _h ) );
    const d = b && ( this.root.h >= ( this.root.w + _w ) );

    if ( !!d ) {

      return this.ExtendAxis( _w, _h );
    
    } else if ( !!c ) {

      return this.ExtendAxis( _w, _h, true );
    
    } else if ( !!b ) {

      return this.ExtendAxis( _w, _h );
    
    } else if ( !!a ) {

      return this.ExtendAxis( _w, _h, true );
    
    }

    return null;
  
  }

  /**
   * 
   * @param {number}   _w 
   * @param {number}   _h 
   * @param {boolean?} _vertical 
   * 
   * @return {AABB2D|null}
   */
  ExtendAxis ( _w, _h, _vertical ) {

    let newRoot = null;

    if ( !!_vertical ) {

      newRoot = new AABB2D( 0, 0, 0, 0 )
        .SetXYWH( 0, 0, this.root.w, this.root.h + _h );

      newRoot.horizontal = this.root;
      newRoot.vertical = new AABB2D( 0, 0, 0, 0 )
        .SetXYWH( 0, this.root.h, this.root.w, _h );
    
    } else {

      newRoot = new AABB2D( 0, 0, 0, 0 )
        .SetXYWH( 0, 0, this.root.w + _w, this.root.h );

      newRoot.vertical = this.root;
      newRoot.horizontal = new AABB2D( 0, 0, 0, 0 )
        .SetXYWH( this.root.w, 0, _w, this.root.h );
    
    }

    this.root = newRoot;

    let node = this.Find( this.root, _w, _h ) ;

    if ( node ) {

      return this.Partition( node, _w, _h );
    
    }

    return null;
  
  }

  /**
   * 
   * @param {string} _w 
   * @param {string} _h 
   * 
   * @return {this}
   */
  UseProp ( _w, _h ) {

    this.propW = _w;
    this.propH = _h;

    return this;
  
  }

  /**
   * 
   * @param {number} _w 
   * @param {number} _h
   * 
   * @return {this} 
   */
  SetSize ( _w, _h ) {

    this.w = _w;
    this.h = _h;
    this.dynamic = true;

    return this;

  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y
   * 
   * @return {this} 
   */
  SetPadding ( _x, _y ) {

    this.padding.Set( _x, _y );

    return this;

  }

}

// Private Static ----->
const PS_PACK_SIZE_ERROR = 'Size error!';
// <----- Private Static
