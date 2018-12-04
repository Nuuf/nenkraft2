/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { TextureEntity2D } from './texture-entity2d';
import { Vector2D } from '../math/vector/vector2d';
import { Controller } from '../animator/controller';
import { BasicTexture2D } from '../texture/basic-texture2d';
import { ImageFromDataURL, GenerateSimpleBase64PNG } from '../utility/browser-utility';
import { Polygon2D } from '../path/polygon2d';
import { Graphic2D } from './graphic2d';

export class Sprite extends TextureEntity2D {

  constructor ( _x, _y, _texture, _unitId ) {

    super( _x, _y, _texture, _unitId );

    this.animationController = null;

    if ( _texture == null ) {

      this.SetTexture( PS_DEFAULT_TEXTURE );
    
    }

  }

  static BUILD_DEFAULT_TEXTURE ( _onLoad ) {

    if ( PS_DEFAULT_TEXTURE_BUILT === true ) {

      throw new Error( 'Function can only be called once!' );
    
    }

    PS_DEFAULT_TEXTURE = new BasicTexture2D(
      ImageFromDataURL(
        GenerateSimpleBase64PNG( () => {

          const path = new Polygon2D( [
            0, 0,
            64, 0,
            64, 64,
            0, 64,
            0, 0,
            32, 32,
            64, 0,
            32, 32,
            64, 64,
            32, 32,
            0, 64
          ] );

          path.ComputeBounds();
          path.style.stroke.lineWidth = 3;

          return new Graphic2D( 0, 0, path );
        
        } ), 64, 64, _onLoad
      ), '__DEFAULT_SPRITE_TEXTURE__', 64, 64, 64, 64
    );

    PS_DEFAULT_TEXTURE_BUILT = true;

  }

  static get DEFAULT_TEXTURE () {

    return PS_DEFAULT_TEXTURE;
  
  }

  GetBufferData () {

    this.UpdateTransform( this.parent );
    this.UpdateTextureTransform();

    const transformData = this.transform.globalTransform.AsArray( true );
    const textureTranslationData = this.textureTranslation.AsArray( true );
    const textureTransformationData = this.textureTransformation.AsArray( true );

    if ( this.bufferData == null ) {

      this.bufferData = [];
    
    }

    const bufferData = this.bufferData;

    bufferData.length = 0;
    bufferData[ 0 ] = transformData[ 0 ];
    bufferData[ 1 ] = transformData[ 1 ];
    bufferData[ 2 ] = transformData[ 2 ];
    bufferData[ 3 ] = transformData[ 3 ];
    bufferData[ 4 ] = transformData[ 4 ];
    bufferData[ 5 ] = transformData[ 5 ];
    bufferData[ 6 ] = transformData[ 6 ];
    bufferData[ 7 ] = transformData[ 7 ];
    bufferData[ 8 ] = transformData[ 8 ];
    bufferData[ 9 ] = textureTranslationData[ 0 ];
    bufferData[ 10 ] = textureTranslationData[ 1 ];
    bufferData[ 11 ] = textureTranslationData[ 2 ];
    bufferData[ 12 ] = textureTranslationData[ 3 ];
    bufferData[ 13 ] = textureTranslationData[ 4 ];
    bufferData[ 14 ] = textureTranslationData[ 5 ];
    bufferData[ 15 ] = textureTranslationData[ 6 ];
    bufferData[ 16 ] = textureTranslationData[ 7 ];
    bufferData[ 17 ] = textureTranslationData[ 8 ];
    bufferData[ 18 ] = textureTransformationData[ 0 ];
    bufferData[ 19 ] = textureTransformationData[ 1 ];
    bufferData[ 20 ] = textureTransformationData[ 2 ];
    bufferData[ 21 ] = textureTransformationData[ 3 ];
    bufferData[ 22 ] = textureTransformationData[ 4 ];
    bufferData[ 23 ] = textureTransformationData[ 5 ];
    bufferData[ 24 ] = textureTransformationData[ 6 ];
    bufferData[ 25 ] = textureTransformationData[ 7 ];
    bufferData[ 26 ] = textureTransformationData[ 8 ];

    return bufferData;
  
  }

