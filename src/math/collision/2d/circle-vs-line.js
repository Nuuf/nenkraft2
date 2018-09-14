/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../../vector/vector2d';
import { ClosestPointOnLine } from '../..';

const Sqrt = Math.sqrt;

export class Result {

  constructor () {

    this.mtv = new Vector2D( 0, 0 );
    this.cp = new Vector2D( 0, 0 );
    this.sOrE = 0;
    this.occured = false;
  
  }

  Reset () {

    this.mtv.Set( 0, 0 );
    this.cp.Set( 0, 0 );
    this.sOrE = 0;
    this.occured = false;
  
  }

}

export const CollideRel = function ( _c, _l, _result ) {

  const lshape = _l.shape;
  const cshape = _c.shape;
  const lpos = _l.relative;
  const cpos = _c.relative;

  PS_s.Set( lshape.s.x + lpos.x, lshape.s.y + lpos.y );
  PS_e.Set( lshape.e.x + lpos.x, lshape.e.y + lpos.y );

  const cp = ClosestPointOnLine( PS_s, PS_e, cpos );

  PS_delta.Set( cpos.x - cp.x, cpos.y - cp.y );

  const distanceSq = PS_delta.GetMagnitudeSquared();

  if ( distanceSq < cshape.radiusSquared ) {

    if ( _result ) {

      const distance = cshape.radius - Sqrt( distanceSq );
      
      // as mtv
      PS_delta.Normalize();
      PS_delta.Multiply( distance, distance );
      _result.mtv.SetV( PS_delta );
      _result.cp.SetV( cp );
      _result.occured = true;

      if ( cp === PS_s ) {

        _result.sOrE = 1;
        
      } else if ( cp === PS_e ) {

        _result.sOrE = 2;
        
      }
      
    }

    return true;
    
  }

  return false;

};

export const ReflectingResponse = function ( _c, _l, _result ) {

  let n;
  let refl;
  const lshape = _l.shape;
  const cvel = _c.velocity;
  const cpos = _c.relative;
  const cp = _result.cp;

  if ( _result.sOrE !== 0 ) {

    n = cp.SubtractVC( cpos );
    n.Normalize();
    
  } else {

    n = lshape.GetNormalA();
    
  }

  refl = cvel.GetReflectionV( n );
  cvel.SetV( refl );
  cpos.AddV( _result.mtv );

};

// Private Static ----->
const PS_s = new Vector2D( 0, 0 );
const PS_e = new Vector2D( 0, 0 );
const PS_delta = new Vector2D( 0, 0 );
// <----- Private static
