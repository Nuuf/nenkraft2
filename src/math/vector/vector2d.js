/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Pool } from '../../utility/pool';

const Ceil = Math.ceil;
const Round = Math.round;
const Abs = Math.abs;
const Sqrt = Math.sqrt;
const Atan2 = Math.atan2;
const Cos = Math.cos;
const Sin = Math.sin;

export class Vector2D {

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   */
  constructor ( _x, _y ) {

    this.x = _x;
    this.y = _y;
  
  }

  /**
   * 
   * @return {Pool}
   */
  static get pool () {

    return PS_pool;
  
  }

  /**
   * 
   * @return {boolean}
   */
  static get USE_POOL () {

    return PS_USE_POOL;
  
  }

  /**
   * @param {boolean} _value
   */
  static set USE_POOL ( _value ) {

    PS_USE_POOL = !!_value;
  
  }

  /**
   * 
   * @param {Vector2D} _a 
   * @param {Vector2D} _b 
   * 
   * @return {number}
   */
  static SortMinMag ( _a, _b ) {

    return _a.GetMagnitudeSquared() - _b.GetMagnitudeSquared();
  
  }

  /**
   * 
   * @return {Vector2D}
   */
  Copy () {

    if ( PS_USE_POOL === true ) {

      return PS_pool.Retrieve( this.x, this.y );
    
    }

    return new Vector2D( this.x, this.y );
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y
   * 
   * @return {Vector2D} 
   */
  FromPool ( _x, _y ) {

    if ( PS_USE_POOL === true ) {

      return PS_pool.Retrieve( _x, _y );
    
    }

    return new Vector2D( _x, _y );
  
  }

  /**
   * 
   * @return {Vector2D}
   */
  AbsoluteCopy () {

    return this.Copy().Positive();
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * 
   * @return {this}
   */
  SetV ( _p ) {

    this.x = _p.x;
    this.y = _p.y;

    return this;
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   * 
   * @return {this}
   */
  Set ( _x, _y ) {

    this.x = _x;
    this.y = _y;

    return this;
  
  }

  /**
   * 
   * @param {number} _value
   * 
   * @return {this} 
   */
  SetSame ( _value ) {

    this.x = _value;
    this.y = _value;

    return this;
  
  }

  /**
   * 
   * @return {boolean}
   */
  Is0 () {

    return this.x === 0 && this.y === 0;
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * 
   * @return {this}
   */
  AddVC ( _p ) {

    return this.Copy().AddV( _p );
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * 
   * @return {this}
   */
  AddV ( _p ) {

    this.x += _p.x;
    this.y += _p.y;

    return this;
  
  }
  
  /**
   * 
   * @param {number} _x 
   * @param {number} _y
   * 
   * @return {this} 
   */
  Add ( _x, _y ) {

    this.x += _x;
    this.y += _y;

    return this;
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * 
   * @return {this}
   */
  SubtractVC ( _p ) {

    return this.Copy().SubtractV( _p );

  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * 
   * @return {this}
   */
  SubtractV ( _p ) {

    this.x -= _p.x;
    this.y -= _p.y;

    return this;
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y
   * 
   * @return {this} 
   */
  Subtract ( _x, _y ) {

    this.x -= _x;
    this.y -= _y;

    return this;
  
  }

  /**
   *
   * @param {object|Vector2D|Point} _p 
   *
   * @return {this}
   */
  MultiplyVC ( _p ) {

    return this.Copy().MultiplyV( _p );

  }

  /**
   *
   * @param {object|Vector2D|Point} _p 
   *
   * @return {this}
   */
  MultiplyV ( _p ) {

    this.x *= _p.x;
    this.y *= _p.y;

    return this;
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y
   * 
   * @return {this} 
   */
  Multiply ( _x, _y ) {

    this.x *= _x;
    this.y *= _y;

    return this;
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * 
   * @return {this}
   */
  DivideVC ( _p ) {

    return this.Copy().DivideV( _p );
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * 
   * @return {this}
   */
  DivideV ( _p ) {

    this.x /= _p.x;
    this.y /= _p.y;

    return this;
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y
   * 
   * @return {this} 
   */
  Divide ( _x, _y ) {

    this.x /= _x;
    this.y /= _y;

    return this;
  
  }

  /**
   * 
   * @return {this}
   */
  Normalize () {

    const magnitude = this.GetMagnitude();

    return this.Divide( magnitude, magnitude );
  
  }

  /**
   * 
   * @return {this}
   */
  Positive () {

    this.x = Abs( this.x );
    this.y = Abs( this.y );

    return this;
  
  }

  /**
   * 
   * @return {this}
   */
  Negative () {

    this.x = -Abs( this.x );
    this.y = -Abs( this.y );

    return this;
  
  }

  /**
   * 
   * @return {this}
   */
  Invert () {

    this.x = -this.x;
    this.y = -this.y;

    return this;
  
  }

  /**
   * 
   * @param {number} _angle
   * 
   * @return {this} 
   */
  Rotate ( _angle ) {

    const sine = Sin( _angle );
    const cosine = Cos( _angle );
    const x = this.x;
    const y = this.y;

    this.x = x * cosine - y * sine;
    this.y = x * sine + y * cosine;

    return this;
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * @param {number} _angle 
   * 
   * @return {this}
   */
  RotateAroundV ( _p, _angle ) {

    return this.SubtractV( _p ).Rotate( _angle ).AddV( _p );
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   * @param {number} _angle
   * 
   * @return {this} 
   */
  RotateAround ( _x, _y, _angle ) {

    return this.SubtractV( _x, _y ).Rotate( _angle ).AddV( _x, _y );
  
  }

  /**
   * 
   * @param {number} _angle
   * 
   * @return {this} 
   */
  RotateAbsolute ( _angle ) {

    return this.Rotate( _angle - this.GetAngle() );
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * @param {number} _angle
   * 
   * @return {this} 
   */
  RotateAbsoluteAroundV ( _p, _angle ) {

    return this.SubtractV( _p ).RotateAbsolute( _angle ).AddV( _p );
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   * @param {number} _angle
   * 
   * @return {this} 
   */
  RotateAbsoluteAround ( _x, _y, _angle ) {

    return this.SubtractV( _x, _y ).RotateAbsolute( _angle ).AddV( _x, _y );
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * @param {number} _magnitude
   * 
   * @return {this} 
   */
  PushFromV ( _p, _magnitude ) {

    PS_a.SetV( this ).SubtractV( _p ).Normalize().Multiply( _magnitude, _magnitude );

    return this.AddV( PS_a );

  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   * @param {number} _magnitude
   * 
   * @return {this} 
   */
  PushFrom ( _x, _y, _magnitude ) {

    PS_a.SetV( this ).SubtractV( _x, _y ).Normalize().Multiply( _magnitude, _magnitude );

    return this.AddV( PS_a );
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * @param {number} _percentage
   * 
   * @return {Vector2D} 
   */
  GetWeightedAverageV ( _p, _percentage ) {

    return this.FromPool(
      this.x * ( 1 - _percentage ) + _p.x * _percentage,
      this.y * ( 1 - _percentage ) + _p.y * _percentage
    );
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   * @param {number} _percentage
   * 
   * @return {Vector2D} 
   */
  GetWeightedAverage ( _x, _y, _percentage ) {

    return this.FromPool(
      this.x * ( 1 - _percentage ) + _x * _percentage,
      this.y * ( 1 - _percentage ) + _y * _percentage
    );
  
  }

  /**
   * 
   * @return {number}
   */
  GetAngle () {

    return Atan2( this.y, this.x );
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * 
   * @return {number}
   */
  GetAngleBetweenV ( _p ) {

    return Atan2( this.y - _p.y, this.x - _p.x );
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y
   * 
   * @return {number} 
   */
  GetAngleBetween ( _x, _y ) {

    return Atan2( this.y - _y, this.x - _x );
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * 
   * @return {number}
   */
  GetDotV ( _p ) {

    return ( this.x * _p.x + this.y * _p.y );
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y
   * 
   * @return {void} 
   */
  GetDot ( _x, _y ) {

    return ( this.x * _x + this.y * _y );
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p
   * 
   * @return {number} 
   */
  GetCrossV ( _p ) {

    return ( this.x * _p.y + this.y * _p.x );
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y
   * 
   * @return {number} 
   */
  GetCross ( _x, _y ) {

    return ( this.x * _y + this.y * _x );
  
  }

  /**
   * 
   * @return {number}
   */
  GetMagnitudeSquared () {

    return ( this.x * this.x + this.y * this.y );
  
  }

  /**
   * 
   * @return {number}
   */
  GetMagnitude () {

    return Sqrt( this.x * this.x + this.y * this.y );
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * 
   * @return {number}
   */
  GetDistanceSquaredV ( _p ) {

    return PS_a.SetV( this ).SubtractV( _p ).GetMagnitudeSquared();
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y
   * 
   * @return {number} 
   */
  GetDistanceSquared ( _x, _y ) {

    return PS_a.SetV( this ).Subtract( _x, _y ).GetMagnitudeSquared();
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * 
   * @return {number}
   */
  GetDistanceV ( _p ) {

    return PS_a.SetV( this ).SubtractV( _p ).GetMagnitude();
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   * 
   * @return {number}
   */
  GetDistance ( _x, _y ) {

    return PS_a.SetV( this ).Subtract( _x, _y ).GetMagnitude();
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * 
   * @return {Vector2D}
   */
  GetPerpendicularCCWV ( _p ) {

    return this.FromPool( -( _p.y - this.y ), _p.x - this.x );
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y
   * 
   * @return {Vector2D} 
   */
  GetPerpendicularCCW ( _x, _y ) {

    return this.FromPool( -( _y - this.y ), _x - this.x );
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * 
   * @return {Vector2D}
   */
  GetPerpendicularCWV ( _p ) {

    return this.FromPool( _p.y - this.y, -( _p.x - this.x ) );
  
  }

  /**
   *
   * @param {number} _x 
   * @param {number} _y
   *
   * @return {Vector2D} 
   */
  GetPerpendicularCW ( _x, _y ) {

    return this.FromPool( _y - this.y, -( _x - this.x ) );
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * 
   * @return {Vector2D}
   */
  GetNormalAV ( _p ) {

    return this.GetPerpendicularCCWV( _p ).Normalize();
  
  }

  /**
   *
   * @param {number} _x 
   * @param {number} _y
   *
   * @return {Vector2D} 
   */
  GetNormalA ( _x, _y ) {

    return this.GetPerpendicularCCW( _x, _y ).Normalize();
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * 
   * @return {Vector2D}
   */
  GetNormalBV ( _p ) {

    return this.GetPerpendicularCWV( _p ).Normalize();
  
  }

  /**
   *
   * @param {number} _x 
   * @param {number} _y
   *
   * @return {Vector2D} 
   */
  GetNormalB ( _x, _y ) {

    return this.GetPerpendicularCW( _x, _y ).Normalize();
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * 
   * @return {Vector2D}
   */
  GetMidpointV ( _p ) {

    return this.Copy().AddV( _p ).Multiply( 0.5, 0.5 );
  
  }

  /**
   *
   * @param {number} _x 
   * @param {number} _y
   *
   * @return {Vector2D} 
   */
  GetMidpoint ( _x, _y ) {

    return this.Copy().Add( _x, _y ).Multiply( 0.5, 0.5 );
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * 
   * @return {boolean}
   */
  IsEqualToV ( _p ) {

    return ( this.x === _p.x && this.y === _p.y );
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y
   * 
   * @return {boolean} 
   */
  IsEqualTo ( _x, _y ) {

    return ( this.x === _x && this.y === _y );
  
  }

  /**
   * 
   * @param {Vector2D} _vector2d 
   * 
   * @return {Vector2D}
   */
  GetProjectionOntoV ( _vector2d ) {

    const dot = this.GetDotV( _vector2d );

    if ( dot === 0 ) return this.FromPool( 0, 0 );

    const magnitude = _vector2d.GetMagnitude();
    const scale = dot / ( magnitude * magnitude );

    return _vector2d.Copy().Multiply( scale, scale );
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y
   * 
   * @return {Vector2D} 
   */
  GetProjectionOnto ( _x, _y ) {

    const projection = this.Copy();

    projection.Set( _x, _y );

    const dot = this.GetDotV( projection );

    if ( dot === 0 ) return projection.SetSame( 0 );

    const magnitude = projection.GetMagnitude();
    const scale = dot / ( magnitude * magnitude );

    return projection.Multiply( scale, scale );
  
  }

  /**
   * 
   * @param {Vector2D} _vector2d 
   * 
   * @return {Vector2D}
   */
  GetReflectionV ( _vector2d ) {

    const reflection = _vector2d.Copy();
    const dot = this.GetDotV( reflection );

    reflection.Multiply( 2, 2 ).Multiply( dot, dot );

    return this.SubtractVC( reflection );

  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   * 
   * @return {Vector2D}
   */
  GetReflection ( _x, _y ) {
 
    const reflection = this.Copy();

    reflection.Set( _x, _y );

    const dot = this.GetDotV( reflection );

    reflection.Multiply( 2, 2 ).Multiply( dot, dot );

    return this.SubtractVC( reflection );
  
  }

  /**
   * 
   * @return {this}
   */
  Store () {

    PS_pool.Store( this );

    return this;
  
  }

  /**
   * 
   * @param {Vector2D[]} _vectors 
   * 
   * @return {this}
   */
  AddTo ( _vectors ) {

    for ( var i = 0 ; i < _vectors.length; ++i ) {

      _vectors[ i ].AddV( this );

    }

    return this;
  
  }

  /**
   * 
   * @return {this}
   */
  Floor () {

    this.x = this.x | 0;
    this.y = this.y | 0;

    return this;
  
  }

  /**
   * 
   * @return {this}
   */
  Ceil () {

    this.x = Ceil( this.x );
    this.y = Ceil( this.y );

    return this;
  
  }

  /**
   * 
   * @return {this}
   */
  Round () {

    this.x = Round( this.x );
    this.y = Round( this.y );

    return this;
  
  }

  /**
   * 
   * @param {Vector2D[]} _vectors 
   * 
   * @return {Vector2D}
   */
  GetMinMaxDot ( _vectors ) {

    let min = Infinity;
    let max = -min;
    let dot = 0;
    const result = this.Copy();

    for ( var i = 0; i < _vectors.length; ++i ) {

      dot = _vectors[ i ].GetDotV( this );

      if ( dot > max ) {

        max = dot;
      
      }

      if ( dot < min ) {

        min = dot;
      
      }
    
    }

    result.Set( min, max );

    return result;
  
  }

}

// Private Static ----->
const PS_pool = new Pool();
let PS_USE_POOL = true;

PS_pool.Retrieve = function ( _x, _y ) {

  this.PreRetrieve();

  return this.objects.pop().Set( _x, _y );

};

PS_pool.Flood( () => {

  return new Vector2D( 0, 0 );

}, 1000 );
const PS_a = new Vector2D( 0, 0 );
// <----- Private Static
