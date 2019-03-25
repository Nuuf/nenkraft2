/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../math/vector/vector2d';
import { DegreesToRadians } from '../math';
import { RandomFloat, RandomInteger } from '../utility';

const PI = Math.PI;
const Sin = Math.sin;
const Cos = Math.cos;

export class Circle {

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   * @param {number} _radius 
   */
  constructor ( _x, _y, _radius ) {

    this.center = new Vector2D( _x, _y );
    this.diameter = 0;
    this.w = 0;
    this.h = 0;
    this.radiusSquared = 0;
    this.radiusUnsquared = 0;
    this.area = 0;
    this.radius = _radius;
    this.belongsTo = null;
    this.TYPE = PS_TYPE;
  
  }

  /**
   * 
   * @return {number}
   */
  static get TYPE () {

    return PS_TYPE;
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   * @param {number} _radius 
   * 
   * @return {this}
   */
  Set ( _x, _y, _radius ) {

    this.center.Set( _x, _y );
    this.radius = _radius;

    return this;
  
  }

  /**
   * 
   * @param {Circle} _circle 
   * 
   * @return {this}
   */
  SetC ( _circle ) {

    this.center.SetV( _circle );
    this.radius = _circle.radius;
    
    return this;
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   * 
   * @return {this}
   */
  SetPosition ( _x, _y ) {

    this.center.Set( _x, _y );

    return this;

  }

  /**
   * 
   * @return {Vector2D}
   */
  GetPosition () {

    return this.center;
  
  }

  /**
   * 
   * @param {number} _scale 
   * 
   * @return {this}
   */
  Scale ( _scale ) {

    this.radius *= _scale;
    
    return this;
  
  }

  /**
   * 
   * @param {Circle} _circle 
   * 
   * @return {boolean}
   */
  IntersectsCircle ( _circle ) {

    const radii = this.radius + _circle.radius;

    return ( radii * radii >= this.center.GetDistanceSquaredV( _circle.center ) );
  
  }

  /**
   * 
   * @param {Circle} _circle 
   * 
   * @return {boolean}
   */
  ContainsCircle ( _circle ) {

    return ( this.radius - _circle.radius > this.center.GetDistanceV( _circle.center ) );

  }

  /**
   * 
   * @param {Vector2D} _p 
   * 
   * @return {boolean}
   */
  IntersectsPoint2D ( _p ) {

    return ( this.radiusSquared >= this.center.GetDistanceSquaredV( _p ) );
  
  }

  /**
   * 
   * @param {number}   _amount 
   * @param {boolean?} _int 
   * @param {boolean?} _outside 
   * 
   * @return {Vector2D[]}
   */
  GenerateRandomPoints ( _amount, _int, _outside ) {

    let randFunc = RandomFloat;
    const tl = new Vector2D( this.x - this.radius, this.y - this.radius );
    const br = new Vector2D( this.x + this.radius, this.y + this.radius );
    const points = [];

    _outside = !!_outside;

    if ( _int === true ) randFunc = RandomInteger;

    for ( var i = 0; i < _amount; ++i ) {
      
      const point = new Vector2D( randFunc( tl.x, br.x ), randFunc( tl.y, br.y ) );

      while ( this.IntersectsPoint2D( point ) === _outside ) {

        point.Set( randFunc( tl.x, br.x ), randFunc( tl.y, br.y ) );

      }

      points.push( point );

    }

    return points;
  
  }

  /**
   * 
   * @param {number} _amount 
   * @param {number} _margin 
   * 
   * @return {Vector2D[]}
   */
  GeneratePerimeterPoints ( _amount, _margin ) {

    const points = [];

    _amount *= _margin;

    for ( var i = 0; i < _amount; i += _margin ) {

      points.push(
        new Vector2D(
          this.x + Cos( DegreesToRadians( i ) ) * this.radius,
          this.y + Sin( DegreesToRadians( i ) ) * this.radius
        )
      );
    
    }

    return points;
  
  }

  /**
   * 
   * @return {number}
   */
  get x () {

    return this.center.x;
  
  }

  /**
   * 
   * @return {void}
   */
  set x ( _value ) {

    this.center.x = _value; 
  
  }

  /**
   * 
   * @return {number}
   */
  get y () {

    return this.center.y;
  
  }

  /**
   * 
   * @param {number} _value
   */
  set y ( _value ) {

    this.center.y = _value; 
  
  }

  /**
   * 
   * @return {number}
   */
  get radius () {

    return this.radiusUnsquared;
  
  }

  /**
   * 
   * @param {number} _value}
   */
  set radius ( _value ) {

    this.radiusUnsquared = _value;
    this.radiusSquared = _value * _value;
    this.diameter = this.w = this.h = _value * 2;
    this.area = PI * _value * _value;
  
  }

}

// Private Static ----->
const PS_TYPE = 2;
// <----- Private Static
