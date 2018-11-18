/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Pool } from '../utility/pool';

export class QuadtreeNode {

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

  static get pool () {

    return PS_pool;
  
  }

  static get USE_POOL () {

    return PS_USE_POOL;
  
  }

  static set USE_POOL ( _value ) {

    PS_USE_POOL = !!_value;
  
  }

  Set ( _aabb, _level, _objCap, _levelCap ) {

    this.aabb = _aabb;
    this.level = _level;
    this.objectCap = _objCap;
    this.levelCap = _levelCap;

    return this;
  
  }

  FromPool ( _aabb, _level, _objCap, _levelCap ) {

    if ( PS_USE_POOL === true ) {

      return PS_pool.Retrieve( _aabb, _level, _objCap, _levelCap );
      
    }
  
    return new QuadtreeNode( _aabb, _level, _objCap, _levelCap );
  
  }

  Store () {

    PS_pool.Store( this );
  
  }

  Add ( _object ) {

    let i = 0;
    let marking = '';
    const objects = this.objects;
    const nodes = this.nodes;

    if ( this.hasSplit === true ) {

      marking = this.Marking( _object );

      if ( marking !== null ) {

        nodes[ marking ].Add( _object );

        return;
      
      }
    
    }

    objects.push( _object );

    if ( this.level < this.levelCap ) {

      if ( objects.length > this.objectCap ) {

        if ( this.hasSplit === false ) {

          this.Split();
        
        }

        while ( i < objects.length ) {

          marking = this.Marking( objects[ i ] );

          if ( marking !== null ) {

            nodes[ marking ].Add( objects.fickleSplice( i ) );
          
          } else {

            ++i;
          
          }
        
        }
      
      }
    
    }
  
  }

  Converge ( _object ) {

    let marking = '';
    const nodes = this.nodes;
    const convergence = this.convergence;

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

  Split () {

    const nl = this.level + 1;
    const oc = this.objectCap;
    const lc = this.levelCap;
    const nodes = this.nodes;
    const aabb = this.aabb;

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

  Dump () {

    const nodes = this.nodes;

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

  Marking ( _object ) {

    const nodes = this.nodes;

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

  ConcatNodes ( _nodeList ) {

    const nodes = this.nodes;

    if ( _nodeList === undefined ) _nodeList = [];
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
