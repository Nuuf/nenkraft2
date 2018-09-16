/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../math/vector/vector2d';
import { DegreesToRadians } from '../math';
import { RandomFloat, RandomInteger } from '../utilities';

const PI = Math.PI;
const Sin = Math.sin;
const Cos = Math.cos;

export class Circle {

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

  static get TYPE () {

    return PS_TYPE;
  
  }

  Set ( _x, _y, _radius ) {

    this.center.Set( _x, _y );
    this.radius = _radius;
  
  }

  SetC ( _circle ) {

    this.center.SetV( _circle );
    this.radius = _circle.radius;
  
  }

  Scale ( _scale ) {

    this.radius *= _scale;
  
  }

  IntersectsCircle ( _circle ) {

    const radii = this.radius + _circle.radius;

    return ( radii * radii >= this.center.GetDistanceSquaredV( _circle.center ) );
  
  }

  IntersectsPoint ( _p ) {

    return ( this.radiusSquared >= this.center.GetDistanceSquaredV( _p ) );
  
  }

  GenerateRandomPoints ( _amount, _int, _outside ) {

    let i = 0;
    let randFunc = RandomFloat;
    const tl = new Vector2D( this.x - this.radius, this.y - this.radius );
    const br = new Vector2D( this.x + this.radius, this.y + this.radius );
    const points = [];

    _outside = !!_outside;

    if ( _int === true ) randFunc = RandomInteger;

    for ( ; i < _amount; ++i ) {
      
      const point = Nenkraft.Vector2D( randFunc( tl.x, br.x ), randFunc( tl.y, br.y ) );

      while ( this.IntersectsPoint( point ) === _outside ) {

        point.Set( randFunc( tl.x, br.x ), randFunc( tl.y, br.y ) );

      }

      points.push( point );

    }

    return points;
  
  }

  GeneratePerimeterPoints ( _amount, _margin ) {

    let i = 0;
    const points = [];

    _amount *= _margin;

    for ( ; i < _amount; i += _margin ) {

      points.push(
        Nenkraft.Vector2D(
          this.x + Cos( DegreesToRadians( i ) ) * this.radius,
          this.y + Sin( DegreesToRadians( i ) ) * this.radius
        )
      );
    
    }

    return points;
  
  }

  get x () {

    return this.center.x;
  
  }

  set x ( _value ) {

    this.center.x = _value; 
  
  }

  get y () {

    return this.center.y;
  
  }

  set y ( _value ) {

    this.center.y = _value; 
  
  }

  get radius () {

    return this.radiusUnsquared;
  
  }

  set radius ( _value ) {

    this.radiusUnsquared = _value;
    this.radiusSquared = _value * _value;
    this.diameter = this.w = this.h = _value * 2;
    this.area = PI * _value * _value;
  
  }

}

// Private Static ----->
const PS_TYPE = 2;
// <----- Private static
