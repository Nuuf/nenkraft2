/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../vector/vector2d';

export class BaseTransform2D {

  constructor ( _x, _y ) {

    this.position = new Vector2D( _x, _y );
    this.scale = new Vector2D( 1, 1 );
    this.localTransform = new Vector2D( 0, 0 );
    this.globalTransform = new Vector2D( 0, 0 );
  
  }

  UpdateLocal () {

    this.localTransform.SetV( this.position );
  
  }

  UpdateGlobal ( _parentGlobalTransform ) {

    const localTransform = this.localTransform;
    localTransform.SetV( this.position );
    this.globalTransform.Set( _parentGlobalTransform.e + localTransform.x, _parentGlobalTransform.f + localTransform.y );
  
  }

  ApplyGlobal ( _rc ) {

    _rc.setTransform( this.scale.x, 0, 0, this.scale.y, this.globalTransform.x, this.globalTransform.y );
  
  }

}
