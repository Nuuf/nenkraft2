import { Vector2D } from './vector/vector2d';

/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

'use strict';

export function Line2DLine2DIntersection ( _startA, _endA, _startB, _endB ) {

  R_V1.SetV( _endA ).SubtractV( _startA );
  R_V2.SetV( _endB ).SubtractV( _startB );

  const l = -R_V2.x * R_V1.y + R_V1.x * R_V2.y;
  const abx = _startA.x - _startB.x;
  const aby = _startA.y - _startB.y;
  const s = ( -R_V1.y * abx + R_V1.x * aby ) / l;
  const t = ( R_V2.x * aby - R_V2.y * abx ) / l;

  if ( s >= 0 && s <= 1 && t >= 0 && t <= 1 ) {

    return true;
    
  }

  return false;

}

export function ClosestPoint2DOnLine2D ( _start, _end, _point ) {

  const delta = _end.SubtractVC( _start );
  const u = ( ( _point.x - _start.x ) * delta.x + ( _point.y - _start.y ) * delta.y ) / delta.GetMagnitudeSquared();

  if ( u < 0 ) {

    return _start;
    
  } else if ( u > 1 ) {

    return _end;
    
  }

  delta.Set( _start.x + u * delta.x, _start.y + u * delta.y );

  return delta;

}

// Reusable ----->
const R_V1 = new Vector2D( 0, 0 );
const R_V2 = new Vector2D( 0, 0 );
// <----- Reusable
