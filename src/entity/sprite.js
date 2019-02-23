/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { TextureEntity2D } from './texture-entity2d';
import { Controller as AnimationController } from '../animator/controller';
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
        
        } ), _onLoad, 64, 64
      ), '__DEFAULT_SPRITE_TEXTURE__', 64, 64, 64, 64
    );

    PS_DEFAULT_TEXTURE_BUILT = true;

  }

  static get DEFAULT_TEXTURE () {

    return PS_DEFAULT_TEXTURE;
  
  }

  CreateAnimation ( _data ) {

    if ( this.animationController === null ) {

      this.animationController = new AnimationController( this );
      
    }
  
    let i;
    const animation = this.animationController.CreateAnimation( _data.id, _data.frameDuration, _data.dynamicSize );
  
    if ( _data.spritesheet != null ) {

      let frame = null;
  
      for ( i = 0; i < _data.frames.length; ++i ) {

        frame = _data.spritesheet.GetFrameById( _data.frames[ i ].id || _data.frames[ i ] );
  
        animation.CreateFrame( 
          frame.x, frame.y,
          frame.w, frame.h,
          _data.frames[ i ].duration,
          frame.offsetX, frame.offsetY,
          frame.originW, frame.originH
        );
        
      }
      
    } else {

      for ( i = 0; i < _data.frames.length; ++i ) {
  
        animation.AddFrame( _data.frames[ i ] );
        
      }
    
    }

    animation.loop = !!_data.loop;
    animation.overrideFrameTimer = !!_data.overrideFrameTimer;
    animation.reverse = !!_data.reverse;

    return animation;
  
  }

  PlayAnimation ( _id, _frameIndex ) {

    this.animationController.PlayAnimation( _id, _frameIndex );
  
  }

  StopCurrentAnimation () {

    this.animationController.StopCurrentAnimation();

  }

}

// Private Static ----->
let PS_DEFAULT_TEXTURE = null;
let PS_DEFAULT_TEXTURE_BUILT = false;
// <----- Private Static
