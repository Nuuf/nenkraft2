/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

'use strict';

const PI = Math.PI;
const Sin = Math.sin;
const Cos = Math.cos;
const Pow = Math.pow;
const Round = Math.round;
const Ceil = Math.ceil;

export const PII = PI * 2;
export const TAU = PII;

export const PI5 = PI * 0.5;

export const DEGREES_TO_RADIANS = PI / 180;

export const RADIANS_TO_DEGRESS = 180 / PI;

export const RADIAN = DEGREES_TO_RADIANS;

/**
 * 
 * @param {number} _degrees 
 * 
 * @return {number}
 */
export function DegreesToRadians ( _degrees ) {

  return _degrees * DEGREES_TO_RADIANS;

}

/**
 * 
 * @param {number} _degrees 
 * 
 * @return {number}
 */
export function RadiansToDegress ( _radians ) {

  return _radians * RADIANS_TO_DEGRESS;

}

/**
 * 
 * @param {number} _value 
 * @param {number} _precision 
 * 
 * @return {number}
 */
export function PrecisionRound ( _value, _precision ) {

  if ( _precision == null ) return _value;
  const divisor = Pow( 10, _precision );

  return Round( divisor * _value ) / divisor;

}

/**
 * 
 * @param {number}  _start 
 * @param {number}  _amount 
 * @param {number}  _margin 
 * @param {integer} _i 
 * 
 * @return {number}
 */
export function Spread ( _start, _amount, _margin, _i ) {

  return ( _start - ( _margin * ( _amount - 1 ) * 0.5 ) + ( _i * _margin ) );

}

/**
 * 
 * @param {Vector2D} _repeller 
 * @param {Vector2D} _attractor 
 * @param {number}   _velocity 
 * @param {number}   _radius 
 * @param {number}   _strength 
 * 
 * @return {void}
 */
export function AttractRepel ( _repeller, _attractor, _velocity, _radius, _strength ) {

  const delta = _attractor.SubtractVC( _repeller ), distance = delta.GetMagnitudeSquared();

  if ( distance < _radius * _radius ) {

    const theta = delta.GetAngle();

    _velocity.Add(
      Cos( theta ) * _strength,
      Sin( theta ) * _strength
    );
    
  }

}

/**
 * 
 * @param {number} _time 
 * @param {number} _from 
 * @param {number} _to 
 * @param {number} _amplitude 
 * 
 * @return {number}
 */
export function Oscillate ( _time, _from, _to, _amplitude ) {

  const delta = ( _to - _from ) * 0.5;

  return ( _from + delta ) + ( Sin( DegreesToRadians( _time * _amplitude ) ) * delta );

}

/**
 * 
 * @param {Array<object|Vector2D|Point>} _objects 
 * @param {number}                       _w 
 * @param {number}                       _marginX 
 * @param {number}                       _marginY 
 * @param {number}                       _offsetX 
 * @param {number}                       _offsetY 
 * 
 * @return {void}
 */
export function LikeASquareGrid ( _objects, _w, _marginX, _marginY, _offsetX, _offsetY ) {

  _offsetX = _offsetX ? _offsetX : 0;
  _offsetY = _offsetY ? _offsetY : 0;

  const columns = ( _w / _marginX ) | 0;
  let object = _objects[ 0 ];
 
  for ( var i = 0 ; i < _objects.length; object = _objects[ ++i ] ) {

    object.x = ( ( i % columns ) * _marginX ) + _offsetX;
    object.y = ( ( ( i / columns ) | 0 ) * _marginY ) + _offsetY;
      
  }

}

/**
 * 
 * @param {number}   _x 
 * @param {number}   _y 
 * @param {number}   _w 
 * @param {number}   _h 
 * @param {number[]?} _array
 * 
 * @return {number[]} 
 */
export function TriRectArray ( _x, _y, _w, _h, _array ) {

  if ( _array != null ) {

    _array[ 0 ] = _x;
    _array[ 1 ] = _y;
    _array[ 2 ] = _x + _w;
    _array[ 3 ] = _y;
    _array[ 4 ] = _x;
    _array[ 5 ] = _y + _h;
    _array[ 6 ] = _x;
    _array[ 7 ] = _y + _h;
    _array[ 8 ] = _x + _w;
    _array[ 9 ] = _y;
    _array[ 10 ] = _x + _w;
    _array[ 11 ] = _y + _h;

    return _array;
      
  }
  
  return [
    _x, _y,
    _x + _w, _y,
    _x, _y + _h,
    _x, _y + _h,
    _x + _w, _y,
    _x + _w, _y + _h
  ];

}

/**
 * 
 * @param {integer} _x 
 * @param {integer} _y 
 * 
 * @return {integer}
 */
export function GreatestCommonDivisor ( _x, _y ) {

  if ( _y === 0 ) return _x;

  return GreatestCommonDivisor( _y, _x % _y );

}

/**
 * 
 * @param {integer}   _x 
 * @param {integer}   _y 
 * @param {integer[]?} _array 
 * 
 * @return {integer[]}
 */
export function SimplifyAspectRatio ( _x, _y, _array ) {

  const gcd = GreatestCommonDivisor( _x, _y );
  const array = _array == null ? [] : _array;

  array[ 0 ] = _x / gcd;
  array[ 1 ] = _y / gcd;

  return array;

}

/**
 * 
 * @param {number} _value 
 * @param {number} _roof 
 * @param {string} _splitter
 * 
 * @return {string} 
 */
export function IntegerNotation ( _value, _roof, _splitter ) {

  const vrm = _value % _roof, vrd = _value / _roof;

  return Ceil( vrm === 0 ? vrd + 1 : vrd ) + _splitter + ( 1 + vrm );
  
}

import * as Misc from './misc';
export { Misc };
