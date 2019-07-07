/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Pool } from '../utility/pool';

export class QuadtreeNode {

  /**
   * 
   * @param {AABB2D}  _aabb 
   * @param {integer} _level 
   * @param {integer} _objCap 
   * @param {integer} _levelCap 
   */
  constructor ( _aabb, _level, _objCap, _levelCap ) {

    this.nodes = {};
    this.objects = [];
    this.convergence = [];
    this.objectCap = 0;
    this.levelCap = 0;
    this.level = 0;
    this.aabb = null;
    this.hasSplit = false;

    this.Set( _aabb, _level, _objCap, _levelCap );
  
  }

  /**
   * 
   * @return {Pool}
   */
  static get pool () {

    return PS_pool;
  
  }

  /**
   * 
   * @return {boolean}
   */
  static get USE_POOL () {

    return PS_USE_POOL;
  
  }

  /**
   * 
   * @param {boolean} _value
   */
  static set USE_POOL ( _value ) {

    PS_USE_POOL = !!_value;
  
  }

  /**
   * 
   * @param {AABB2D}  _aabb 
   * @param {integer} _level 
   * @param {integer} _objCap 
   * @param {integer} _levelCap 
   * 
   * @return {this}
   */
  Set ( _aabb, _level, _objCap, _levelCap ) {

    this.aabb = _aabb;
    this.level = _level;
    this.objectCap = _objCap;
    this.levelCap = _levelCap;

    return this;
  
  }

  /**
   *
   * @param {AABB2D}  _aabb 
   * @param {integer} _level 
   * @param {integer} _objCap 
   * @param {integer} _levelCap 
   * 
   * @return {QuadtreeNode}
   */
  FromPool ( _aabb, _level, _objCap, _levelCap ) {

    if ( PS_USE_POOL === true ) {

      return PS_pool.Retrieve( _aabb, _level, _objCap, _levelCap );
      
    }
  
    return new QuadtreeNode( _aabb, _level, _objCap, _levelCap );
  
  }

  /**
   * 
   * @return {void}
   */
  Store () {

    PS_pool.Store( this );
  
  }

  /**
   * 
   * @param {AABB2D} _object 
   * 
   * @return {void}
   */
  Add ( _object ) {

    let marking = '';
    const { objects } = this;
    const { nodes } = this;

    if ( this.hasSplit === true ) {

      marking = this.Marking( _object );

      if ( marking !== null ) {

        nodes[ marking ].Add( _object );
      
      }

      return;
    
    }

    objects.push( _object );

    if ( this.level < this.levelCap ) {

      if ( objects.length > this.objectCap ) {

        if ( this.hasSplit === false ) {

          this.Split();
        
        }

        for ( var i = 0; i < objects.length; ++i ) {

          marking = this.Marking( objects[ i ] );

          if ( marking !== null ) {

            nodes[ marking ].Add( objects[ i ] );
          
          }
        
        }

        objects.length = 0;
      
      }
    
    }
  
  }

  /**
   * 
   * @param {AABB2D} _object 
   * 
   * @return {AABB2D[]}
   */
  Converge ( _object ) {

    let marking = '';
    const { nodes } = this;
    const { convergence } = this;

    convergence.length = 0;
    convergence.push.apply( convergence, this.objects );

    if ( this.hasSplit === true ) {

      marking = this.Marking( _object );

      if ( marking !== null ) {

        convergence.push.apply( convergence, nodes[ marking ].Converge( _object ) );
      
      } else {

        convergence.push.apply( convergence, nodes[ PS_TOP_LEFT ].Converge( _object ) );
        convergence.push.apply( convergence, nodes[ PS_TOP_RIGHT ].Converge( _object ) );
        convergence.push.apply( convergence, nodes[ PS_BOTTOM_LEFT ].Converge( _object ) );
        convergence.push.apply( convergence, nodes[ PS_BOTTOM_RIGHT ].Converge( _object ) );
      
      }
    
    }

    return convergence;
  
  }

