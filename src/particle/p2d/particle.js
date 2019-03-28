/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../../math/vector/vector2d';
import { Pool } from '../../utility/pool';
import { Oscillation } from './oscillation';
import { Oscillate } from '../../math';
import { RandomInteger, MinMaxOrValue, RandomInArray } from '../../utility';
import { Sprite } from '../../entity/sprite';

export class Particle {

  /**
   * 
   * @param {object}   _options 
   * @param {integer?} _index 
   */
  constructor ( _options, _index ) {

    this.velocity = new Vector2D( 0, 0 );
    this.torque = 0;
    this.spin = 0;
    this.growth = new Vector2D( 1, 1 );
    this.acceleration = new Vector2D( 1, 1 );
    this.initialScale = new Vector2D( 1, 1 );
    this.fade = false;
    this.deflate = false;
    this.gravity = new Vector2D( 0, 0 );
    this.lifespan = 0;
    this.lifespanTotal = 0;
    this.dead = false;
    this.entity = null;
    this.system = null;
    this.oscillation = null;
    this.oscillationOffset = 0;
    this.Renew( _options, _index );
  
  }

  /**
   * 
   * @return {boolean}
   */
  static get USE_POOL () {

    return PS_USE_POOL;
  
  }

  /**
   * 
   * @param {boolean} _value
   */
  static set USE_POOL ( _value ) {

    PS_USE_POOL = !!_value;
  
  }

  /**
   * 
   * @return {Pool}
   */
  static get pool () {

    return PS_pool;
  
  }

  /**
   * 
   * @return {void}
   */
  Process () {

    if ( this.dead === true ) return;

    if ( this.lifespan++ < this.lifespanTotal ) {

      const entity = this.entity;
      const velocity = this.velocity;
      const lifespanPerc = 1 - this.lifespan / this.lifespanTotal;
      const osc = this.oscillation;

      velocity.AddV( this.gravity ).MultiplyV( this.acceleration );

      if ( this.torque !== 0 ) velocity.Rotate( this.torque );
  
      entity.position.AddV( velocity );

      if ( this.fade === true ) {

        entity.alpha = lifespanPerc;

      }

      if ( this.deflate === true ) {

        entity.scale.Set( 
          lifespanPerc * this.initialScale.x,
          lifespanPerc * this.initialScale.y
        );
      
      } else {

        entity.scale.MultiplyV( this.growth );
      
      }

      entity.rotation += this.spin;

      if ( osc !== null && osc.active === true ) {

        const oscTime = this.lifespan + this.oscillationOffset;

        if ( osc.torque != null && osc.torque.active === true ) {

          this.torque = Oscillate(
            oscTime, 
            osc.torque.from,
            osc.torque.to,
            osc.torque.amplitude
          );
        
        }

        if ( osc.spin != null && osc.spin.active === true ) {

          this.spin = Oscillate(
            oscTime, 
            osc.spin.from,
            osc.spin.to,
            osc.spin.amplitude
          );
        
        }

        if ( osc.velocityX != null && osc.velocityX.active === true ) {

          this.velocity.x = Oscillate(
            oscTime, 
            osc.velocityX.from,
            osc.velocityX.to,
            osc.velocityX.amplitude
          );
        
        }

        if ( osc.velocityY != null && osc.velocityY.active === true ) {

          this.velocity.y = Oscillate(
            oscTime, 
            osc.velocityY.from,
            osc.velocityY.to,
            osc.velocityY.amplitude
          );
        
        }

        if ( osc.gravityX != null && osc.gravityX.active === true ) {

          this.gravity.x = Oscillate(
            oscTime, 
            osc.gravityX.from,
            osc.gravityX.to,
            osc.gravityX.amplitude
          );
        
        }

        if ( osc.gravityY != null && osc.gravityY.active === true ) {

          this.gravity.y = Oscillate(
            oscTime, 
            osc.gravityY.from,
            osc.gravityY.to,
            osc.gravityY.amplitude
          );
        
        }

        if ( osc.accelerationX != null && osc.accelerationX.active === true ) {

          this.acceleration.x = Oscillate(
            oscTime, 
            osc.accelerationX.from,
            osc.accelerationX.to,
            osc.accelerationX.amplitude
          );
        
        }

        if ( osc.accelerationY != null && osc.accelerationY.active === true ) {

          this.acceleration.y = Oscillate(
            oscTime, 
            osc.accelerationY.from,
            osc.accelerationY.to,
            osc.accelerationY.amplitude
          );
        
        }

        if ( osc.growthX != null && osc.growthX.active === true ) {

          this.growth.x = Oscillate(
            oscTime, 
            osc.growthX.from,
            osc.growthX.to,
            osc.growthX.amplitude
          );
        
        }

        if ( osc.growthY != null && osc.growthY.active === true ) {

          this.growth.y = Oscillate(
            oscTime, 
            osc.growthY.from,
            osc.growthY.to,
            osc.growthY.amplitude
          );
        
        }
      
      }
    
    } else {

      this.dead = true;
      this.entity.display = false;
    
    }
  
  }

