/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { VisualContainer2D } from './visual-container2d';
import { Vector2D } from '../math/vector/vector2d';

const Cos = Math.cos;
const Sin = Math.sin;

export class Camera2D extends VisualContainer2D {

  constructor ( _focus, _target ) {

    super( 0, 0 );

    this.focus = _focus;
    this.target = _target;
    this.velocity = new Vector2D( 0, 0 );
    this.force = new Vector2D( 1, 1 );
    this.maxX = null;
    this.maxY = null;
    this.minX = null;
    this.minY = null;
    this.stopRadiusSq = 1000;
    this.EPSILON = 0.0002;
  
  }

  Process () {

    const target = this.target;

    if ( target != null ) {

      PS_TARGET_POSITION.SetV( target.position ).Invert().AddV( this.focus );

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

    if ( this.maxX != null ) {

      if ( this.x > this.maxX ) {

        this.x = this.maxX;
        
      }
      
    }
      
    if ( this.minX != null ) {

      if ( this.x < this.minX ) {

        this.x = this.minX;
        
      }
      
    }

    if ( this.maxY != null ) {

      if ( this.y > this.maxY ) {

        this.y = this.maxY;
        
      }
      
    }
      
    if ( this.minY != null ) {

      if ( this.y < this.minY ) {

        this.y = this.minY;
        
      }
      
    }
  
  }

  SetTarget ( _target ) {

    this.target = _target;

    return this;
  
  }

  SetMax ( _x, _y ) {

    this.maxX = _x;
    this.maxY = _y;

    return this;
  
  }

  SetMin ( _x, _y ) {

    this.minX = _x;
    this.minY = _y;

    return this;
  
  }

}

// Private Static ----->
let PS_DELTA = new Vector2D( 0, 0 );
let PS_TARGET_POSITION = new Vector2D( 0, 0 );
// <----- Private Static
