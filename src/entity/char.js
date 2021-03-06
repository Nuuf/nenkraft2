/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { CoreEntity2D } from './core-entity2d';
import { Matrix2D } from '../math/matrix/matrix2d';
import { Pool } from '../utility/pool';

export class Char extends CoreEntity2D {

  /**
   * 
   * @param {number}  _x 
   * @param {number}  _y 
   * @param {object?} _data 
   */
  constructor ( _x, _y, _data ) {

    super( _x, _y );

    this.id = 
    this.cx = 
    this.cy = 
    this.w = 
    this.h = 
    this.xoffset = 
    this.yoffset = 
    this.xadvance = 
    this.yadvance = 0;
    this.kernings = [];
    this.translation = new Matrix2D();
    this.transformation = new Matrix2D();

    if ( _data != null ) {

      this.SetData( _data );
    
    }
  
  }

  /**
   * 
   * @return {Pool}
   */
  static get pool () {

    return PS_pool;
  
  }

  /**
   * 
   * @param {CanvasRenderingContext2D} _rc 
   * @param {Image}                    _image 
   * 
   * @return {void}
   */
  Render ( _rc, _image ) {

    _rc.drawImage(
      _image,
      this.cx, this.cy,
      this.width, this.height,
      this.position.x, this.position.y,
      this.width, this.height
    );
  
  }

  /**
   * 
   * @param {object} _data 
   * 
   * @return {this}
   */
  SetData ( _data ) {

    this.id = parseInt( _data.id );
    this.cx = parseInt( _data.x );
    this.cy = parseInt( _data.y );
    this.w = parseInt( _data.width );
    this.h = parseInt( _data.height );
    this.xoffset = parseInt( _data.xoffset );
    this.yoffset = parseInt( _data.yoffset );
    this.xadvance = parseInt( _data.xadvance );

    return this;
  
  }

  /**
   * 
   * @param {ProgramController} _pc 
   * @param {Float32Array}      _tintChannel 
   * @param {integer}           _unitId 
   * 
   * @return {void}
   */
  GLRenderAuto ( _pc, _tintChannel, _unitId ) {

    this.UpdateMatrices();
    _pc.Execute(
      this.transform.globalTransform.AsArray( true ),
      this.translation.AsArray( true ),
      this.transformation.AsArray( true ),
      _tintChannel,
      _unitId
    );
  
  }

  /**
   * 
   * @param {ProgramController} _pc 
   * @param {Float32Array}      _tintChannel 
   * @param {integer}           _unitId 
   * 
   * @return {void}
   */
  GLRender ( _pc, _tintChannel, _unitId ) {

    _pc.Execute(
      this.transform.globalTransform.AsArray( true ),
      this.translation.AsArray( true ),
      this.transformation.AsArray( true ),
      _tintChannel,
      _unitId
    );
  
  }

  /**
   * 
   * @param {object} _kernings 
   * 
   * @return {this}
   */
  ApplyKernings ( _kernings ) {

    let attributes;

    for ( var i = 0; i < _kernings.length; ++i ) {

      // eslint-disable-next-line
      attributes = _kernings[ i ].attributes;
  
      if ( parseInt( attributes.first ) === this.id ) {
  
        this.kernings.push(
          parseInt( attributes.first ),
          parseInt( attributes.second ),
          parseInt( attributes.amount )
        );
        
      }
      
    }

    return this;
  
  }

  /**
   * 
   * @param {Char} _prevChar 
   * 
   * @return {this}
   */
  Crunch ( _prevChar ) {

    this.position.SetSame( 0 );

    if ( _prevChar != null ) {

      this.x = _prevChar.x + _prevChar.xadvance;
      this.y = this.yadvance = _prevChar.yadvance;

      if ( _prevChar.kernings && _prevChar.kernings.length > 0 && this.kernings.length > 0 ) {

        const { kernings } = this;

        for ( var i = 0; i < kernings.length; i += 3 ) {

          if ( kernings[ i + 1 ] === _prevChar.id ) {

            this.x += kernings[ i + 2 ];
            break;
          
          }
        
        }
      
      }
    
    }
      
    this.position.Add( this.xoffset, this.yoffset );

    return this;

  }

  /**
   * 
   * @return {this}
   */
  UpdateMatrices () {

    if ( this.parent != null ) {

      const { texture } = this.parent;
      const tscaleX = this.width / texture.fw;
      const tscaleY = this.height / texture.fh;

      this.UpdateTransform( this.parent );
      this.translation.SetTransform( 0, 0, tscaleX, tscaleY );
      this.transformation.SetTransform( 
        tscaleX * this.cx / this.width, 
        tscaleY * this.cy / this.height, 
        tscaleX, tscaleY
      );
      
    }

    return this;
  
  }

  /**
   * 
   * @return {this}
   */
  Store () {

    PS_pool.Store( this );

    return this;
  
  }

}

// Private Static ----->
const PS_pool = new Pool();

PS_pool.Retrieve = function ( _data ) {

  this.PreRetrieve();

  return this.objects.pop().SetData( _data );

};

PS_pool.Flood( () => {

  return new Char( 0, 0 );

}, 200 );
// <----- Private Static