  UpdateInBuffer () {

    this.UpdateTransform( this.parent );
    this.UpdateTextureTransform();

    const transformData = this.transform.globalTransform.AsArray( true );
    const textureTranslationData = this.textureTranslation.AsArray( true );
    const textureTransformationData = this.textureTransformation.AsArray( true );
    const buffer = this.parent.childDataBuffer;
    const index = this.bufferStartIndex;

    buffer[ index ] = transformData[ 0 ];
    buffer[ index + 1 ] = transformData[ 1 ];
    buffer[ index + 2 ] = transformData[ 2 ];
    buffer[ index + 3 ] = transformData[ 3 ];
    buffer[ index + 4 ] = transformData[ 4 ];
    buffer[ index + 5 ] = transformData[ 5 ];
    buffer[ index + 6 ] = transformData[ 6 ];
    buffer[ index + 7 ] = transformData[ 7 ];
    buffer[ index + 8 ] = transformData[ 8 ];
    buffer[ index + 9 ] = textureTranslationData[ 0 ];
    buffer[ index + 10 ] = textureTranslationData[ 1 ];
    buffer[ index + 11 ] = textureTranslationData[ 2 ];
    buffer[ index + 12 ] = textureTranslationData[ 3 ];
    buffer[ index + 13 ] = textureTranslationData[ 4 ];
    buffer[ index + 14 ] = textureTranslationData[ 5 ];
    buffer[ index + 15 ] = textureTranslationData[ 6 ];
    buffer[ index + 16 ] = textureTranslationData[ 7 ];
    buffer[ index + 17 ] = textureTranslationData[ 8 ];
    buffer[ index + 18 ] = textureTransformationData[ 0 ];
    buffer[ index + 19 ] = textureTransformationData[ 1 ];
    buffer[ index + 20 ] = textureTransformationData[ 2 ];
    buffer[ index + 21 ] = textureTransformationData[ 3 ];
    buffer[ index + 22 ] = textureTransformationData[ 4 ];
    buffer[ index + 23 ] = textureTransformationData[ 5 ];
    buffer[ index + 24 ] = textureTransformationData[ 6 ];
    buffer[ index + 25 ] = textureTransformationData[ 7 ];
    buffer[ index + 26 ] = textureTransformationData[ 8 ];
  
  }

  CreateAnimation ( _data ) {

    if ( this.animationController === null ) {

      this.animationController = new Controller( this );
      
    }
  
    let i;
    const animation = this.animationController.CreateAnimation( _data.id, _data.rate );
  
    if ( _data.spritesheet != null ) {

      let frame = null;
  
      for ( i = 0; i < _data.frames.length; ++i ) {

        frame = _data.spritesheet.GetFrameById( _data.frames[ i ].id || _data.frames[ i ] );
        
        if ( _data.frames[ i ].rate != null ) {

          frame.rate = _data.frames[ i ].rate;
        
        }
  
        animation.CreateFrame( frame.x, frame.y, frame.w, frame.h, frame.rate );
        
      }
      
    } else {

      for ( i = 0; i < _data.frames.length; ++i ) {
  
        animation.AddFrame( _data.frames[ i ] );
        
      }
    
    }

    animation.loop = !!_data.loop;
    animation.overrideFrameRate = !!_data.overrideFrameRate;
    animation.reverse = !!_data.reverse;

    return animation;
  
  }

  PlayAnimation ( _id, _frameIndex ) {

    this.animationController.PlayAnimation( _id, _frameIndex );
  
  }

  StopCurrentAnimation () {

    this.animationController.StopCurrentAnimation();

  }

  IntersectsPoint2D ( _p ) {

    if ( this.interactive === false ) return false;

    PS_TP.SetV( _p );
    PS_TP.SubtractV( this.position );
    PS_TP.Add( this.width * this.anchor.x, this.height * this.anchor.y );

    return this.shape.IntersectsPoint2D( PS_TP );
  
  }

}

// Private Static ----->
const PS_TP = new Vector2D( 0, 0 );
let PS_DEFAULT_TEXTURE = null;
let PS_DEFAULT_TEXTURE_BUILT = false;
// <----- Private Static
