/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../../vector/vector2d';
import { Line2DLine2DCollision } from './line-vs-line';

export class Result {

  /**
   * 
   */
  constructor () {

    this.poc = {
      a: new Vector2D( 0, 0 ),
      b: new Vector2D( 0, 0 ),
      c: new Vector2D( 0, 0 ),
      d: new Vector2D( 0, 0 )
    };
    this.top = false;
    this.right = false;
    this.bottom = false;
    this.left = false;
  
  }

  /**
   * 
   * @return {void}
   */
  Reset () {

    this.poc.a.SetSame( 0 );
    this.poc.b.SetSame( 0 );
    this.poc.c.SetSame( 0 );
    this.poc.d.SetSame( 0 );
    this.top = false;
    this.right = false;
    this.bottom = false;
    this.left = false;
  
  }

}

/**
 * 
 * @param {Body2D} _a 
 * @param {Body2D} _b 
 * @param {Result} _result 
 * 
 * @return {void}
 */
export const Collide = function ( _a, _b, _result ) {

  const sa = _a.shape;
  const sb = _b.shape;

  PS_1.Set( sa.tl.x + ( sa.br.x - sa.tl.x ), sa.tl.y );
  PS_2.Set( sa.tl.x, sa.tl.y + ( sa.br.y - sa.tl.y ) );

  _result.top = Line2DLine2DCollision( sb.s, sb.e, sa.tl, PS_1, _result.poc.a );

  _result.right = Line2DLine2DCollision( sb.s, sb.e, sa.br, PS_1, _result.poc.b );

  _result.bottom = Line2DLine2DCollision( sb.s, sb.e, sa.br, PS_2, _result.poc.c );

  _result.left = Line2DLine2DCollision( sb.s, sb.e, sa.tl, PS_2, _result.poc.d );

};

// REUSABLE ----->
const PS_1 = new Vector2D( 0, 0 );
const PS_2 = new Vector2D( 0, 0 );
// <----- REUSABLE
