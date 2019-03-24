/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../../vector/vector2d';

export class Body2D {

  /**
   * 
   * @param {Shape} _shape 
   */
  constructor ( _shape ) {

    this.shape = _shape;
    this.mass = 0;
    this.relative = null;
    this.velocity = new Vector2D( 0, 0 );
    this.offset = new Vector2D( 0, 0 );

  }

  /**
   * 
   * @param {number} _n
   * 
   * @return {this} 
   */
  SetMass ( _n ) {

    this.mass = _n;

    return this;
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y
   * 
   * @return {this} 
   */
  SetOffset ( _x, _y ) {

    this.offset.Set( _x, _y );

    return this;
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y
   * 
   * @return {this} 
   */
  SetVelocity ( _x, _y ) {

    this.velocity.Set( _x, _y );

    return this;

  }

  /**
   * 
   * @param {object|Vector2D|Point} _v 
   * 
   * @return {this}
   */
  SetVelocityV ( _v ) {

    this.velocity.SetV( _v );

    return this;
  
  }

  /**
   * 
   * @return {Vector2D}
   */
  GetPosition () {

    return this.shape.GetPosition();

  }

  /**
   *
   * @param {number} _x 
   * @param {number} _y
   *
   * @return {this} 
   */
  SetPosition ( _x, _y ) {

    this.shape.SetPosition( _x + this.offset.x, _y + this.offset.y );

  }

  /**
   * 
   * @param {object|Vector2D|Point} _v 
   * 
   * @return {this}
   */
  SetPositionV ( _v ) {

    this.SetPosition( _v.x, _v.y );

    return this;
  
  }

  /**
   * 
   * @param {Vector2D} _relative
   * 
   * @return {this} 
   */
  SetRelative ( _relative ) {

    this.relative = _relative;

    return this;

  }

}
