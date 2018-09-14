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

    this.poc.SetSame( 0 );
    this.poc.SetSame( 0 );
    this.poc.SetSame( 0 );
    this.mtv.SetSame( 0 );
    this.mtd = 0;
    this.delta.SetSame( 0 );
    this.occured = false;
  
  }

}

export const CollideRel = function ( _obj1, _obj2, _result ) {

  const c1 = _obj1.shape;
  const c2 = _obj2.shape;
  const r1 = c1.radius;
  const r2 = c2.radius;
  const radii = r1 + r2;
  const anchor1 = _obj1.anchor;
  const anchor2 = _obj2.anchor;
  
  PS_pos1.SetV( _obj1.relative );
  PS_pos2.SetV( _obj2.relative );
  PS_delta.Set( PS_pos2.x - PS_pos1.x, PS_pos2.y - PS_pos1.y );

  const distanceSq = PS_delta.GetMagnitudeSquared();

  if ( anchor1 != undefined ) {

    PS_pos1.x += anchor1.x * c1.diameter;
    PS_pos1.y += anchor1.y * c1.diameter;
    
  }

  if ( anchor2 != undefined ) {

    PS_pos2.x += anchor2.x * c2.diameter;
    PS_pos2.y += anchor2.y * c2.diameter;
    
  }

  if ( radii * radii > distanceSq ) {

    if ( _result != undefined ) {

      const distance = Sqrt( distanceSq );
      const dm = ( c1.radiusSquared - c2.radiusSquared + distanceSq ) / ( distance + distance );
      const de = Sqrt( ( c1.radiusSquared ) - ( dm * dm ) ) / distance;
      const rx = -PS_delta.y * de;
      const ry = PS_delta.x * de;

      PS_poc1.Set(
        PS_pos1.x + ( PS_delta.x * dm / distance ),
        PS_pos1.y + ( PS_delta.y * dm / distance )
      );
      PS_poc2.Set(
        PS_poc1.x + rx,
        PS_poc1.y + ry
      );
      PS_poc3.Set(
        PS_poc1.x - rx,
        PS_poc1.y - ry
      );
      // as mtv
      PS_pos1.SubtractV( PS_pos2 );
      PS_pos1.Divide( radii, radii );

      const mtd = distance - r1 - r2;

      _result.poc.SetV( PS_poc1 );
      _result.poc.SetV( PS_poc2 );
      _result.poc.SetV( PS_poc3 );
      _result.mtv.SetV( PS_pos1 /* as mtv */ );
      _result.mtd = mtd;
      _result.delta.SetV( PS_delta );
      _result.occured = true;
      
    }

    return true;
    
  }

  return false;

};

export const ElasticResponse = function ( _obj1, _obj2, _result ) {

  PS_n.SetV( _result.delta );
  PS_n.Normalize();
  PS_mtv.SetV( _result.mtv );
  const m1 = _obj1.mass;
  const m2 = _obj2.mass;
  const v1 = _obj1.velocity;
  const v2 = _obj2.velocity;
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
  PS_mtv.Multiply( _result.mtd, _result.mtd );
  PS_mtv.Divide( 2, 2 );
  _obj1.relative.SubtractV( PS_mtv );
  _obj2.relative.AddV( PS_mtv );

};

// Private Static ----->
const PS_n = new Vector2D( 0, 0 );
const PS_mtv = new Vector2D( 0, 0 );
const PS_pos1 = new Vector2D( 0, 0 );
const PS_pos2 = new Vector2D( 0, 0 );
const PS_poc1 = new Vector2D( 0, 0 );
const PS_poc2 = new Vector2D( 0, 0 );
const PS_poc3 = new Vector2D( 0, 0 );
const PS_delta = new Vector2D( 0, 0 );
// <----- Private static
