/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../../vector/vector2d';

const Sqrt = Math.sqrt;

export class Result {

  constructor () {

    this.mtv = new Vector2D( 0, 0 );
    this.poc = {
      a: new Vector2D( 0, 0 ),
      b: new Vector2D( 0, 0 ),
      c: new Vector2D( 0, 0 )
    };
    this.mtd = 0;
    this.delta = new Vector2D( 0, 0 );
    this.occured = false;
  
  }

  Reset () {

    this.poc.a.SetSame( 0 );
    this.poc.b.SetSame( 0 );
    this.poc.c.SetSame( 0 );
    this.mtv.SetSame( 0 );
    this.mtd = 0;
    this.delta.SetSame( 0 );
    this.occured = false;
  
  }

}

export const Collide = function ( _a, _b, _result ) {

  const sa = _a.shape;
  const sb = _b.shape;
  const radii = sa.radius + sb.radius;

  PS_delta.SetV( sa.center ).SubtractV( sb.center );

  const distanceSq = PS_delta.GetMagnitudeSquared();

  if ( radii * radii > distanceSq ) {

    const distance = Sqrt( distanceSq );
    const dm = ( sa.radiusSquared - sb.radiusSquared + distanceSq ) / ( distance + distance );
    const de = Sqrt( ( sa.radiusSquared ) - ( dm * dm ) ) / distance;
    const rx = -PS_delta.y * de;
    const ry = PS_delta.x * de;
    const mtd = distance - sa.radius - sb.radius;

    PS_poc1.Set(
      sa.center.x + ( PS_delta.x * dm / distance ),
      sa.center.y + ( PS_delta.y * dm / distance )
    );
    PS_poc2.Set(
      PS_poc1.x + rx,
      PS_poc1.y + ry
    );
    PS_poc3.Set(
      PS_poc1.x - rx,
      PS_poc1.y - ry
    );

    _result.mtv.SetV( PS_delta ).Divide( radii, radii );
    _result.poc.a.SetV( PS_poc1 );
    _result.poc.b.SetV( PS_poc2 );
    _result.poc.c.SetV( PS_poc3 );
    _result.mtd = mtd;
    _result.delta.SetV( PS_delta );
    _result.occured = true;

    return true;
  
  }

  return false;

};

export const ElasticResponse = function ( _a, _b, _result ) {

  PS_n.SetV( _result.delta ).Normalize();
  PS_mtv.SetV( _result.mtv );
  const m1 = _a.mass;
  const m2 = _b.mass;
  const v1 = _a.velocity;
  const v2 = _b.velocity;
  const a1 = v1.GetDotV( PS_n );
  const a2 = v2.GetDotV( PS_n );
  const op = 2 * ( a1 - a2 ) / ( m1 + m2 );

  v1.Set(
    v1.x - op * m2 * PS_n.x,
    v1.y - op * m2 * PS_n.y
  );
  v2.Set(
    v2.x + op * m1 * PS_n.x,
    v2.y + op * m1 * PS_n.y
  );
  PS_mtv.Multiply( _result.mtd, _result.mtd ).Multiply( 0.5, 0.5 );
  _a.relative.SubtractV( PS_mtv );
  _b.relative.AddV( PS_mtv );

};

// REUSABLE ----->
const PS_n = new Vector2D( 0, 0 );
const PS_mtv = new Vector2D( 0, 0 );
const PS_poc1 = new Vector2D( 0, 0 );
const PS_poc2 = new Vector2D( 0, 0 );
const PS_poc3 = new Vector2D( 0, 0 );
const PS_delta = new Vector2D( 0, 0 );
// <----- REUSABLE
