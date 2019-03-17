/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../../math/vector/vector2d';

'use strict';

const PI = Math.PI;
const Cos = Math.cos;
const Sin = Math.sin;
const Abs = Math.abs;
const Pow = Math.pow;
const Exp = Math.exp;

/**
 * 
 * @param {Polygon2D} _polygon 
 * @param {number}    _x 
 * @param {number}    _y 
 * @param {number}    _w 
 * @param {number}    _h 
 * 
 * @return {Polygon2D}
 */
export const Rectangular2D = function ( _polygon, _x, _y, _w, _h ) {

  const tl = new Vector2D( _x, _y );
  const tr = new Vector2D( _x + _w, _y );
  const br = new Vector2D( _x + _w, _y + _h );
  const bl = new Vector2D( _x, _y + _h );

  _polygon.Recreate( [ tl, tr, br, bl ] );
  _polygon.ComputeBounds();
  _polygon.ComputeNormalsA();

  return _polygon;

};

/**
 * 
 * @param {Polygon2D} _polygon 
 * @param {number}    _x 
 * @param {number}    _y 
 * @param {number}    _w 
 * @param {number}    _h 
 * 
 * @return {Polygon2D}
 */
export const Isosceles2D = function ( _polygon, _x, _y, _w, _h ) {

  const tm = new Vector2D( _x, _y );
  const br = new Vector2D( _x + _w * 0.5, _y + _h );
  const bl = new Vector2D( _x - _w * 0.5, _y + _h );

  _polygon.Recreate( [ tm, br, bl ] );
  _polygon.ComputeBounds();
  _polygon.ComputeNormalsA();

  return _polygon;

};

/**
 * 
 * @param {Polygon2D} _polygon 
 * @param {number}    _x 
 * @param {number}    _y 
 * @param {number}    _radius 
 * @param {number}    _accuracy 
 * 
 * @return {Polygon2D}
 */
export const Cyclic2D = function ( _polygon, _x, _y, _radius, _accuracy ) {

  let i = 0;
  let x;
  let y;
  let theta;
  const l = _accuracy;
  const angle = PI * 2 / l;

  _polygon.Recreate( [] );

  for ( i; i < l; ++i ) {

    theta = angle * i;
    x = Cos( theta ) * _radius;
    y = Sin( theta ) * _radius;
    _polygon.AddVertex( new Vector2D( _x + x, _y + y ) );
    
  }

  _polygon.ComputeBounds();
  _polygon.ComputeNormalsA();

  return _polygon;

};

/**
 * 
 * @param {Polygon2D} _polygon 
 * @param {number}    _x 
 * @param {number}    _y 
 * @param {number}    _side 
 * 
 * @return {Polygon2D}
 */
export const Equilateral2D = function ( _polygon, _x, _y, _side ) {

  let x;
  let y;
  const theta = 2.0943951023931953;

  _polygon.Recreate( [] );
  x = _side;
  y = 0;
  _polygon.AddVertex( new Vector2D( _x + x, _y + y ) );
  x = Cos( theta ) * _side;
  y = Sin( theta ) * _side;
  _polygon.AddVertex( new Vector2D( _x + x, _y + y ) );
  x = Cos( theta * 2 ) * _side;
  y = Sin( theta * 2 ) * _side;
  _polygon.AddVertex( new Vector2D( _x + x, _y + y ) );
  _polygon.Rotate( new Math.RADIAN * -90 );
  _polygon.ComputeBounds();
  _polygon.ComputeNormalsA();

  return _polygon;

};

/**
 * 
 * @param {Polygon2D} _polygon 
 * @param {number}    _x 
 * @param {number}    _y 
 * @param {number}    _outerRadius 
 * @param {number}    _innerRadius 
 * @param {number}    _corners 
 * 
 * @return {Polygon2D}
 */
export const Star2D = function ( _polygon, _x, _y, _outerRadius, _innerRadius, _corners ) {

  let i = 0;
  let x;
  let y;
  let theta;
  let radius;
  const l = _corners * 2;
  const angle = Math.PI * 2 / l;

  _polygon.Recreate( [] );

  for ( i; i < l; ++i ) {

    radius = ( i & 1 ) === 0 ? _outerRadius : _innerRadius;
    theta = angle * i;
    x = Math.cos( theta ) * radius;
    y = Math.sin( theta ) * radius;
    _polygon.AddVertex( new Vector2D( _x + x, _y + y ) );
    
  }

  _polygon.ComputeBounds();
  _polygon.ComputeNormalsA();

  return _polygon;

};

