/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../../vector/vector2d';

export class Body2D {

  constructor ( _shape ) {

    this.shape = _shape;
    this.mass = 0;
    this.relative = null;
    this.velocity = new Vector2D( 0, 0 );
    this.offset = new Vector2D( 0, 0 );

  }

  SetMass ( _n ) {

    this.mass = _n;

    return this;
  
  }

  SetOffset ( _x, _y ) {

    this.offset.Set( _x, _y );

    return this;
  
  }

  SetVelocity ( _x, _y ) {

    this.velocity.Set( _x, _y );

    return this;

  }

  SetVelocityV ( _v ) {

    this.velocity.SetV( _v );

    return this;
  
  }

  GetPosition () {

    return this.shape.GetPosition();

  }

  SetPosition ( _x, _y ) {

    this.shape.SetPosition( _x + this.offset.x, _y + this.offset.y );

  }

  SetPositionV ( _v ) {

    this.SetPosition( _v.x, _v.y );

    return this;
  
  }

  SetRelative ( _relative ) {

    this.relative = _relative;

    return this;

  }

}