  /**
   * 
   * @return {void}
   */
  Split () {

    const nl = this.level + 1;
    const oc = this.objectCap;
    const lc = this.levelCap;
    const { nodes } = this;
    const { aabb } = this;

    nodes[ PS_TOP_LEFT ] = this.FromPool(
      aabb.GetQuadrant( PS_TOP_LEFT ),
      nl, oc, lc
    );
    nodes[ PS_TOP_RIGHT ] = this.FromPool(
      aabb.GetQuadrant( PS_TOP_RIGHT ),
      nl, oc, lc
    );
    nodes[ PS_BOTTOM_LEFT ] = this.FromPool(
      aabb.GetQuadrant( PS_BOTTOM_LEFT ),
      nl, oc, lc
    );
    nodes[ PS_BOTTOM_RIGHT ] = this.FromPool(
      aabb.GetQuadrant( PS_BOTTOM_RIGHT ),
      nl, oc, lc
    );
    this.hasSplit = true;
  
  }

  /**
   * 
   * @return {void}
   */
  Dump () {

    const { nodes } = this;

    this.objects.length = 0;

    if ( this.hasSplit === true ) {

      nodes[ PS_TOP_LEFT ].Dump();
      nodes[ PS_TOP_RIGHT ].Dump();
      nodes[ PS_BOTTOM_LEFT ].Dump();
      nodes[ PS_BOTTOM_RIGHT ].Dump();

      if ( PS_USE_POOL === true ) {

        nodes[ PS_TOP_LEFT ].Store();
        nodes[ PS_TOP_RIGHT ].Store();
        nodes[ PS_BOTTOM_LEFT ].Store();
        nodes[ PS_BOTTOM_RIGHT ].Store();
      
      }
    
    }

    this.nodes = {};
    this.hasSplit = false;
  
  }

  /**
   * 
   * @param {AABB2D} _object 
   * 
   * @return {string|null}
   */
  Marking ( _object ) {

    const { nodes } = this;

    if ( nodes[ PS_TOP_LEFT ].aabb.ContainsAABB2D( _object ) === true ) {

      return PS_TOP_LEFT;
    
    }

    if ( nodes[ PS_TOP_RIGHT ].aabb.ContainsAABB2D( _object ) === true ) {

      return PS_TOP_RIGHT;
    
    }

    if ( nodes[ PS_BOTTOM_LEFT ].aabb.ContainsAABB2D( _object ) === true ) {

      return PS_BOTTOM_LEFT;
    
    }

    if ( nodes[ PS_BOTTOM_RIGHT ].aabb.ContainsAABB2D( _object ) === true ) {

      return PS_BOTTOM_RIGHT;
    
    }

    return null;
  
  }

  /**
   * 
   * @param {[]?} _nodeList 
   * 
   * @return {QuadtreeNode[]}
   */
  ConcatNodes ( _nodeList ) {

    const { nodes } = this;

    if ( _nodeList == null ) _nodeList = [];
    _nodeList.push( this );
    if ( this.hasSplit === false ) return _nodeList;
    nodes[ PS_TOP_LEFT ].ConcatNodes( _nodeList );
    nodes[ PS_TOP_RIGHT ].ConcatNodes( _nodeList );
    nodes[ PS_BOTTOM_LEFT ].ConcatNodes( _nodeList );
    nodes[ PS_BOTTOM_RIGHT ].ConcatNodes( _nodeList );
    
    return _nodeList;
  
  }

}

// Private Static ----->
const PS_TOP_LEFT = 'TL';
const PS_TOP_RIGHT = 'TR';
const PS_BOTTOM_LEFT = 'BL';
const PS_BOTTOM_RIGHT = 'BR';
const PS_pool = new Pool();
let PS_USE_POOL = true;

PS_pool.Retrieve = function ( _aabb, _level, _objCap, _levelCap ) {

  this.PreRetrieve();

  return this.objects.pop().Set( _aabb, _level, _objCap, _levelCap );

};

PS_pool.Flood( () => {

  return new QuadtreeNode( null, 0, 0, 0 );

}, 500 );
// <----- Private Static
