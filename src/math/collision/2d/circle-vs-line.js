/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../../vector/vector2d';
import { ClosestPoint2DOnLine2D } from '../../misc';

const Sqrt = Math.sqrt;

export class Result {

  /**
   * 
   */
  constructor () {

    this.mtv = new Vector2D( 0, 0 );
    this.cp = new Vector2D( 0, 0 );
    this.sOrE = 0;
    this.occured = false;
  
  }

  /**
   * 
   * @return {void}
   */
  Reset () {

    this.mtv.SetSame( 0 );
    this.cp.SetSame( 0 );
    this.sOrE = 0;
    this.occured = false;
  
  }

}

/**
 * 
 * @param {Body2D} _a 
 * @param {Body2D} _b 
 * @param {Result} _result 
 * 
 * @return {boolean}
 */
export const Collide = function ( _a, _b, _result ) {

  const sa = _a.shape;
  const sb = _b.shape;
  const ccenter = sa.center;
  const cp = ClosestPoint2DOnLine2D( sb.s, sb.e, ccenter );

  PS_delta.Set( ccenter.x - cp.x, ccenter.y - cp.y );

  const distanceSq = PS_delta.GetMagnitudeSquared();

  if ( distanceSq < sa.radiusSquared ) {

    const distance = sa.radius - Sqrt( distanceSq );
      
    _result.mtv.SetV( PS_delta ).Normalize().Multiply( distance, distance );
    _result.cp.SetV( cp );
    _result.occured = true;

    if ( cp === sb.s ) {

      _result.sOrE = 1;
        
    } else if ( cp === sb.e ) {

      _result.sOrE = -1;
        
    }

    return true;

  }

  return false;

};

/**
 * 
 * @param {Body2D} _a 
 * @param {Body2D} _b 
 * @param {Result} _result
 * 
 * @return {void} 
 */
export const ReflectingResponse = function ( _a, _b, _result ) {

  let n;
  let refl;
  const lshape = _b.shape;
  const cvel = _a.velocity;
  const cpos = _a.relative;
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
const PS_delta = new Vector2D( 0, 0 );
// <----- REUSABLE
