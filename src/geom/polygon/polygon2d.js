/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { RandomFloat, RandomInteger } from '../../utility';
import { Vector2D } from '../../math/vector/vector2d';
import { Line2D } from '../line/line2d';
import { AABB2D } from '../aabb/aabb2d';

export class Polygon2D {

  constructor ( _vertices ) {

    this.vertices = [];
    this.normals = [];
    this.perimeterMidPoints = [];
    this.centroid = new Vector2D( 0, 0 );
    this.aabb = null;
    this.dirtyBounds = true;
    this.belongsTo = null;
    this.TYPE = PS_TYPE;

    if ( _vertices != null ) {

      if ( _vertices[0] instanceof Vector2D ) {

        this.AddPoints( _vertices );

      } else {

        this.PushPoints( _vertices );
      
      }
    
    }

  }

  Copy () {

    let i = 0;
    const p = new Polygon2D();
    const vertices = this.vertices;
    const l = vertices.length;

    for ( ; i < l; ++i ) {

      p.AddPoint( vertices[ i ].Copy() );
    
    }

    return p;
  
  }

  ExtractSegments ( _segments ) {

    let i = 0;
    const vertices = this.vertices;
    const l = vertices.length - 1;
    let vertex = vertices[i];

    if ( _segments == null ) _segments = [];

    for ( ; i < l; vertex = vertices[ ++i ] ) {

      _segments.push( new Line2D( vertex, vertices[ i + 1 ] ) );
    
    }

    _segments.push( new Line2D( vertices[ l ], vertices[ 0 ] ) );

    return _segments;
  
  }

  GenerateRandomPoints ( _amount, _int, _outside ) {

    this.ComputeBounds();
    _outside = !!_outside;

    let i = 0;
    let randFunc = RandomFloat;
    const tl = this.aabb.tl;
    const br = this.aabb.br;
    const points = [];

    if ( _int === true ) randFunc = RandomInteger;

    for ( ; i < _amount; ++i ) {
      
      const point = new Vector2D( randFunc( tl.x, br.x ), randFunc( tl.y, br.y ) );

      while ( this.IntersectsPoint( point ) === _outside ) {

        point.Set( randFunc( tl.x, br.x ), randFunc( tl.y, br.y ) );

      }

      points.push( point );

    }

    return points;
  
  }

  AddVertex ( _vector2d ) {

    this.vertices.push( _vector2d );
  
  }

  AddVertices ( _vertices ) {

    let i = 0;
    const l = _vertices.length;

    if ( _vertices[0] instanceof Vector2D ) {

      this.vertices.push.apply( this.vertices, _vertices );

    } else if ( typeof _vertices[0] === 'number' ) {

      for ( ; i < l; i += 2 ) {

        this.AddVertex( new Vector2D( _vertices[ i ], _vertices[ i + 1 ] ) );
            
      }
    
    } else if ( _vertices[0].x != null ) {

      for ( ; i < l; ++i ) {

        this.AddVertex( new Vector2D( _vertices[ i ].x, _vertices[ i].y ) );
                
      }
    
    }
  
  }

  Recreate ( _vertices ) {

    this.vertices.length = 0;
    if ( _vertices != undefined ) this.vertices.push.apply( this.vertices, _vertices );
  
  }

  ComputeBounds () {

    let i = 0;
    let mix = Infinity;
    let max = -mix;
    let miy = mix;
    let may = -mix;
    let vertex;
    const vertices = this.vertices;
    const l = vertices.length;

    if ( this.aabb === null ) this.aabb = new AABB2D( 0, 0, 0, 0 );

    for ( ; i < l; ++i ) {

      vertex = vertices[ i ];
      if ( vertex.x < mix ) mix = vertex.x;
      if ( vertex.x > max ) max = vertex.x;
      if ( vertex.y < miy ) miy = vertex.y;
      if ( vertex.y > may ) may = vertex.y;
    
    }

    this.aabb.Set( mix, miy, max, may );
    this.dirtyBounds = false;
  
  }

