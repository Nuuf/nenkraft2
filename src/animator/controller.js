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

  CreateAnimation ( _id, _rate ) {

    const animation = Animation( this, _id, _rate );
    this.animations.push( animation );
    return animation;
  
  }

  AddAnimation ( _animation ) {

    _animation.controller = this;
    this.animations.push( _animation );
  
  }

  GetAnimationById ( _id ) {

    let i = 0;
    const animations = this.animations;
    const l = animations.length;
    let animation = animations[i];

    for ( ; i < l; animation = animations[++i] ) {

      if ( animation && animation.id === _id ) return animation;
      
    }
  
    return null;
  
  }

  PlayAnimation ( _id, _frameIndex ) {

    const animation = this.GetAnimationById( _id );

    if ( animation !== null ) {

      this.currentAnimation = animation;
      animation.Restart( _frameIndex );
    
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
