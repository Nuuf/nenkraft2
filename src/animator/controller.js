/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Animation } from './animation';

export class Controller {

  constructor ( _sprite ) {

    this.animations = [];
    this.sprite = null;
    this.currentAnimation = null;
    if ( _sprite != null ) this.sprite = _sprite;
  
  }

  CreateAnimation ( _id, _frameDuration, _dynamicSize ) {

    const animation = new Animation( this, _id, _frameDuration, _dynamicSize );

    this.animations.push( animation );

    return animation;
  
  }

  AddAnimation ( _animation ) {

    _animation.controller = this;
    this.animations.push( _animation );
  
  }

  GetAnimationById ( _id ) {

    const animations = this.animations;
    let animation = animations[ 0 ];

    for ( var i = 0; i < animations.length; animation = animations[ ++i ] ) {

      if ( animation && animation.id === _id ) return animation;
      
    }
  
    return null;
  
  }

  PlayAnimation ( _id, _frameIndex ) {

    const animation = this.GetAnimationById( _id );

    if ( animation !== null ) {

      this.currentAnimation = animation;
      animation.Start( _frameIndex );
    
    }
  
  }

  StopCurrentAnimation () {

    if ( this.currentAnimation !== null ) {

      this.currentAnimation.Stop();
      
    } 
  
  }

  Process () {

    if ( this.currentAnimation !== null ) this.currentAnimation.Process();
  
  }

}