/**
 * 
 * @param {Polygon2D} _polygon 
 * @param {number}    _x 
 * @param {number}    _y 
 * @param {number}    _n 
 * @param {number}    _radius 
 * 
 * @return {Polygon2D}
 */
export const Butterfly2D = function ( _polygon, _x, _y, _n, _radius ) {

  let i = 0;
  let x;
  let y;
  let u;
  const c = Butterfly2D.C;

  _polygon.Recreate( [] );

  for ( i; i < _n; ++i ) {

    u = i * c._1 * PI / _n;
    
    x = 
      Cos( u ) * ( Exp( Cos( u ) ) - c._2 * 
      Cos( c._3 * u ) - Pow( Sin( u / c._4 ), c._5 ) ) * _radius;
    y = 
      Sin( u ) * ( Exp( Cos( u ) ) - c._2 * 
      Cos( c._3 * u ) - Pow( Sin( u / c._4 ), c._5 ) ) * _radius;

    _polygon.AddVertex( new Vector2D( _x + x, _y + y ) );
    
  }

  _polygon.ComputeBounds();
  _polygon.ComputeNormalsA();

  return _polygon;

};

Butterfly2D.C = {
  _1: 24,
  _2: 2,
  _3: 4,
  _4: 12,
  _5: 5
};

/**
 * 
 * @param {Polygon2D} _polygon 
 * @param {number}    _x 
 * @param {number}    _y 
 * @param {number}    _radius 
 * @param {number}    _k 
 * @param {number}    _accuracy 
 * @param {number}    _loops 
 * 
 * @return {Polygon2D}
 */
export const Rose2D = function ( _polygon, _x, _y, _radius, _k, _accuracy, _loops ) {

  let i = 0;
  let x;
  let y;
  let theta;
  let r;
  const l = _accuracy;
  const angle = PI * 2 / l * _loops;

  _polygon.Recreate( [] );

  for ( i; i < l; ++i ) {

    theta = angle * i;
    r = Cos( _k * theta ) * _radius;
    x = Cos( theta ) * r;
    y = Sin( theta ) * r;
    _polygon.AddVertex( new Vector2D( _x + x, _y + y ) );
    
  }

  _polygon.ComputeBounds();
  _polygon.ComputeNormalsA();

  return _polygon;

};

/**
 * 
 * @param {Polygon2D} _polygon 
 * @param {number}    _x 
 * @param {number}    _y 
 * @param {number}    _radius 
 * @param {number}    _accuracy 
 * @param {number}    _m 
 * @param {number?}   _n1 
 * @param {number?}   _n2 
 * @param {number?}   _n3 
 * 
 * @return {Polygon2D}
 */
export const Supershape2D = function ( _polygon, _x, _y, _radius, _accuracy, _m, _n1, _n2, _n3 ) {

  let i = 0;
  let x;
  let y;
  let a;
  let r;
  let t1;
  let t2;
  const l = _accuracy;
  const c = Supershape2D.C;

  _n1 = _n1 == null ? 1 : _n1;
  _n2 = _n2 == null ? 1 : _n2;
  _n3 = _n3 == null ? 1 : _n3;

  _polygon.Recreate( [] );

  for ( i; i < l; ++i ) {

    a = i * PI * 2 / _accuracy;

    t1 = Cos( _m * a / 4 ) / c._A;
    t1 = Abs( t1 );
    t1 = Pow( t1, _n2 );

    t2 = Sin( _m * a / 4 ) / c._B;
    t2 = Abs( t2 );
    t2 = Pow( t2, _n3 );

    r = Pow( t1 + t2, 1 / _n1 );

    if ( Abs( r ) === 0 ) {

      x = 0;
      y = 0;
      
    }
    else {

      r = 1 / r;
      x = Cos( a ) * r * _radius;
      y = Sin( a ) * r * _radius;
      
    }

    _polygon.AddVertex( new Vector2D( _x + x, _y + y ) );
    
  }

  _polygon.ComputeBounds();
  _polygon.ComputeNormalsA();

  return _polygon;

};

Supershape2D.C = {
  _A: 1,
  _B: 1
};
