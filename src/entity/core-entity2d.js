/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Transform2D } from '../math/transform/transform2d';
import { Vector2D } from '../math/vector/vector2d';
import { AABB2D } from '../geom/aabb/aabb2d';

export class CoreEntity2D {

  constructor ( _x, _y ) {

    this.transform = new Transform2D( _x, _y );
    this.data = {};
    this.parent = null;
    this.w = 0;
    this.h = 0;
    this.bounds = null;
    this.boundsDirty = true;
    this.globalPosition = null;

  }

  UpdateTransform () {

    if ( this.parent != null ) {

      this.transform.UpdateGlobal( this.parent.transform.globalTransform );
      
    } else {
  
      this.transform.UpdateGlobal( PS_NULL_TRANSFORM.globalTransform );
      
    }
  
  }

  GetGlobalPosition () {

    const wt = this.transform.globalTransform;

    if ( this.globalPosition === null ) {

      this.globalPosition = new Vector2D( wt.e, wt.f );
    
    } else {

      this.globalPosition.Set( wt.e, wt.f );
      
    }

    return this.globalPosition;
  
  }

  ComputeBounds ( _anchor ) {

    let wtax = 0;
    let htay = 0;

    if ( _anchor != null ) {

      wtax = this.width * _anchor.x;
      htay = this.height * _anchor.y;
    
    }

    if ( this.bounds === null ) {

      this.bounds = new AABB2D(
        this.x - wtax,
        this.y - htay,
        this.x + this.width - wtax,
        this.y + this.height - htay
      );
      this.bounds.belongsTo = this;
    
    } else {

      this.bounds.Set(
        this.x - wtax,
        this.y - htay,
        this.x + this.width - wtax,
        this.y + this.height - htay
      );
    
    }

    this.boundsDirty = false;

    return this.bounds;
  
  }

  get rotation () {

    return this.transform.rotation;
  
  }

  set rotation ( _value ) {

    this.transform.rotation = _value;
    this.transform.UpdateSkew();
  
  }

  get scale () {

    return this.transform.scale;
  
  }

  get position () {

    return this.transform.position;
  
  }

  get pivot () {

    return this.transform.pivot;
  
  }

  get x () {

    return this.transform.position.x;
  
  }

  set x ( _value ) {

    this.transform.position.x = _value;
  
  }

  get y () {

    return this.transform.position.y;
  
  }

  set y ( _value ) {

    this.transform.position.y = _value;
  
  }

  get width () {

    return this.w * this.scale.x;
  
  }

  set width ( _value ) {

    this.w = _value;
  
  }

  get height () {

    return this.h * this.scale.y;
  
  }

  set height ( _value ) {

    this.h = _value;
  
  }

}

// Private Static ----->
const PS_NULL_TRANSFORM = new Transform2D();
// <----- Private static