  /**
   * 
   * @param {object}  _options 
   * @param {integer?} _index 
   * 
   * @return {void}
   */
  Renew ( _options, _index ) {

    if ( _options == null ) return;

    this.dead = false;
    let entity = this.entity;

    if ( _options.texture != null ) {

      if ( entity === null ) {
      
        entity = this.entity = new Sprite( 0, 0, _options.texture, _options.unitId );
        
        if ( _options.anchor != null ) {

          entity.anchor.SetV( _options.anchor );
          entity.UpdateTextureTransform();
        
        }

      } else {

        this.ResetEntity( _options.unitId );
    
      }

      if ( _options.frames != null ) {

        _options.frames[ RandomInteger( 0, _options.frames.length - 1 ) ].Apply( entity );
        entity.scale.SetSame( 1 );
        entity.UpdateTextureTransform();
      
      }

    } else {

      throw new Error( 'No texture or controller provided!' );
    
    }

    this.RenewVector( _options.position, entity.position, _index, 0, 0 );

    this.RenewVector( _options.velocity, this.velocity, _index, 0, 0 );

    this.RenewVector( _options.gravity, this.gravity, _index, 0, 0 );

    this.RenewVector( _options.acceleration, this.acceleration, _index, 1, 1 );

    this.RenewVector( _options.growth, this.growth, _index, 1, 1 );

    this.RenewVector( _options.scale, entity.scale, _index, 1, 1 );

    this.RenewVector( _options.scale, this.initialScale, _index, 1, 1 );

    if ( _options.rotation != null ) {

      entity.rotation = MinMaxOrValue( _options.rotation );
    
    } else {

      entity.rotation = 0;
    
    }

    if ( _options.lifespan != null ) {

      this.SetLifespan( _options.lifespan );
    
    } else {

      this.SetLifespan( 0 );
    
    }

    if ( _options.torque != null ) {

      this.torque = MinMaxOrValue( _options.torque );
    
    } else {

      this.torque = 0;
    
    }

    if ( _options.spin != null ) {

      this.spin = MinMaxOrValue( _options.spin );
    
    } else {

      this.spin = 0;
    
    }

    if ( _options.fade != null ) {

      this.fade = _options.fade;
    
    } else {

      this.fade = false;
    
    }

    if ( _options.deflate != null ) {

      this.deflate = _options.deflate;
    
    } else {

      this.deflate = false;
    
    }

    if ( _options.oscillation != null ) {

      const optOsc = _options.oscillation;
      let osc = this.oscillation;

      if ( osc === null ) {

        osc = this.oscillation = new Oscillation();
      
      }

      osc.active = true;

      if ( optOsc.offset != null ) {
        
        this.oscillationOffset = MinMaxOrValue( optOsc.offset );

      } else {

        this.oscillationOffset = 0;
      
      }

      if ( optOsc.torque != null ) {

        osc.SetOscillatingObject( 
          'torque', 
          MinMaxOrValue( optOsc.torque.from ),
          MinMaxOrValue( optOsc.torque.to ),
          MinMaxOrValue( optOsc.torque.amplitude )
        );
        
      } else {

        osc.Nullify( 'torque' );
      
      }

      if ( optOsc.spin != null ) {

        osc.SetOscillatingObject( 
          'spin', 
          MinMaxOrValue( optOsc.spin.from ),
          MinMaxOrValue( optOsc.spin.to ),
          MinMaxOrValue( optOsc.spin.amplitude )
        );
        
      } else {

        osc.Nullify( 'spin' );
      
      }

      if ( optOsc.velocity != null ) {

        if ( optOsc.velocity.x != null ) {

          osc.SetOscillatingObject( 
            'velocityX', 
            MinMaxOrValue( optOsc.velocity.x.from ),
            MinMaxOrValue( optOsc.velocity.x.to ),
            MinMaxOrValue( optOsc.velocity.x.amplitude )
          );

        }
        else {

          osc.Nullify( 'velocityX' );
        
        }

        if ( optOsc.velocity.y != null ) {

          osc.SetOscillatingObject( 
            'velocityY', 
            MinMaxOrValue( optOsc.velocity.y.from ),
            MinMaxOrValue( optOsc.velocity.y.to ),
            MinMaxOrValue( optOsc.velocity.y.amplitude )
          );

        }
        else {

          osc.Nullify( 'velocityY' );
        
        }
      
      }

      if ( optOsc.gravity != null ) {

        if ( optOsc.gravity.x != null ) {

          osc.SetOscillatingObject( 
            'gravityX', 
            MinMaxOrValue( optOsc.gravity.x.from ),
            MinMaxOrValue( optOsc.gravity.x.to ),
            MinMaxOrValue( optOsc.gravity.x.amplitude )
          );

        } else {

          osc.Nullify( 'gravityX' );
        
        }

        if ( optOsc.gravity.y != null ) {

          osc.SetOscillatingObject( 
            'gravityY', 
            MinMaxOrValue( optOsc.gravity.y.from ),
            MinMaxOrValue( optOsc.gravity.y.to ),
            MinMaxOrValue( optOsc.gravity.y.amplitude )
          );

        } else {

          osc.Nullify( 'gravityY' );
        
        }
      
      }

      if ( optOsc.acceleration != null ) {

        if ( optOsc.acceleration.x != null ) {

          osc.SetOscillatingObject( 
            'accelerationX', 
            MinMaxOrValue( optOsc.acceleration.x.from ),
            MinMaxOrValue( optOsc.acceleration.x.to ),
            MinMaxOrValue( optOsc.acceleration.x.amplitude )
          );

        } else {

          osc.Nullify( 'accelerationX' );
        
        }

        if ( optOsc.acceleration.y != null ) {

          osc.SetOscillatingObject( 
            'accelerationY', 
            MinMaxOrValue( optOsc.acceleration.y.from ),
            MinMaxOrValue( optOsc.acceleration.y.to ),
            MinMaxOrValue( optOsc.acceleration.y.amplitude )
          );

        } else {

          osc.Nullify( 'accelerationY' );
        
        }
      
      }

      if ( optOsc.growth != null ) {

        if ( optOsc.growth.x != null ) {

          osc.SetOscillatingObject( 
            'growthX', 
            MinMaxOrValue( optOsc.growth.x.from ),
            MinMaxOrValue( optOsc.growth.x.to ),
            MinMaxOrValue( optOsc.growth.x.amplitude )
          );

        } else {

          osc.Nullify( 'growthX' );
        
        }

        if ( optOsc.growth.y != null ) {

          osc.SetOscillatingObject( 
            'growthY', 
            MinMaxOrValue( optOsc.growth.y.from ),
            MinMaxOrValue( optOsc.growth.y.to ),
            MinMaxOrValue( optOsc.growth.y.amplitude )
          );

        } else {

          osc.Nullify( 'growthY' );
        
        }
      
      }

    } else if ( this.oscillation !== null ) {

      this.oscillation.active = false;
    
    }
  
  }

