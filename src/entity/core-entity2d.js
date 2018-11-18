/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Transform2D } from '../math/transform/transform2d';
import { Vector2D } from '../math/vector/vector2d';
import { Bounds2D } from '../math/bounds/bounds2d';

export class CoreEntity2D {

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
    this.motionManager = null;

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

    this.scale.x = _value / this.w;
    
  }

  get height () {

    return this.h * this.scale.y;
  
  }

  set height ( _value ) {

    this.scale.y = _value / this.h;
    
  }

  UpdateTransform ( _parent ) {

    if ( _parent != null ) {

      this.transform.UpdateGlobal( _parent.transform.globalTransform );
      
    } else {
  
      this.transform.UpdateGlobal( PS_NULL_TRANSFORM.globalTransform );
      
    }
  
  }

  ProcessTransform ( _parent ) {

    if ( this.transformShouldUpdate === true ) {

      this.UpdateTransform( _parent );
      if ( this.transformAutomaticUpdate === false ) this.transformShouldUpdate = false;
      
    }
  
  }

  RequestTransformUpdate () {

    this.transformShouldUpdate = true;
  
  }

  GetGlobalPosition ( _matrix ) {

    const wt = this.transform.globalTransform;

    if ( this.globalPosition === null ) {

      this.globalPosition = new Vector2D( wt.e, wt.f );
    
    } else {

      this.globalPosition.Set( wt.e, wt.f );
      
    }

    if ( _matrix != null ) {

      this.globalPosition.Subtract( _matrix.e, _matrix.f );
      this.globalPosition.Divide( _matrix.a, _matrix.d );
    
    }

    return this.globalPosition;
  
  }

  ComputeLocalBounds ( _anchor ) {

    return this.bounds.ComputeLocal( this.x, this.y, this.width, this.height, _anchor, this );
  
  }

  ComputeGlobalBounds ( _anchor, _matrix ) {

    const p = this.GetGlobalPosition( _matrix );

    return this.bounds.ComputeGlobal( p.x, p.y, this.width, this.height, _anchor, this );
  
  }

}

// Private Static ----->
const PS_NULL_TRANSFORM = new Transform2D();
// <----- Private Static
