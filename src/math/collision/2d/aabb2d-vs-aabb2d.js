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

export const CollideRel = function ( _obj1, _obj2, _result ) {

  const aabb1 = _obj1.shape;
  const w1 = aabb1.w;
  const h1 = aabb1.h;
  const anchor1 = _obj1.anchor;

  const aabb2 = _obj2.shape;
  const w2 = aabb2.w;
  const h2 = aabb2.h;
  const anchor2 = _obj2.anchor;

  PS_tl1.Set( aabb1.tl.x - _obj1.relative.x, aabb1.tl.y - _obj1.relative.y );
  PS_tl2.Set( aabb2.tl.x - _obj2.relative.x, aabb2.tl.y - _obj2.relative.y );

  const tl2xw = PS_tl2.x + w1;
  const tl1xw = PS_tl1.x + w2;
  const br2yh = PS_tl2.y + h1;
  const br1yh = PS_tl1.y + h2;

  if ( anchor1 != undefined ) {

    PS_tl1.x += anchor1.x * w1;
    PS_tl1.y += anchor1.y * h1;
    
  }

  if ( anchor2 != undefined ) {

    PS_tl2.x += anchor2.x * w2;
    PS_tl2.y += anchor2.y * h2;
    
  }

  if (
    PS_tl1.x < tl2xw &&
    PS_tl2.x < tl1xw &&
    PS_tl1.y < br2yh &&
    PS_tl2.y < br1yh
  ) {

    if ( _result != undefined ) {

      PS_tvs[0].Set( PS_tl1.x - tl2xw, 0 );
      PS_tvs[1].Set( tl1xw - PS_tl2.x, 0 );
      PS_tvs[2].Set( 0, PS_tl1.y - br2yh );
      PS_tvs[3].Set( 0, br1yh - PS_tl2.y );
      PS_tvs.sort( Vector2D.SortMinMag );
      _result.mtv.SetV( PS_tvs[ 0 ] );
      _result.occured = true;
      
    }

    return true;
    
  }

  return false;

};

// Private Static ----->
const PS_tl1 = new Vector2D( 0, 0 );
const PS_tl2 = new Vector2D( 0, 0 );
const PS_tvs = [
  new Vector2D( 0, 0 ),
  new Vector2D( 0, 0 ),
  new Vector2D( 0, 0 ),
  new Vector2D( 0, 0 )
];
// <----- Private static
