/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../../vector/vector2d';
import { Line2DLine2DCollision } from './line-vs-line';

export class Result {

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

export const CollideRel = function ( _obj1, _obj2, _result ) {

  PS_a.SetV( _obj1.shape.tl ).AddV( _obj1.relative );
  PS_b.SetV( _obj1.shape.br ).AddV( _obj1.relative );
  PS_c.SetV( _obj2.shape.s ).AddV( _obj2.relative );
  PS_d.SetV( _obj2.shape.e ).AddV( _obj2.relative );

  PS_e.Set( PS_a.x + ( PS_b.x - PS_a.x ), PS_a.y );
  PS_f.Set( PS_a.x, PS_a.y + ( PS_b.y - PS_a.y ) );

  _result.top = Line2DLine2DCollision( PS_c, PS_d, PS_a, PS_e, _result.poc.a );

  _result.right = Line2DLine2DCollision( PS_c, PS_d, PS_b, PS_e, _result.poc.b );

  _result.bottom = Line2DLine2DCollision( PS_c, PS_d, PS_b, PS_f, _result.poc.c );

  _result.left = Line2DLine2DCollision( PS_c, PS_d, PS_a, PS_f, _result.poc.d );

};

// REUSABLE ----->
const PS_a = new Vector2D( 0, 0 );
const PS_b = new Vector2D( 0, 0 );
const PS_c = new Vector2D( 0, 0 );
const PS_d = new Vector2D( 0, 0 );
const PS_e = new Vector2D( 0, 0 );
const PS_f = new Vector2D( 0, 0 );
// <----- REUSABLE
