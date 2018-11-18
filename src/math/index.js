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

export const PI5 = PI * 0.5;

export const DEGREES_TO_RADIANS = PI / 180;

export const RADIANS_TO_DEGRESS = 180 / PI;

export const RADIAN = DEGREES_TO_RADIANS;

export function DegreesToRadians ( _degrees ) {

  return _degrees * DEGREES_TO_RADIANS;

}

export function RadiansToDegress ( _radians ) {

  return _radians * RADIANS_TO_DEGRESS;

}

export function PrecisionRound ( _value, _precision ) {

  if ( _precision == null ) return _value;
  const divisor = Pow( 10, _precision );

  return Round( divisor * _value ) / divisor;

}

export function Spread ( _start, _amount, _margin, _i ) {

  return ( _start - ( _margin * ( _amount - 1 ) * 0.5 ) + ( _i * _margin ) );

}

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

export function Oscillate ( _time, _from, _to, _amplitude ) {

  const delta = ( _to - _from ) * 0.5;

  return ( _from + delta ) + ( Sin( DegreesToRadians( _time * _amplitude ) ) * delta );

}

export function LikeASquareGrid ( _points, _w, _marginX, _marginY ) {

  const columns = ( _w / _marginX ) | 0;
 
  for ( var i = 0 ; i < _points.length; ++i ) {

    _points[ i ].Set( ( i % columns ) * _marginX, ( ( i / columns ) | 0 ) * _marginY );
      
  }

}

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

export function GreatestCommonDivisor ( _x, _y ) {

  if ( _y === 0 ) return _x;

  return GreatestCommonDivisor( _y, _x % _y );

}

export function SimplifyAspectRatio ( _x, _y, _array ) {

  const gcd = GreatestCommonDivisor( _x, _y );
  const array = _array == null ? [] : _array;

  array[ 0 ] = _x / gcd;
  array[ 1 ] = _y / gcd;

  return array;

}

export function IntegerNotation ( _value, _roof, _splitter ) {

  const vrm = _value % _roof, vrd = _value / _roof;

  return Ceil( vrm === 0 ? vrd + 1 : vrd ) + _splitter + ( 1 + vrm );
  
}

import * as Misc from './misc';
export { Misc };
