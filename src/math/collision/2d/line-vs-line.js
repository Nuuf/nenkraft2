/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../../vector/vector2d';

/**
 * 
 * @param {Vector2D} _startA 
 * @param {Vector2D} _endA 
 * @param {Vector2D} _startB 
 * @param {Vector2D} _endB 
 * @param {Vector2D} _p 
 * 
 * @return {boolean}
 */
export function Line2DLine2DCollision ( _startA, _endA, _startB, _endB, _p ) {

  _p.SetV( _endA ).SubtractV( _startA );
  PS_a.SetV( _endB ).SubtractV( _startB );

  const l = -PS_a.x * _p.y + _p.x * PS_a.y;
  const abx = _startA.x - _startB.x;
  const aby = _startA.y - _startB.y;
  const s = ( -_p.y * abx + _p.x * aby ) / l;
  const t = ( PS_a.x * aby - PS_a.y * abx ) / l;

  if ( s >= 0 && s <= 1 && t >= 0 && t <= 1 ) {

    _p.Set( _startA.x + ( t * _p.x ), _startA.y + ( t * _p.y ) );

    return true;
    
  }

  _p.SetSame( 0 );

  return false;

}

// REUSABLE ----->
const PS_a = new Vector2D( 0, 0 );
// <----- REUSABLE