  /**
   * 
   * @param {object}    _object 
   * @param {Vector2D}  _vector 
   * @param {integer?}  _index 
   * @param {number?}   _rx 
   * @param {number?}   _ry 
   * 
   * @return {void}
   */
  RenewVector ( _object, _vector, _index, _rx, _ry ) {

    if ( _object != null ) {

      if ( _object.points != null ) {

        if ( _object.moduloWrapper != null ) {

          if ( _object.indexGap != null ) {

            _index += _object.indexGap;
          
          }

          _vector.SetV( _object.points[ _index % _object.moduloWrapper ] );

        } else {

          _vector.SetV( RandomInArray( _object.points ) );
        
        }
        
      } else if ( _object.xy != null ) {

        _vector.SetSame( MinMaxOrValue( _object.xy ) );

      } else {

        if ( _object.x != null ) {

          _vector.x = MinMaxOrValue( _object.x );
          
        } else {

          _vector.x = _rx;
        
        }
    
        if ( _object.y != null ) {
    
          _vector.y = MinMaxOrValue( _object.y );
          
        } else {

          _vector.y = _ry;
        
        }
      
      }

      if ( _object.scalar != null ) {

        if ( _object.scalar.xy != null ) {
          
          _vector.Multiply( 
            MinMaxOrValue( _object.scalar.xy ), 
            MinMaxOrValue( _object.scalar.xy )
          );

        } else {

          if ( _object.scalar.x != null ) {

            _vector.x *= MinMaxOrValue( _object.scalar.x );
          
          }

          if ( _object.scalar.y != null ) {

            _vector.y *= MinMaxOrValue( _object.scalar.y );

          }
        
        }
      
      }
    
    } else {

      _vector.Set( _rx, _ry );
    
    }
  
  }

  /**
   * 
   * @param {integer} _value 
   * 
   * @return {void}
   */
  SetLifespan ( _value ) {

    this.lifespan = 0;
    this.lifespanTotal = MinMaxOrValue( _value );
  
  }

  /**
   * 
   * @param {integer?} _unitId 
   * 
   * @return {void}
   */
  ResetEntity ( _unitId ) {

    const entity = this.entity;

    if ( _unitId != null ) {

      entity.SetTexture( entity.programController[ 'originalTexture' + _unitId ] );
    
    }

    entity.scale.SetSame( 1 );
    entity.alpha = 1;
    entity.display = true;
    entity.rotation = 0;
  
  }

  /**
   * 
   * @param {boolean?} _ifDead 
   * 
   * @return {boolean}
   */
  Destroy ( _ifDead ) {

    if ( _ifDead === true ) {

      if ( this.dead === false ) return false;
    
    }

    if ( this.system !== null ) {

      this.system.RemoveParticle( this );

    }

    if ( PS_USE_POOL ) {

      PS_pool.Store( this );
    
    }

    return true;
  
  }

}

// Private Static ----->
const PS_pool = new Pool();
let PS_USE_POOL = true;

PS_pool.Retrieve = function ( _options, _index ) {

  this.PreRetrieve();

  const p = this.objects.pop();

  p.Renew( _options, _index );

  return p;

};

PS_pool.Flood( () => {

  return new Particle();

}, 1000 );
// <----- Private Static
