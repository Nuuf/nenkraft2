/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { TextureEntity2D } from './texture-entity2d';
import { Vector2D } from '../math/vector/vector2d';
import { BasicTexture2D } from '../texture/basic-texture2d';
import { ImageFromDataURL, GenerateSimpleBase64PNG } from '../utility/browser-utility';
import { Polygon2D } from '../path/polygon2d';
import { Graphic2D } from './graphic2d';

export class Tilesprite extends TextureEntity2D {

  /**
   * 
   * @param {number}         _x 
   * @param {number}         _y 
   * @param {BasicTexture2D} _texture 
   * @param {integer?}       _unitId 
   */
  constructor ( _x, _y, _texture, _unitId ) {

    super( _x, _y, _texture == null ? PS_DEFAULT_TEXTURE : _texture, _unitId );
    
    this.pattern = null;
    this.patternOffset = new Vector2D( 0, 0 );
  
  }

  /**
   * 
   * @param {Function} _onLoad 
   * 
   * @return {void}
   */
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
        
        } ), _onLoad, 64, 64
      ), '__DEFAULT_TILESPRITE_TEXTURE__', 64, 64, 64, 64
    );

    PS_DEFAULT_TEXTURE_BUILT = true;

  }

  /**
   * 
   * @return {BasicTexture2D|null}
   */
  static get DEFAULT_TEXTURE () {

    return PS_DEFAULT_TEXTURE;
  
  }

  /**
   * 
   * @param {CanvasRenderingContext2D} _rc 
   * 
   * @return {void}
   */
  Render ( _rc ) {

    this.PreRender( _rc );

    if ( this.render === true ) {

      this.ProcessTransform( this.parent );

      if ( this.display === true && this.pattern !== null ) {

        this.transform.ApplyGlobal( _rc );

        _rc.globalAlpha = this.tint.channel[ 3 ];
        _rc.globalCompositeOperation = this.gco;
        _rc.fillStyle = this.pattern;
        _rc.beginPath();
        _rc.rect( 0, 0, this.w, this.h );
        _rc.closePath();
        _rc.translate( this.patternOffset.x, this.patternOffset.y );
        _rc.fill();
      
      }

      if ( this.children.length > 0 ) {

        this.RenderChildren( _rc );
      
      }
    
    }

    this.PostRender( _rc );
  
  }

  /**
   * 
   * @param {CanvasRenderingContext2D} _rc 
   * @param {number}                   _w 
   * @param {number}                   _h 
   * 
   * @return {void}
   */
  GeneratePattern ( _rc, _w, _h ) {

    if ( this.programController == null ) {

      this.pattern = _rc.createPattern( this.texture.image, null );
      this.w = _w;
      this.h = _h;
      this.scale.SetSame( 1 );
      
    } else {
  
      this.width = _w;
      this.height = _h;
      this.textureTransformation.SetTransform( 0, 0, this.scale.x, this.scale.y );
      
    }
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   * 
   * @return {void}
   */
  OffsetPattern ( _x, _y ) {

    this.patternOffset.Add( _x, _y );
    this.textureTransformation.Translate( -_x / this.w, -_y / this.h );
  
  }

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   * 
   * @return {void}
   */
  SetPatternOffset ( _x, _y ) {

    this.patternOffset.Set( _x, _y );
    this.textureTransformation.TranslateTo( -_x / this.w, -_y / this.h );
  
  }

  /**
   * 
   * @return {Vector2D}
   */
  GetPatternOffset () {

    return this.patternOffset;
  
  }

}

// Private Static ----->
let PS_DEFAULT_TEXTURE = null;
let PS_DEFAULT_TEXTURE_BUILT = false;
// <----- Private Static