  Rotate ( _angle, _anchorX, _anchorY, _updateBounds ) {

    let i = 0;
    let vertex;
    const aabb = this.aabb;
    const ap = aabb.tl.Copy();
    const vertices = this.vertices;
    const l = vertices.length;

    if ( this.dirtyBounds === true && _updateBounds === true ) this.ComputeBounds();
    else if ( this.aabb === null ) this.ComputeBounds();

    _anchorX = _anchorX === undefined ? 0.5 : _anchorX;

    ap.AddV( aabb.br );
    ap.Multiply( _anchorX, _anchorY === undefined ? _anchorX : _anchorY );

    for ( i; i < l; ++i ) {

      vertex = vertex[ i ];
      vertex.RotateAroundV( ap, _angle );
    
    }

    this.dirtyBounds = true;
  
  }

  GetControid () {

    let i = 0;
    let vertex;
    const vertices = this.vertices;
    const l = vertices.length;
    const centroid = this.centroid;

    centroid.Set( 0, 0 );

    for ( ; i < l; ++i ) {

      vertex = vertices[ i ];
      centroid.AddV( vertex );
    
    }

    centroid.Divide( l, l );

    return centroid;
  
  }

  GetNormalsA () {

    let i = 0;
    const vertices = this.vertices;
    const l = vertices.length - 1;
    const normals = this.normals;
    let vertex = vertices[i];

    normals.length = 0;

    for ( ; i < l; vertex = vertices[ ++i ] ) {

      normals.push( vertex.GetNormalAV( vertices[ i + 1 ] ) );
    
    }

    normals.push( vertices[ l ].GetNormalAV( vertices[ 0 ] ) );

    return normals;
  
  }
  
  GetNormalsA () {

    let i = 0;
    const vertices = this.vertices;
    const l = vertices.length - 1;
    const normals = this.normals;
    let vertex = vertices[i];

    normals.length = 0;

    for ( ; i < l; vertex = vertices[ ++i ] ) {

      normals.push( vertex.GetNormalBV( vertices[ i + 1 ] ) );
    
    }

    normals.push( vertices[ l ].GetNormalBV( vertices[ 0 ] ) );

    return normals;
  
  }

  GetPerimeterMidPoints () {

    let i = 0;
    const vertices = this.vertices;
    const l = vertices.length - 1;
    const perimeterMidPoints = this.perimeterMidPoints;
    let vertex = vertices[i];

    perimeterMidPoints.length = 0;

    for ( ; i < l; vertex = vertices[ ++i ] ) {

      perimeterMidPoints.push( vertex.GetMidPointV( vertices[ i + 1 ] ) );
    
    }

    perimeterMidPoints.push( vertices[ l ].GetMidPointV( vertices[ 0 ] ) );

    return perimeterMidPoints;
  
  }

  IntersectsPoint ( _p ) {

    if ( this.dirtyBounds === true ) this.ComputeBounds();
    if ( this.aabb.IntersectsPoint( _p ) === false ) return false;

    let i = 0;
    let vertexi;
    let vertexj;
    let intersects = false;
    const vertices = this.vertices;
    const l = vertices.length;
    const x = _p.x;
    const y = _p.y;
    let j = l - 1;

    for ( i = 0, j = l - 1; i < l; j = i++ ) {

      vertexi = vertices[ i ];
      vertexj = vertices[ j ];

      if (
        ( ( vertexi.y > y ) !== ( vertexj.y > y ) ) &&
        ( x < ( vertexj.x - vertexi.x ) * ( y - vertexi.y ) / ( vertexj.y - vertexi.y ) + vertexi.x )
      ) {

        intersects = !intersects;
      
      }
    
    }

    return intersects;
  
  }

}

// Private Static ----->
const PS_TYPE = 3;
// <----- Private static
