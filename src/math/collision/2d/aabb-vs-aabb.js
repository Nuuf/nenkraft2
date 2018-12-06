/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../../vector/vector2d';

export class Result {

  constructor () {

    this.mtv = new Vector2D( 0, 0 );
    this.occured = false;
  
  }

  Reset () {

    this.mtv.SetSame( 0 );
    this.occured = false;
  
  }

}

export const Collide = function ( _a, _b, _result ) {

  const sa = _a.shape;
  const sb = _b.shape;

  if ( 
    sa.tl.x < sb.br.x &&
    sb.tl.x < sa.br.x &&
    sa.tl.y < sb.br.y &&
    sb.tl.y < sa.br.y
  ) {

    PS_tvs[ 0 ].Set( sa.tl.x - sb.br.x, 0 );
    PS_tvs[ 1 ].Set( sa.br.x - sb.tl.x, 0 );
    PS_tvs[ 2 ].Set( 0, sa.tl.y - sb.br.y );
    PS_tvs[ 3 ].Set( 0, sa.br.y - sb.tl.y );
    PS_tvs.sort( Vector2D.SortMinMag );
    _result.mtv.SetV( PS_tvs[ 0 ] );
    _result.occured = true;

    return true;
  
  }

  return false;

};

export const SeparatingResponse = function ( _a, _b, _result ) {

  _result.mtv.Multiply( 0.5, 0.5 );

  _a.relative.SubtractV( _result.mtv );
  _b.relative.AddV( _result.mtv );

};

// REUSABLE ----->
const PS_tvs = [
  new Vector2D( 0, 0 ),
  new Vector2D( 0, 0 ),
  new Vector2D( 0, 0 ),
  new Vector2D( 0, 0 )
];
// <----- REUSABLE
