/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../../vector/vector2d';

const Abs = Math.abs;

export class Result {

  /**
   * 
   */
  constructor () {
        
    this.mtv = new Vector2D( 0, 0 );
    this.olAxis = new Vector2D( 0, 0 );
    this.mtd = Infinity;
    this.occured = false;
  
  }

  /**
   * 
   * @return {void}
   */
  Reset () {

    this.occured = false;
    this.mtv.Set( 0, 0 );
    this.mtd = Infinity;
    this.olAxis.Set( 0, 0 );
  
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

  let i = 0;
  const p1Normals = _a.shape.normals;
  const p2Normals = _b.shape.normals;

  for ( i; i < p2Normals.length; ++i ) {

    if ( AxisSeparates( _a, _b, p1Normals[ i ], _result ) === true ) {

      return false;
      
    }
    
  }

  for ( i = 0; i < p2Normals.length; ++i ) {

    if ( AxisSeparates( _a, _b, p2Normals[ i ], _result ) === true ) {

      return false;
      
    }
    
  }

  _result.mtv.SetV( _result.olAxis );
  _result.mtv.Multiply( _result.mtd, _result.mtd );
  _result.occured = true;

  return true;

};

/**
 * 
 * @param {Body2D}   _a 
 * @param {Body2D}   _b 
 * @param {Vector2D} _axis 
 * @param {Result}   _result 
 * 
 * @return {boolean}
 */
export const AxisSeparates = function ( _a, _b, _axis, _result ) {

  const d1 = _axis.GetMinMaxDot( _a.shape.vertices );
  const d2 = _axis.GetMinMaxDot( _b.shape.vertices );
  const offset = _b.relative.SubtractVC( _a.relative ).GetDotV( _axis );

  d2.Add( offset, offset );

  if ( d1.x > d2.y || d2.x > d1.y ) {

    return true;
    
  }

  let mtd = 0;
  let o1 = 0;
  let o2 = 0;
  const d1x = d1.x;
  const d1y = d1.y;
  const d2x = d2.x;
  const d2y = d2.y;

  if ( d1x < d2x ) {

    if ( d1y < d2y ) {

      mtd = d1y - d2x;
        
    } else {

      o1 = d1y - d2x;
      o2 = d2y - d1x;

      if ( o1 < o2 ) {

        mtd = o1;
          
      } else {

        mtd = -o2;
          
      }
        
    }
      
  } else if ( d1y > d2y ) {

    mtd = d1x - d2y;
        
  } else {

    o1 = d1y - d2x;
    o2 = d2y - d1x;

    if ( o1 < o2 ) {

      mtd = o1;
          
    } else {

      mtd = -o2;
          
    }
        
  }

  const absMtd = Abs( mtd );

  if ( absMtd < _result.mtd ) {

    _result.mtd = absMtd;
    _result.olAxis.SetV( _axis );

    if ( mtd < 0 ) {

      _result.olAxis.Invert();
        
    }
      
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
export const SeparatingResponse = function ( _a, _b, _result ) {

  _result.mtv.Multiply( 0.5, 0.5 );

  _a.relative.SubtractV( _result.mtv );
  _b.relative.AddV( _result.mtv );

};
