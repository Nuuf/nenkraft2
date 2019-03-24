/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { AABB2D } from '../../geom/aabb/aabb2d';
import { Dispatcher } from '../../event/dispatcher';

export class Culler2D {

  /**
   * 
   * @param {number} _tlx 
   * @param {number} _tly 
   * @param {number} _brx 
   * @param {number} _bry 
   */
  constructor ( _tlx, _tly, _brx, _bry ) {
  
    this.bounds = new AABB2D( _tlx, _tly, _brx, _bry );
    this.container = null;
    this.entities = null;
    this.rootMatrix = null;
    this.onOut = new Dispatcher();
    this.onIn = new Dispatcher();

  }

  /**
   * 
   * @param {Container2D} _container2d 
   * 
   * @return {this}
   */
  BindContainer ( _container2d ) {

    this.container = _container2d;
    this.entities = _container2d.children;

    return this;
  
  }

  /**
   * 
   * @param {Matrix2D} _matrix 
   * 
   * @return {this}
   */
  SetRootMatrix ( _matrix ) {

    this.rootMatrix = _matrix;

    return this;

  }

  /**
   * 
   * @return {void}
   */
  Process () {

    const entities = this.entities;
    let entity = entities[ 0 ];
    const bounds = this.bounds;
    const rm = this.rootMatrix;

    for ( var i = 0; i < entities.length; entity = entities[ ++i ] ) {
    
      entity.ComputeGlobalBounds( entity.anchor, rm );

      if ( bounds.IntersectsAABB2D( entity.bounds.global ) === false ) {

        if ( entity.__inside__ !== false ) {

          entity.__inside__ = false;
          this.onOut.Dispatch( entity );
        
        }

      } else if ( entity.__inside__ !== true ) {

        entity.__inside__ = true;
        this.onIn.Dispatch( entity );
      
      }

    }
  
  }

}
