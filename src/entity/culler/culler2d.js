/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { AABB2D } from '../../geom/aabb/aabb2d';

export class Culler2D {

  constructor ( _x, _y, _w, _h ) {
  
    this.bounds = new AABB2D( _x, _y, _x + _w, _y + _h );
    this.container = null;
    this.entities = null;
    this.rootMatrix = null;

  }

  BindContainer ( _container2d ) {

    this.container = _container2d;
    this.entities = _container2d.children;

    return this;
  
  }

  SetRootMatrix ( _matrix ) {

    this.rootMatrix = _matrix;

    return this;

  }

  Process () {

    const entities = this.entities;
    let entity = entities[ 0 ];
    const bounds = this.bounds;

    for ( var i = 0; i < entities.length; entity = entities[ ++i ] ) {
    
      entity.ComputeGlobalBounds( entity.anchor, this.rootMatrix );

      if ( bounds.IntersectsAABB2D( entity.bounds.global ) === false ) {

        entity.display = false;

      } else {

        entity.display = true;
      
      }

    }
  
  }

}
