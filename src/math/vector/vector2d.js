/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Pool } from '../../utilities/pool';

const Ceil = Math.ceil;
const Round = Math.round;
const Abs = Math.abs;
const Sqrt = Math.sqrt;
const Atan2 = Math.atan2;
const Cos = Math.cos;
const Sin = Math.sin;

export class Vector2D {

  constructor ( _x, _y ) {

    this.x = _x;
    this.y = _y;
  
  }

  static get pool () {

    return PS_pool;
  
  }

  static get USE_POOL () {

    return PS_USE_POOL;
  
  }

  static set USE_POOL ( _value ) {

    PS_USE_POOL = _value;
  
  }

  static SortMinMag ( _a, _b ) {

    return _a.GetMagnitudeSquared() - _b.GetMagnitudeSquared();
  
  }

  Copy () {

    if ( PS_USE_POOL === true ) {

      return PS_pool.Retrieve( this.x, this.y );
    
    }

    return new Vector2D( this.x, this.y );
  
  }

  FromPool ( _x, _y ) {

    if ( PS_USE_POOL === true ) {

      return PS_pool.Retrieve( _x, _y );
    
    }

    return new Vector2D( _x, _y );
  
  }

  AbsoluteCopy () {

    const vector = this.Copy();
    vector.Positive();
    return vector;
  
  }

  SetV ( _p ) {

    this.x = _p.x;
    this.y = _p.y;
  
  }

  Set ( _x, _y ) {

    this.x = _x;
    this.y = _y;
  
  }

  SetSame ( _value ) {

    this.x = _value;
    this.y = _value;
  
  }

  Is0 () {

    return this.x === 0 && this.y === 0;
  
  }

  AddVC ( _p ) {

    const vector = this.Copy();
    vector.AddV( _p );
    return vector;
  
  }

  AddV ( _p ) {

    this.x += _p.x;
    this.y += _p.y;
  
  }

  Add ( _x, _y ) {

    this.x += _x;
    this.y += _y;
  
  }

  SubtractVC ( _p ) {

    const vector = this.Copy();
    vector.SubtractV( _p );
    return vector;
  
  }

  SubtractV ( _p ) {

    this.x -= _p.x;
    this.y -= _p.y;
  
  }

  Subtract ( _x, _y ) {

    this.x -= _x;
    this.y -= _y;
  
  }

  MultiplyVC ( _p ) {

    const vector = this.Copy();
    vector.MultiplyV( _p );
    return vector;
  
  }

  MultiplyV ( _p ) {

    this.x *= _p.x;
    this.y *= _p.y;
  
  }

  Multiply ( _x, _y ) {

    this.x *= _x;
    this.y *= _y;
  
  }

  DivideVC ( _p ) {

    const vector = this.Copy();
    vector.DivideV( _p );
    return vector;
  
  }

  DivideV ( _p ) {

    this.x /= _p.x;
    this.y /= _p.y;
  
  }

  Divide ( _x, _y ) {

    this.x /= _x;
    this.y /= _y;
  
  }

  Normalize () {

    const magnitude = this.GetMagnitude();
    this.Divide( magnitude, magnitude );
  
  }

  Positive () {

    this.x = Abs( this.x );
    this.y = Abs( this.y );
  
  }

  Negative () {

    this.x = -Abs( this.x );
    this.y = -Abs( this.y );
  
  }

  Invert () {

    this.x = -this.x;
    this.y = -this.y;
  
  }

  Rotate ( _angle ) {

    const sine = Sin( _angle );
    const cosine = Cos( _angle );
    const x = this.x;
    const y = this.y;
    this.x = x * cosine - y * sine;
    this.y = x * sine + y * cosine;
  
  }

  RotateAroundV ( _p, _angle ) {

    this.SubtractV( _p );
    this.Rotate( _angle );
    this.AddV( _p );
  
  }

  RotateAround ( _x, _y, _angle ) {

    this.SubtractV( _x, _y );
    this.Rotate( _angle );
    this.AddV( _x, _y );
  
  }

  RotateAbsolute ( _angle ) {

    this.Rotate( _angle - this.GetAngle() );
  
  }

  RotateAbsoluteAroundV ( _p, _angle ) {

    this.SubtractV( _p );
    this.RotateAbsolute( _angle );
    this.AddV( _p );
  
  }

  RotateAbsoluteAround ( _x, _y, _angle ) {

    this.SubtractV( _x, _y );
    this.RotateAbsolute( _angle );
    this.AddV( _x, _y );
  
  }

  PushFromV ( _p, _magnitude ) {

    const vector = this.Copy();
    vector.SubtractV( _p );
    vector.Normalize();
    vector.Multiply( _magnitude, _magnitude );
    this.AddV( vector );
  
  }

  PushFrom ( _x, _y, _magnitude ) {

    const vector = this.Copy();
    vector.SubtractV( _x, _y );
    vector.Normalize();
    vector.Multiply( _magnitude, _magnitude );
    this.AddV( vector );
  
  }

  GetWeightedAverageV ( _p, _percentage ) {

    return this.FromPool(
      this.x * ( 1 - _percentage ) + _p.x * _percentage,
      this.y * ( 1 - _percentage ) + _p.y * _percentage
    );
  
  }

  GetWeightedAverage ( _x, _y, _percentage ) {

    return this.FromPool(
      this.x * ( 1 - _percentage ) + _x * _percentage,
      this.y * ( 1 - _percentage ) + _y * _percentage
    );
  
  }

  GetAngle () {

    return Atan2( this.y, this.x );
  
  }

  GetAngleBetweenV ( _p ) {

    return Atan2( this.y - _p.y, this.x - _p.x );
  
  }

