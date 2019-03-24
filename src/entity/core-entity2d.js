/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Transform2D } from '../math/transform/transform2d';
import { Vector2D } from '../math/vector/vector2d';
import { Bounds2D } from '../math/bounds/bounds2d';
import { ArrayHandler } from '../utility/array-handler';

const Abs = Math.abs;

export class CoreEntity2D {

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   */
  constructor ( _x, _y ) {

    this.transform = new Transform2D( _x, _y );
    this.data = {};
    this.w = 0;
    this.h = 0;
    this.bounds = new Bounds2D();
    this.globalPosition = null;
    this.transformShouldUpdate = true;
    this.transformAutomaticUpdate = true;
    this.render = true;
    // Reserved
    this.motionManager = null;
    this.arrayHandler = null;
    this.__inside__ = null;

  }
  
  /**
   * 
   * @return {number}
   */
  get rotation () {

    return this.transform.rotation;
  
  }

  /**
   * 
   * @param {number} _value
   */
  set rotation ( _value ) {

    this.transform.rotation = _value;
    this.transform.UpdateSkew();
  
  }

  /**
   * 
   * @return {Vector2D}
   */
  get scale () {

    return this.transform.scale;
  
  }

  /**
   * 
   * @return {Vector2D}
   */
  get position () {

    return this.transform.position;
  
  }

  /**
   * 
   * @return {Vector2D}
   */
  get pivot () {

    return this.transform.pivot;
  
  }

  /**
   * 
   * @return {number}
   */
  get x () {

    return this.transform.position.x;
  
  }

  /**
   * 
   * @param {number} _value
   */
  set x ( _value ) {

    this.transform.position.x = _value;
  
  }

  /**
   * 
   * @return {number}
   */
  get y () {

    return this.transform.position.y;
  
  }

  /**
   * 
   * @param {number} _value
   */
  set y ( _value ) {

    this.transform.position.y = _value;
  
  }

  /**
   * 
   * @return {number}
   */
  get width () {

    return this.w * this.scale.x;
  
  }

  /**
   *
   * @param {number} _value
   */
  set width ( _value ) {

    this.scale.x = _value / this.w;
    
  }

  /**
   * 
   * @return {number}
   */
  get height () {

    return this.h * this.scale.y;
  
  }

  /**
   *
   * @param {number} _value
   */
  set height ( _value ) {

    this.scale.y = _value / this.h;
    
  }

  /**
   * 
   * @param {Container2D} _parent 
   * 
   * @return {void}
   */
  UpdateTransform ( _parent ) {

    if ( _parent != null ) {

      this.transform.UpdateGlobal( _parent.transform.globalTransform );
      
    } else {
  
      this.transform.UpdateGlobal( PS_NULL_TRANSFORM.globalTransform );
      
    }
  
  }

  /**
   * 
   * @param {Container2D} _parent 
   * 
   * @return {void}
   */
  ProcessTransform ( _parent ) {

    if ( this.transformShouldUpdate === true ) {

      this.UpdateTransform( _parent );
      if ( this.transformAutomaticUpdate === false ) this.transformShouldUpdate = false;
      
    }
  
  }

  /**
   * 
   * @return {this}
   */
  RequestTransformUpdate () {

    this.transformShouldUpdate = true;

    return this;
  
  }

  /**
   * 
   * @return {Vector2D}
   */
  ComputeGlobalPosition () {

    const gt = this.transform.globalTransform;

    if ( this.globalPosition === null ) {

      this.globalPosition = new Vector2D( gt.e, gt.f );
    
    } else {

      this.globalPosition.Set( gt.e, gt.f );
      
    }

    return this.globalPosition;
  
  }

  /**
   * 
   * @param {Vector2D} _anchor 
   * 
   * @return {AABB2D}
   */
  ComputeLocalBounds ( _anchor ) {

    return this.bounds.ComputeLocal( 
      this.x,
      this.y,
      this.width,
      this.height,
      _anchor,
      this
    );
  
  }

  /**
   * 
   * @param {Vector2D} _anchor 
   * @param {Matrix2D} _matrix 
   * 
   * @return {AABB2D}
   */
  ComputeGlobalBounds ( _anchor, _matrix ) {

    const gt = this.transform.globalTransform;

    return this.bounds.ComputeGlobal( 
      gt.e,
      gt.f,
      Abs( this.w * gt.a ),
      Abs( this.h * gt.d ),
      _anchor,
      this,
      _matrix
    );
  
  }

  /**
   * 
   * @return {this}
   */
  AHCreate () {

    this.arrayHandler = new ArrayHandler( this );

    return this;
  
  }

  /**
   * 
   * @param {string} _id 
   * 
   * @return {this}
   */
  AHIn ( _id ) {

    this.arrayHandler.In( _id );

    return this;
  
  }

  /**
   * 
   * @param {string} _id 
   * 
   * @return {this}
   */
  AHOut ( _id ) {

    this.arrayHandler.Out( _id );

    return this;
  
  }

}

// Private Static ----->
const PS_NULL_TRANSFORM = new Transform2D();
// <----- Private Static
