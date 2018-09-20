/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Container2D } from './container2d';
import { Vector2D } from '../math/vector/vector2d';

const Cos = Math.cos;
const Sin = Math.sin;

export class Camera2D extends Container2D {

  constructor ( _focus, _target ) {

    super( 0, 0 );

    this.focus = _focus;
    this.target = _target;
    this.velocity = new Vector2D( 0, 0 );
    this.force = new Vector2D( 1, 1 );
    this.stopRadiusSq = 1000;
    this.EPSILON = 0.0002;
  
  }

  Process () {

    const target = this.target;

    if ( target != null ) {

      PS_TARGET_POSITION.SetV( target.position );

      PS_TARGET_POSITION.Invert();
      PS_TARGET_POSITION.AddV( this.focus );

      PS_DELTA.SetV( this.position ).SubtractV( PS_TARGET_POSITION );
      let distance = PS_DELTA.GetMagnitudeSquared();

      if ( distance < this.stopRadiusSq ) {

        return;
      
      }

      distance *= this.EPSILON;

      const theta = PS_DELTA.GetAngle();

      this.velocity
        .Set( 
          distance * Cos( theta ),
          distance * Sin( theta )
        )
        .MultiplyV( this.force );

      this.position.SubtractV( this.velocity );
    
    }
  
  }

  SetTarget ( _target ) {

    this.target = _target;

    return this;
  
  }

}

// Private Static ----->
let PS_DELTA = new Vector2D( 0, 0 );
let PS_TARGET_POSITION = new Vector2D( 0, 0 );
// <----- Private static
