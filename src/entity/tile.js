/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { CoreEntity2D } from './core-entity2d';
import { RADIAN } from '../math';
import { Matrix2D } from '../math/matrix/matrix2d';

export class Tile extends CoreEntity2D {

  constructor ( _index, _x, _y, _clipX, _clipY, _H, _V, _D, _w, _h, _tscaleX, _tscaleY ) {

    super( _x, _y );
    this.index = _index;
    this.clipX = _clipX;
    this.clipY = _clipY;
    this.w = _w;
    this.h = _h;
    this.textureTranslation = new Matrix2D();
    this.textureTransformation = new Matrix2D();

    this.textureTransformation.SetTransform(
      _tscaleX * _clipX / _w,
      _tscaleY * _clipY / _h,
      _tscaleX, _tscaleY
    );

    if ( _H && _V && _D ) {

      this.textureTranslation.SetTransform( -_w, -_h, _tscaleX, _tscaleY );
      this.rotation = -RADIAN * 90;
      this.scale.y = -1;
    
    } else if ( _H && _V ) {

      this.textureTranslation.SetTransform( -_w, -_h, _tscaleX, _tscaleY );
      this.scale.Set(
        -1, -1
      );
    
    } else if ( _H && _D ) {

      this.textureTranslation.SetTransform( 0, -_h, _tscaleX, _tscaleY );
      this.rotation = RADIAN * 90;
    
    } else if ( _V && _D ) {

      this.textureTranslation.SetTransform( -_w, 0, _tscaleX, _tscaleY );
      this.rotation = -RADIAN * 90;
    
    } else if ( _H ) {

      this.textureTranslation.SetTransform( -_w, 0, _tscaleX, _tscaleY );
      this.scale.x = -1;

    } else if ( _V ) {

      this.textureTranslation.SetTransform( 0, -_h, _tscaleX, _tscaleY );
      this.scale.y = -1;
    
    } else if ( _D ) {

      this.textureTranslation.SetTransform( 0, 0, _tscaleX, _tscaleY );
      this.rotation = RADIAN * 90;
      this.scale.y = -1;
    
    } else {

      this.textureTranslation.SetTransform( 0, 0, _tscaleX, _tscaleY );
    
    }

  }

}
