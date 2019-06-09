/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../../math/vector/vector2d';
import { Line2DLine2DIntersection, ClosestPoint2DOnLine2D } from '../../math/misc';

const Abs = Math.abs;

export class Line2D {

  /**
   * 
   * @param {number} _sx 
   * @param {number} _sy 
   * @param {number} _ex 
   * @param {number} _ey 
   */
  constructor ( _sx, _sy, _ex, _ey ) {

    this.s = new Vector2D( _sx, _sy );
    this.e = new Vector2D( _ex, _ey );
    this.epsilon = 1000;
    this.belongsTo = null;
    this.TYPE = PS_TYPE;

  }

  /**
   *
   * @return {integer}
   */
  static get TYPE () {

    return PS_TYPE;
  
  }

  /**
   * 
   * @return {Line2D}
   */
  Copy () {

    const o = new Line2D();

    return o.SetC( this );
  
  }

  /**
   * 
   * @param {number} _sx 
   * @param {number} _sy 
   * @param {number} _ex 
   * @param {number} _ey 
   * 
   * @return {this}
   */
  Set ( _sx, _sy, _ex, _ey ) {

    this.s.Set( _sx, _sy );
    this.e.Set( _ex, _ey );

    return this;

  }

  /**
   * 
   * @param {Line2D} _line2d 
   * 
   * @return {this}
   */
  SetC ( _line2d ) {

    this.s.SetV( _line2d.s );
    this.e.SetV( _line2d.e );

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

    const nex = _x + Abs( this.e.x - this.s.x );
    const ney = _y + Abs( this.e.y - this.s.y );

    this.s.Set( _x, _y );
    this.e.Set( nex, ney );

    return this;

  }

  /**
   * 
   * @return {Vector2D}
   */
  GetPosition () {

    return this.s;
  
  }

  /**
   * 
   * @param {number} _magnitude 
   * 
   * @return {this}
   */
  Stretch ( _magnitude ) {

    const hm = _magnitude * 0.5;

    this.s.PushFromV( this.e, hm );
    this.e.PushFromV( this.s, hm );

    return this;
  
  }

  /**
   * 
   * @param {number} _angle 
   * @param {number} _anchorX 
   * @param {number} _anchorY 
   * 
   * @return {this}
   */
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

  /**
   * 
   * @param {Vector2D[]} _cuts 
   * @param {Array?}     _points 
   * 
   * @return {Vector2D[]}
   */
  Cut ( _cuts, _points ) {

    if ( _points == null ) _points = [];

    for ( var i = 0; i < _cuts.length; ++i ) {

      _points.push( this.s.GetWeightedAverageV( this.e, _cuts[ i ] ) );
    
    }

    return _points;
  
  }

  /**
   * 
   * @return {number}
   */
  GetLength () {

    return this.s.GetDistanceV( this.e );
  
  }

  /**
   * 
   * @return {number}
   */
  GetLengthSquared () {

    return this.s.GetDistanceSquaredV( this.e );
  
  }

  /**
   * 
   * @param {object|Vector2D|Point} _p 
   * 
   * @return {boolean}
   */
  IntersectsPoint2D ( _p ) {

    const { s } = this;
    const { e } = this;
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

  /**
   * 
   * @param {Line2D} _line 
   * 
   * @return {boolean}
   */
  IntersectsLine2D ( _line ) {

    return Line2DLine2DIntersection( this.s, this.e, _line.s, _line.e );
  
  }

  /**
   * 
   * @param {Vector2D} _p 
   * 
   * @return {Vector2D}
   */
  GetClosestPoint2DTo ( _p ) {

    return ClosestPoint2DOnLine2D( this.s, this.e, _p );
  
  }

  /**
   * 
   * @return {Vector2D}
   */
  GetNormalA () {

    return this.s.GetNormalAV( this.e );
  
  }

  /**
   * 
   * @return {Vector2D}
   */
  GetNormalB () {

    return this.s.GetNormalBV( this.e );
  
  }

}

// Private Static ----->
const PS_TYPE = 0;
const PS_ap = new Vector2D( 0, 0 );
// <----- Private Static
