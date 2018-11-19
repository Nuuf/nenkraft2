/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../../math/vector/vector2d';

export class AABB2D {

  constructor ( _tlx, _tly, _brx, _bry ) {

    this.tl = new Vector2D( _tlx, _tly );
    this.br = new Vector2D( _brx, _bry );
    this.w = 0;
    this.h = 0;
    this.hw = 0;
    this.hh = 0;
    this.area = 0;
    this.belongsTo = null;
    this.TYPE = PS_TYPE;

    this.ComputeWH();

  }

  static get TYPE () {

    return PS_TYPE;
  
  }

  Set ( _tlx, _tly, _brx, _bry ) {

    this.tl.Set( _tlx, _tly );
    this.br.Set( _brx, _bry );
    this.ComputeWH();
  
  }

  SetC ( _aabb2d ) {

    this.Set( _aabb2d.tl.x, _aabb2d.tl.y, _aabb2d.br.x, _aabb2d.br.y );
  
  }

  Scale ( _x, _y, _notl ) {

    if ( _notl !== false ) this.tl.Multiply( _x, _y );
    this.br.Multiply( _x, _y );
    this.ComputeWH();
  
  }

  ScaleV ( _p, _notl ) {

    if ( _notl !== false ) this.tl.MultiplyV( _p );
    this.br.MultiplyV( _p );
    this.ComputeWH();
  
  }

  ComputeWH () {

    this.w = this.br.x - this.tl.x;
    this.h = this.br.y - this.tl.y;
    this.hw = this.w * 0.5;
    this.hh = this.h * 0.5;
    this.area = this.w * this.h;
  
  }

  IntersectsPoint2D ( _p ) {

    return !( 
      _p.x < this.tl.x ||
      _p.x > this.br.x ||
      _p.y < this.tl.y ||
      _p.y > this.br.y
    );
  
  }

  ContainsPoint ( _p ) {

    return !( 
      _p.x <= this.tl.x ||
      _p.x >= this.br.x ||
      _p.y <= this.tl.y ||
      _p.y >= this.br.y
    );
  
  }

  IntersectsAABB2D ( _aabb ) {
    
    return !( 
      _aabb.tl.x >= this.br.x || 
      _aabb.tl.y >= this.br.y ||
      _aabb.br.x <= this.tl.x ||
      _aabb.br.y <= this.tl.y
    );
  
  }

  ContainsAABB2D ( _aabb ) {

    if ( _aabb.area > this.area ) {

      return false;
      
    }

    return ( 
      _aabb.tl.x > this.tl.x &&
      _aabb.tl.y > this.tl.y &&
      _aabb.br.x < this.br.x &&
      _aabb.br.y < this.br.y
    );
  
  }

  GetQuadrant ( _quadrant ) {

    const tl = this.tl;
    const br = this.br;

    switch ( _quadrant ) {

      case PS_TOP_LEFT:
        return new AABB2D(
          tl.x,
          tl.y,
          tl.x + this.hw,
          tl.y + this.hh
        );
      case PS_TOP_RIGHT:
        return new AABB2D(
          tl.x + this.hw,
          tl.y,
          br.x,
          tl.y + this.hh
        );
      case PS_BOTTOM_LEFT:
        return new AABB2D(
          tl.x,
          tl.y + this.hh,
          tl.x + this.hw,
          br.y
        );
      case PS_BOTTOM_RIGHT:
        return new AABB2D(
          tl.x + this.hw,
          tl.y + this.hh,
          br.x,
          br.y
        );
      default:
        return null;
    
    }
  
  }

}

// Private Static ----->
const PS_TOP_LEFT = 'TL';
const PS_TOP_RIGHT = 'TR';
const PS_BOTTOM_LEFT = 'BL';
const PS_BOTTOM_RIGHT = 'BR';
const PS_TYPE = 1;
// <----- Private Static
