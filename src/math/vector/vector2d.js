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

  SetV ( _vector ) {

    this.x = _vector.x;
    this.y = _vector.y;
  
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

  AddVC ( _vector ) {

    const vector = this.Copy();
    vector.AddV( _vector );
    return vector;
  
  }

  AddV ( _vector ) {

    this.x += _vector.x;
    this.y += _vector.y;
  
  }

  Add ( _x, _y ) {

    this.x += _x;
    this.y += _y;
  
  }

  SubtractVC ( _vector ) {

    const vector = this.Copy();
    vector.SubtractV( _vector );
    return vector;
  
  }

  SubtractV ( _vector ) {

    this.x -= _vector.x;
    this.y -= _vector.y;
  
  }

  Subtract ( _x, _y ) {

    this.x -= _x;
    this.y -= _y;
  
  }

  MultiplyVC ( _vector ) {

    const vector = this.Copy();
    vector.MultiplyV( _vector );
    return vector;
  
  }

  MultiplyV ( _vector ) {

    this.x *= _vector.x;
    this.y *= _vector.y;
  
  }

  Multiply ( _x, _y ) {

    this.x *= _x;
    this.y *= _y;
  
  }

  DivideVC ( _vector ) {

    const vector = this.Copy();
    vector.DivideV( _vector );
    return vector;
  
  }

  DivideV ( _vector ) {

    this.x /= _vector.x;
    this.y /= _vector.y;
  
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

  RotateAroundV ( _vector, _angle ) {

    this.SubtractV( _vector );
    this.Rotate( _angle );
    this.AddV( _vector );
  
  }

  RotateAround ( _x, _y, _angle ) {

    this.SubtractV( _x, _y );
    this.Rotate( _angle );
    this.AddV( _x, _y );
  
  }

  RotateAbsolute ( _angle ) {

    this.Rotate( _angle - this.GetAngle() );
  
  }

  RotateAbsoluteAroundV ( _vector, _angle ) {

    this.SubtractV( _vector );
    this.RotateAbsolute( _angle );
    this.AddV( _vector );
  
  }

  RotateAbsoluteAround ( _x, _y, _angle ) {

    this.SubtractV( _x, _y );
    this.RotateAbsolute( _angle );
    this.AddV( _x, _y );
  
  }

  PushFromV ( _vector, _magnitude ) {

    const vector = this.Copy();
    vector.SubtractV( _vector );
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

  GetWeightedAverageV ( _vector, _percentage ) {

    return this.FromPool(
      this.x * ( 1 - _percentage ) + _vector.x * _percentage,
      this.y * ( 1 - _percentage ) + _vector.y * _percentage
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

  GetAngleBetweenV ( _vector ) {

    return Atan2( this.y - _vector.y, this.x - _vector.x );
  
  }

  GetAngleBetween ( _x, _y ) {

    return Atan2( this.y - _y, this.x - _x );
  
  }

  GetDotV ( _vector ) {

    return ( this.x * _vector.x + this.y * _vector.y );
  
  }

  GetDot ( _x, _y ) {

    return ( this.x * _x + this.y * _y );
  
  }

  GetCrossV ( _vector ) {

    return ( this.x * _vector.y + this.y * _vector.x );
  
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

  GetDistanceSquaredV ( _vector ) {

    const d = this.Copy();
    d.SubtractV( _vector );
    return d.GetMagnitudeSquared();
  
  }

  GetDistanceSquared ( _x, _y ) {

    const d = this.Copy();
    d.Subtract( _x, _y );
    return d.GetMagnitudeSquared();
  
  }

  GetDistanceV ( _vector ) {

    const d = this.Copy();
    d.SubtractV( _vector );
    return d.GetMagnitude();
  
  }

  GetDistance ( _x, _y ) {

    const d = this.Copy();
    d.Subtract( _x, _y );
    return d.GetMagnitude();
  
  }

  GetPerpendicularCCWV ( _vector ) {

    return this.FromPool( -( _vector.y - this.y ), _vector.x - this.x );
  
  }

  GetPerpendicularCCWV ( _x, _y ) {

    return this.FromPool( -( _y - this.y ), _x - this.x );
  
  }

  GetPerpendicularCWV ( _vector ) {

    return this.FromPool( _vector.y - this.y, -( _vector.x - this.x ) );
  
  }

  GetPerpendicularCW ( _x, _y ) {

    return this.FromPool( _y - this.y, -( _x - this.x ) );
  
  }

  GetNormalAV ( _vector ) {

    const normal = this.GetPerpendicularCCWV( _vector );
    normal.Normalize();
    return normal;
  
  }

  GetNormalA ( _x, _y ) {

    const normal = this.GetPerpendicularCCW( _x, _y );
    normal.Normalize();
    return normal;
  
  }

  GetNormalBV ( _vector ) {

    const normal = this.GetPerpendicularCWV( _vector );
    normal.Normalize();
    return normal;
  
  }

  GetNormalB ( _x, _y ) {

    const normal = this.GetPerpendicularCW( _x, _y );
    normal.Normalize();
    return normal;
  
  }

  GetMidpointV ( _vector ) {

    const midpoint = this.Copy();
    midpoint.AddV( _vector );
    midpoint.Divide( 2, 2 );
    return midpoint;
  
  }

  GetMidpoint ( _x, _y ) {

    const midpoint = this.Copy();
    midpoint.Add( _x, _y );
    midpoint.Multiply( 0.5, 0.5 );
    return midpoint;
  
  }

  IsEqualToV ( _vector ) {

    return ( this.x === _vector.x && this.y === _vector.y );
  
  }

  IsEqualTo ( _x, _y ) {

    return ( this.x === _x && this.y === _y );
  
  }

  GetProjectionOntoV ( _vector ) {

    const dot = this.GetDotV( _vector );
    if ( dot === 0 ) return this.FromPool( 0, 0 );
    const magnitude = _vector.GetMagnitude();
    const scale = dot / ( magnitude * magnitude );
    const projection = _vector.Copy();
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

  GetReflectionV ( _vector ) {

    const reflection = _vector.Copy();
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

PS_pool.Flood( ( _vector ) => {

  _vector.Set( 0, 0 );

}, 1000 );
// <----- Private static
