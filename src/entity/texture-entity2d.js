/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { BatchableContainer2D } from './batchable-container2d';
import { Vector2D } from '../math/vector/vector2d';
import { Matrix2D } from '../math/matrix/matrix2d';
import { AABB2D } from '../geom/aabb/aabb2d';
import { Color } from '../utility/color';
import { GLTexture2DProgramController } from '../controller/program-controller/gl-texture2d-program-controller';
import { GLDynamicTexture2DProgramController } from '../controller/program-controller';
import { DEFAULT } from '../style/gco';

export class TextureEntity2D extends BatchableContainer2D {

  constructor ( _x, _y, _texture, _unitId ) {

    super( _x, _y );

    this.anchor = new Vector2D( 0, 0 );
    this.shape = new AABB2D( 0, 0, 0, 0 );
    this.clip = new AABB2D( 0, 0, 0, 0 );
    this.textureTransformation = new Matrix2D();
    this.textureTranslation = new Matrix2D();
    this.originalShape = new AABB2D( 0, 0, 0, 0 );
    this.tint = new Color( 1, 1, 1, 1 );
    this.texture = null;
    this.gco = DEFAULT;
    this.programController = null;

    if ( _texture instanceof GLTexture2DProgramController ) {

      this.programController = _texture;

      this.SetTexture( _texture.originalTexture );
    
    } else if ( _texture instanceof GLDynamicTexture2DProgramController ) {

      this.programController = _texture;

      if ( _unitId != null ) {

        this.SetTexture( _texture.originalTextures[ _unitId ] );
      
      } else {

        this.SetTexture( _texture.originalTextures[ 0 ] );
      
      }
    
    } else if ( _texture != null ) {

      this.SetTexture( _texture );

    }

  }

  get alpha () {

    return this.tint.channel[ 3 ];
  
  }

  set alpha ( _value ) {

    this.tint.channel[ 3 ] = _value;
  
  }

  Render ( _rc ) {

    this.PreRender( _rc );

    if ( this.render === true ) {

      this.ProcessTransform( this.parent );

      if ( this.display === true ) {

        const clip = this.clip;
        const tl = clip.tl;
        const br = clip.br;
        const ttl = this.textureTranslation;

        this.transform.ApplyGlobal( _rc );

        _rc.globalAlpha = this.tint.channel[ 3 ];
        _rc.globalCompositeOperation = this.gco;
        _rc.drawImage(
          this.texture.image,
          tl.x, tl.y,
          br.x, br.y,
          ttl.e, ttl.f,
          this.w, this.h
        );
      
      }

      if ( this.children.length > 0 ) {

        this.RenderChildren( _rc );
      
      }
    
    }

    this.PostRender( _rc );
  
  }

  GLRender ( _gl ) {

    this.GLPreRender( _gl );

    if ( this.render === true ) {

      this.ProcessTransform( this.parent );

      if ( this.display === true ) {

        if ( this.programController !== null ) {

          this.programController.Execute(
            this.transform.globalTransform.AsArray( true ),
            this.textureTranslation.AsArray( true ),
            this.textureTransformation.AsArray( true ),
            this.tint.channel,
            this.texture.uniformId
          );

        }

        if ( this.children.length > 0 ) {

          if ( this.isBatchParent === true ) {

            this.GLBatchRenderChildren( _gl );
        
          } else {

            this.GLRenderChildren( _gl );
        
          }
      
        }
      
      }
    
    }

    this.GLPostRender( _gl );
  
  }

  UpdateTextureTransform () {

    this.textureTranslation.TranslateTo(
      -this.w * this.anchor.x,
      -this.h * this.anchor.y
    );
    this.textureTransformation.TranslateTo(
      this.w / this.texture.fw * this.clip.tl.x / this.w,
      this.h / this.texture.fh * this.clip.tl.y / this.h
    );
  
  }

  UpdateShape ( _newShape ) {

    if ( _newShape != null ) {

      this.originalShape = _newShape;
      
    }
  
    this.shape.SetC( this.originalShape );
    this.shape.Scale( this.scale.x, this.scale.y );
  
  }

  ClipReconfigure ( _x, _y, _w, _h ) {

    const tscaleX = _w / this.texture.fw;
    const tscaleY = _h / this.texture.fh;
    const width = this.width;
    const height = this.height;

    this.clip.Set( _x, _y, _w, _h );
    this.w = _w;
    this.h = _h;

    if ( width !== 0 && height !== 0 ) {

      this.width = width;
      this.height = height;
    
    }
    
    this.textureTranslation.SetTransform( 
      -_w * this.anchor.x,
      -_h * this.anchor.y,
      tscaleX, tscaleY
    );
    
    this.textureTransformation.SetTransform( 
      tscaleX * this.clip.tl.x / _w,
      tscaleY * this.clip.tl.y / _h,
      tscaleX, tscaleY
    );
  
  }

  SetTexture ( _texture ) {

    this.texture = _texture;
    this.ClipReconfigure( 0, 0, _texture.w, _texture.h );
    this.shape.SetC( this.clip );
    this.originalShape.SetC( this.shape );
  
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
// <----- Private Static
