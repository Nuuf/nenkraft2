/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../../vector/vector2d';
import { ClosestPoint2DOnLine2D } from '../../misc';

const Sqrt = Math.sqrt;

export class Result {

  constructor () {

    this.mtv = new Vector2D( 0, 0 );
    this.cp = new Vector2D( 0, 0 );
    this.sOrE = 0;
    this.occured = false;
  
  }

  Reset () {

    this.mtv.SetSame( 0 );
    this.cp.SetSame( 0 );
    this.sOrE = 0;
    this.occured = false;
  
  }

}

export const CollideRel = function ( _obj1, _obj2, _result ) {

  const lshape = _obj2.shape;
  const cshape = _obj1.shape;
  const lpos = _obj2.relative;
  const cpos = _obj1.relative;

  PS_s.Set( lshape.s.x + lpos.x, lshape.s.y + lpos.y );
  PS_e.Set( lshape.e.x + lpos.x, lshape.e.y + lpos.y );

  const cp = ClosestPoint2DOnLine2D( PS_s, PS_e, cpos );

  PS_delta.Set( cpos.x - cp.x, cpos.y - cp.y );

  const distanceSq = PS_delta.GetMagnitudeSquared();

  if ( distanceSq < cshape.radiusSquared ) {

    if ( _result ) {

      const distance = cshape.radius - Sqrt( distanceSq );
      
      // as mtv
      PS_delta.Normalize().Multiply( distance, distance );
      _result.mtv.SetV( PS_delta );
      _result.cp.SetV( cp );
      _result.occured = true;

      if ( cp === PS_s ) {

        _result.sOrE = 1;
        
      } else if ( cp === PS_e ) {

        _result.sOrE = -1;
        
      }
      
    }

    return true;
    
  }

  return false;

};

export const ReflectingResponse = function ( _obj1, _obj2, _result ) {

  let n;
  let refl;
  const lshape = _obj2.shape;
  const cvel = _obj1.velocity;
  const cpos = _obj1.relative;
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

// REUSABLE ----->
const PS_s = new Vector2D( 0, 0 );
const PS_e = new Vector2D( 0, 0 );
const PS_delta = new Vector2D( 0, 0 );
// <----- REUSABLE
