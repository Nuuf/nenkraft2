/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Animation } from './animation';

export class Controller {

  /**
   * 
   * @param {Sprite?} _sprite 
   */
  constructor ( _sprite ) {

    this.animations = [];
    this.sprite = null;
    this.currentAnimation = null;
    if ( _sprite != null ) this.sprite = _sprite;
  
  }

  /**
   * 
   * @param {string|any} _id 
   * @param {integer?}   _frameDuration 
   * @param {boolean?}   _dynamicSize 
   * 
   * @return {Animation}
   */
  CreateAnimation ( _id, _frameDuration, _dynamicSize ) {

    const animation = new Animation( this, _id, _frameDuration, _dynamicSize );

    this.animations.push( animation );

    return animation;
  
  }

  /**
   *
   * @param {Animation} _animation 
   * 
   * @return {void}
   */
  AddAnimation ( _animation ) {

    _animation.controller = this;
    this.animations.push( _animation );
  
  }

  /**
   * 
   * @param {string|any} _id 
   * 
   * @return {Animation|null}
   */
  GetAnimationById ( _id ) {

    const animations = this.animations;
    let animation = animations[ 0 ];

    for ( var i = 0; i < animations.length; animation = animations[ ++i ] ) {

      if ( animation && animation.id === _id ) return animation;
      
    }
  
    return null;
  
  }

  /**
   * 
   * @param {string|any} _id 
   * @param {integer?}   _frameIndex 
   * 
   * @return {void}
   */
  PlayAnimation ( _id, _frameIndex ) {

    const animation = this.GetAnimationById( _id );

    if ( animation !== null ) {

      this.currentAnimation = animation;
      animation.Start( _frameIndex );
    
    }
  
  }

  /**
   * 
   * @return {void}
   */
  StopCurrentAnimation () {

    if ( this.currentAnimation !== null ) {

      this.currentAnimation.Stop();
      
    } 
  
  }

  /**
   * 
   * @return {void}
   */
  Process () {

    if ( this.currentAnimation !== null ) this.currentAnimation.Process();
  
  }

}
