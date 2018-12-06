/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../../math/vector/vector2d';
import { Line2DLine2DIntersection, ClosestPoint2DOnLine2D } from '../../math/misc';

const Abs = Math.abs;

export class Line2D {

  constructor ( _sx, _sy, _ex, _ey ) {

    this.s = new Vector2D( _sx, _sy );
    this.e = new Vector2D( _ex, _ey );
    this.epsilon = 1000;
    this.belongsTo = null;
    this.TYPE = PS_TYPE;

  }

  Set ( _sx, _sy, _ex, _ey ) {

    this.s.Set( _sx, _sy );
    this.e.Set( _ex, _ey );

    return this;

  }

  SetC ( _line2d ) {

    this.s.SetV( _line2d.s );
    this.e.SetV( _line2d.e );

    return this;
  
  }

  SetPosition ( _x, _y ) {

    const nex = _x + Abs( this.e.x - this.s.x );
    const ney = _y + Abs( this.e.y - this.s.y );

    this.s.Set( _x, _y );
    this.e.Set( nex, ney );

    return this;

  }

  GetPosition () {

    return this.s;
  
  }

  Stretch ( _magnitude ) {

    const hm = _magnitude * 0.5;

    this.s.PushFromV( this.e, hm );
    this.e.PushFromV( this.s, hm );

    return this;
  
  }

  Rotate ( _angle, _anchorX, _anchorY ) {

    _anchorX = _anchorX == null ? 0.5 : _anchorX;

    PS_ap
      .SetV( this.s )
      .AddV( this.e )
      .Multiply( 
        _anchorX,
        _anchorY == null ? _anchorX : _anchorY
      );
    this.s.RotateAroundV( PS_ap, _angle );
    this.e.RotateAroundV( PS_ap, _angle );

    return this;
  
  }

  Cut ( _cuts, _points ) {

    if ( _points == null ) _points = [];

    for ( var i = 0; i < _cuts.length; ++i ) {

      _points.push( this.s.GetWeightedAverageV( this.e, _cuts[ i ] ) );
    
    }

    return _points;
  
  }

  GetLength () {

    return this.s.GetDistanceV( this.e );
  
  }

  GetLengthSquared () {

    return this.s.GetDistanceSquaredV( this.e );
  
  }

  IntersectsPoint2D ( _p ) {

    const s = this.s;
    const e = this.e;
    const cross = ( _p.y - s.y ) * ( e.x - s.x ) - ( _p.x - s.x ) * ( e.y - s.y );

    if ( Math.abs( cross ) > this.epsilon ) {

      return false;
    
    }

    const dot = ( _p.x - s.x ) * ( e.x - s.x ) + ( _p.y - s.y ) * ( e.y - s.y );

    if ( dot < 0 ) {

      return false;
    
    }

    if ( dot > this.GetLengthSquared() ) {

      return false;
    
    }

    return true;
  
  }

  IntersectsLine2D ( _line ) {

    return Line2DLine2DIntersection( this.s, this.e, _line.s, _line.e );
  
  }

  GetClosestPoint2DTo ( _p ) {

    return ClosestPoint2DOnLine2D( this.s, this.e, _p );
  
  }

  GetNormalA () {

    return this.s.GetNormalAV( this.e );
  
  }

  GetNormalB () {

    return this.s.GetNormalBV( this.e );
  
  }

}

// Private Static ----->
const PS_TYPE = 0;
const PS_ap = new Vector2D( 0, 0 );
// <----- Private Static
