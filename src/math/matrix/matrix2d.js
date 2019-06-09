/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

const Cos = Math.cos;
const Sin = Math.sin;
const Atan2 = Math.atan2;
const Sqrt = Math.sqrt;
const Abs = Math.abs;
const { PI } = Math;

export class Matrix2D {

  /**
   * 
   */
  constructor () {

    this.array = new Float32Array( 9 );
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.e = 0;
    this.f = 0;
  
  }

  /**
   *
   * @return {void}
   */
  Identity () {

    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.e = 0;
    this.f = 0;
  
  }

  /**
   * 
   * @return {Matrix2D}
   */
  Copy () {

    const matrix = new Matrix2D();

    matrix.Set( this.a, this.b, this.c, this.d, this.e, this.f );

    return matrix;
  
  }

  /**
   * 
   * @param {number} _a 
   * @param {number} _b 
   * @param {number} _c 
   * @param {number} _d 
   * @param {number} _e 
   * @param {number} _f 
   * 
   * @return {this}
   */
  Set ( _a, _b, _c, _d, _e, _f ) {

    this.a = _a;
    this.b = _b;
    this.c = _c;
    this.d = _d;
    this.e = _e;
    this.f = _f;

    return this;
  
  }

  /**
   * 
   * @param {number?} _x 
   * @param {number?} _y 
   * @param {number?} _sx 
   * @param {number?} _sy 
   * @param {number?} _r 
   * @param {number?} _skx 
   * @param {number?} _sky 
   * @param {number?} _px 
   * @param {number?} _py 
   * 
   * @return {this}
   */
  SetTransform ( _x, _y, _sx, _sy, _r, _skx, _sky, _px, _py ) {

    _x = _x == null ? 0 : _x;
    _y = _y == null ? 0 : _y;
    _sx = _sx == null ? 1 : _sx;
    _sy = _sy == null ? 1 : _sy;
    _r = _r == null ? 0 : _r;
    _skx = _skx == null ? 0 : _skx;
    _sky = _sky == null ? 0 : _sky;
    _px = _px == null ? 0 : _px;
    _py = _py == null ? 0 : _py;

    const sr = Sin( _r );
    const cr = Cos( _r );
    const sskx = -Sin( _skx );
    const cskx = Cos( _skx );
    const ssky = Sin( _sky );
    const csky = Cos( _sky );
    const a = cr * _sx;
    const b = sr * _sx;
    const c = -sr * _sy;
    const d = cr * _sy;

    this.a = csky * a + ssky * c;
    this.b = csky * b + ssky * d;
    this.c = sskx * a + cskx * c;
    this.d = sskx * b + cskx * d;
    this.e = _x + _px * a + _py * c;
    this.f = _y + _px * b + _py * d;

    return this;
  
  }

  /**
   * 
   * @param {Matrix2D} _matrixA
   * @param {Matrix2D} _matrixB
   * 
   * @return {this}
   */
  Multiply ( _matrixA, _matrixB ) {

    this.a = _matrixA.a * _matrixB.a + _matrixA.b * _matrixB.c;
    this.b = _matrixA.a * _matrixB.b + _matrixA.b * _matrixB.d;
    this.c = _matrixA.c * _matrixB.a + _matrixA.d * _matrixB.c;
    this.d = _matrixA.c * _matrixB.b + _matrixA.d * _matrixB.d;
    this.e = _matrixA.e * _matrixB.a + _matrixA.f * _matrixB.c + _matrixB.e;
    this.f = _matrixA.e * _matrixB.b + _matrixA.f * _matrixB.d + _matrixB.f;

    return this;

  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   * 
   * @return {this}
   */
  Translate ( _x, _y ) {

    this.e += _x;
    this.f += _y;

    return this;
  
  }

  /**
   *
   * @param {number} _x 
   * @param {number} _y 
   *
   * @return {this}
   */
  TranslateTo ( _x, _y ) {

    this.e = _x;
    this.f = _y;

    return this;
  
  }

  /**
   *
   * @param {number} _x 
   * @param {number} _y 
   *
   * @return {this}
   */
  ApplyTranslation ( _x, _y ) {

    this.e = _x * this.a + _y * this.c + this.e;
    this.f = _x * this.b + _y * this.d + this.f;

    return this;
  
  }

  /**
   *
   * @param {number} _x 
   * @param {number} _y 
   *
   * @return {this}
   */
  ApplyScale ( _x, _y ) {

    this.a *= _x;
    this.b *= _y;
    this.c *= _x;
    this.d *= _y;

    return this;
  
  }

  /**
   *
   * @param {number} _x 
   * @param {number} _y 
   *
   * @return {this}
   */
  Scale ( _x, _y ) {

    this.a *= _x;
    this.b *= _y;
    this.c *= _x;
    this.d *= _y;
    this.e *= _x;
    this.f *= _y;

    return this;
  
  }

  /**
   * 
   * @param {number} _angle
   * 
   * @return {this} 
   */
  Rotate ( _angle ) {

    const sa = Sin( _angle );
    const ca = Cos( _angle );
    const { a } = this;
    const { c } = this;
    const { e } = this;

    this.a = a * ca - this.b * sa;
    this.b = a * sa + this.b * ca;
    this.c = c * ca - this.d * sa;
    this.d = c * sa + this.d * ca;
    this.e = e * ca - this.f * sa;
    this.f = e * sa + this.f * ca;

    return this;
  
  }

  /**
   *
   * @param {Transform2D} _transform 
   * 
   * @return {this}
   */
  Decompose ( _transform ) {

    const { a } = this;
    const { b } = this;
    const { c } = this;
    const { d } = this;
    const skx = -Atan2( -c, d );
    const sky = Atan2( b, a );
    const delta = Abs( skx + sky );

    if ( delta < PS_EPSILON ) {

      _transform.rotation = sky;

      if ( a < 0 && d >= 0 ) {

        _transform.rotation += PI;
      
      }

      _transform.skew.SetSame( 0 );
    
    } else {

      _transform.skew.Set( skx, sky );
    
    }

    _transform.scale.Set( Sqrt( a * a + b * b ), Sqrt( c * c + d * d ) );
    _transform.position.Set( this.e, this.f );

    return this;
  
  }

  /**
   * 
   * @param {CanvasRenderingContext2D} _rc 
   * 
   * @return {this}
   */
  ApplyToContext ( _rc ) {

    _rc.setTransform( this.a, this.b, this.c, this.d, this.e, this.f );

    return this;
  
  }

  /**
   * 
   * @param {boolean?} _transpose 
   * 
   * @return {Float32Array}
   */
  AsArray ( _transpose ) {

    const { array } = this;

    if ( _transpose === true ) {

      array[ 0 ] = this.a;
      array[ 1 ] = this.b;
      array[ 2 ] = 0;
      array[ 3 ] = this.c;
      array[ 4 ] = this.d;
      array[ 5 ] = 0;
      array[ 6 ] = this.e;
      array[ 7 ] = this.f;
      array[ 8 ] = 1;
    
    } else {

      array[ 0 ] = this.a;
      array[ 1 ] = this.c;
      array[ 2 ] = this.e;
      array[ 3 ] = this.b;
      array[ 4 ] = this.d;
      array[ 5 ] = this.f;
      array[ 6 ] = 0;
      array[ 7 ] = 0;
      array[ 8 ] = 1;
    
    }

    return array;
  
  }

}

// Private Static ----->
const PS_EPSILON = 0.01;
// <----- Private Static
