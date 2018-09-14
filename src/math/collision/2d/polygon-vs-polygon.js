/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../../vector/vector2d';

const Abs = Math.abs;

export class Result {

  constructor () {
        
    this.mtv = new Vector2D( 0, 0 );
    this.olAxis = new Vector2D( 0, 0 );
    this.mtd = Infinity;
    this.occured = false;
  
  }

  Reset () {

    this.occured = false;
    this.mtv.Set( 0, 0 );
    this.mtd = Infinity;
    this.olAxis.Set( 0, 0 );
  
  }

}

export const CollideRel = function ( _obj1, _obj2, _result ) {

  let i = 0;
  const p1 = _obj1.shape;
  const p2 = _obj2.shape;
  const p1Normals = p1.normals;
  const p2Normals = p2.normals;
  const p1l = p1Normals.length;
  const p2l = p2Normals.length;

  for ( i; i < p1l; ++i ) {

    if ( AxisSeparates( _obj1, _obj2, p1Normals[ i ], _result ) === true ) {

      return false;
      
    }
    
  }

  for ( i = 0; i < p2l; ++i ) {

    if ( AxisSeparates( _obj1, _obj2, p2Normals[ i ], _result ) === true ) {

      return false;
      
    }
    
  }

  if ( _result != undefined ) {

    _result.mtv.SetV( _result.olAxis );
    _result.mtv.Multiply( _result.mtd, _result.mtd );
    _result.occured = true;
    
  }

  return true;

};

export const AxisSeparates = function ( _obj1, _obj2, _axis, _result ) {

  const d1 = _axis.MinMaxDot( _obj1.shape.vertices );
  const d2 = _axis.MinMaxDot( _obj2.shape.vertices );
  const offset = _obj2.relative.SubtractVC( _obj1.relative ).GetDotV( _axis );
  
  d2.Add( offset, offset );

  if ( d1.x > d2.y || d2.x > d1.y ) {

    return true;
    
  }

  if ( _result != undefined ) {

    const mtd = 0;
    const d1x = d1.x;
    const d1y = d1.y;
    const d2x = d2.x;
    const d2y = d2.y;
    const o1 = 0;
    const o2 = 0;

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
    
  }

  return false;

};