  GetAngleBetween ( _x, _y ) {

    return Atan2( this.y - _y, this.x - _x );
  
  }

  GetDotV ( _p ) {

    return ( this.x * _p.x + this.y * _p.y );
  
  }

  GetDot ( _x, _y ) {

    return ( this.x * _x + this.y * _y );
  
  }

  GetCrossV ( _p ) {

    return ( this.x * _p.y + this.y * _p.x );
  
  }

  GetCross ( _x, _y ) {

    return ( this.x * _y + this.y * _x );
  
  }

  GetMagnitudeSquared () {

    return ( this.x * this.x + this.y * this.y );
  
  }

  GetMagnitude () {

    return Sqrt( this.x * this.x + this.y * this.y );
  
  }

  GetDistanceSquaredV ( _p ) {

    const d = this.Copy();
    d.SubtractV( _p );
    return d.GetMagnitudeSquared();
  
  }

  GetDistanceSquared ( _x, _y ) {

    const d = this.Copy();
    d.Subtract( _x, _y );
    return d.GetMagnitudeSquared();
  
  }

  GetDistanceV ( _p ) {

    const d = this.Copy();
    d.SubtractV( _p );
    return d.GetMagnitude();
  
  }

  GetDistance ( _x, _y ) {

    const d = this.Copy();
    d.Subtract( _x, _y );
    return d.GetMagnitude();
  
  }

  GetPerpendicularCCWV ( _p ) {

    return this.FromPool( -( _p.y - this.y ), _p.x - this.x );
  
  }

  GetPerpendicularCCWV ( _x, _y ) {

    return this.FromPool( -( _y - this.y ), _x - this.x );
  
  }

  GetPerpendicularCWV ( _p ) {

    return this.FromPool( _p.y - this.y, -( _p.x - this.x ) );
  
  }

  GetPerpendicularCW ( _x, _y ) {

    return this.FromPool( _y - this.y, -( _x - this.x ) );
  
  }

  GetNormalAV ( _p ) {

    const normal = this.GetPerpendicularCCWV( _p );
    normal.Normalize();
    return normal;
  
  }

  GetNormalA ( _x, _y ) {

    const normal = this.GetPerpendicularCCW( _x, _y );
    normal.Normalize();
    return normal;
  
  }

  GetNormalBV ( _p ) {

    const normal = this.GetPerpendicularCWV( _p );
    normal.Normalize();
    return normal;
  
  }

  GetNormalB ( _x, _y ) {

    const normal = this.GetPerpendicularCW( _x, _y );
    normal.Normalize();
    return normal;
  
  }

  GetMidpointV ( _p ) {

    const midpoint = this.Copy();
    midpoint.AddV( _p );
    midpoint.Divide( 2, 2 );
    return midpoint;
  
  }

  GetMidpoint ( _x, _y ) {

    const midpoint = this.Copy();
    midpoint.Add( _x, _y );
    midpoint.Multiply( 0.5, 0.5 );
    return midpoint;
  
  }

  IsEqualToV ( _p ) {

    return ( this.x === _p.x && this.y === _p.y );
  
  }

  IsEqualTo ( _x, _y ) {

    return ( this.x === _x && this.y === _y );
  
  }

  GetProjectionOntoV ( _vector2d ) {

    const dot = this.GetDotV( _vector2d );
    if ( dot === 0 ) return this.FromPool( 0, 0 );
    const magnitude = _vector2d.GetMagnitude();
    const scale = dot / ( magnitude * magnitude );
    const projection = _vector2d.Copy();
    projection.Multiply( scale, scale );
    return projection;
  
  }

  GetProjectionOnto ( _x, _y ) {

    const projection = this.Copy();
    projection.Set( _x, _y );
    const dot = this.GetDotV( projection );
    if ( dot === 0 ) return this.FromPool( 0, 0 );
    const magnitude = projection.GetMagnitude();
    const scale = dot / ( magnitude * magnitude );
    projection.Multiply( scale, scale );
    return projection;
  
  }

  GetReflectionV ( _vector2d ) {

    const reflection = _vector2d.Copy();
    const dot = this.GetDotV( reflection );
    reflection.Multiply( 2, 2 );
    reflection.Multiply( dot, dot );
    return this.SubtractVC( reflection );

  }

  GetReflection ( _x, _y ) {
 
    const reflection = this.Copy();
    reflection.Set( _x, _y );
    const dot = this.GetDotV( reflection );
    reflection.Multiply( 2, 2 );
    reflection.Multiply( dot, dot );
    return this.SubtractVC( reflection );
  
  }

  Store () {

    PS_pool.Store( this );
  
  }

  AddTo ( _vectors ) {

    let i = 0;
    const l = _vectors.length;

    for ( ; i < l; ++i ) {

      _vectors[i].AddV( this );

    }
  
  }

  Floor () {

    this.x = this.x | 0;
    this.y = this.y | 0;
  
  }

  Ceil () {

    this.x = Ceil( this.x );
    this.y = Ceil( this.y );
  
  }

  Round () {

    this.x = Round( this.x );
    this.y = Round( this.y );
  
  }

  GetMinMaxDot ( _vectors ) {

    let min = Infinity;
    let max = -min;
    let dot = 0;
    let i = 0;
    const l = _vectors.length;
    const result = this.Copy();

    for ( ; i < l; ++i ) {

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
const PS_pool = new Pool( Vector2D );
let PS_USE_POOL = true;

PS_pool.Retrieve = function ( _x, _y ) {

  this.PreRetrieve();

  const vector = this.objects.pop();
  vector.Set( _x, _y );
  return vector;

};

PS_pool.Flood( ( _vector2d ) => {

  _vector2d.Set( 0, 0 );

}, 1000 );
// <----- Private static
