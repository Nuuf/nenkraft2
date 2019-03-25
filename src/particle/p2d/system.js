/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { VisualContainer2D } from '../../entity/visual-container2d';
import { Timer } from '../../time/timer';
import { Particle } from './particle';

export class System extends VisualContainer2D {

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   */
  constructor ( _x, _y ) {

    super( _x, _y );
    
    this.particles = [];
    this.deletionTimer = new Timer( 60 );
    this.deletionTimer.onFinish.Add( this.HandleParticleDeletion, this );
    this.deletionTimer.Start();
  
  }

  /**
   * 
   * @return {void}
   */
  Process () {

    this.HandleParticles();
    this.deletionTimer.Process();
  
  }

  /**
   * 
   * @return {void}
   */
  HandleParticles () {

    const particles = this.particles;

    for ( var i = 0; i < particles.length; ++i ) {

      particles[ i ].Process();
    
    }
  
  }

  /**
   * 
   * @return {void}
   */
  HandleParticleDeletion () {

    const particles = this.particles;
    let particle = particles[ 0 ];

    for ( var i = 0; i < particles.length; particle = particles[ ++i ] ) {

      if ( particle ) {

        if ( particle.Destroy( true ) ) {

          i--;
        
        }
      
      }
  
    }

    this.deletionTimer.Start();
  
  }

  /**
   * 
   * @param {Particle} _particle 
   * 
   * @return {Particle}
   */
  AddParticle ( _particle ) {

    _particle.system = this;
    this.AddChild( _particle.entity );
    this.particles.push( _particle );

    return _particle;
  
  }

  /**
   * 
   * @param {Particle} _particle 
   * 
   * @return {Particle}
   */
  RemoveParticle ( _particle ) {

    const particles = this.particles;
    const ix = particles.indexOf( _particle );

    if ( ix !== -1 ) {
      
      _particle.system = null;
      this.RemoveChild( _particle.entity );

      return particles.fickleSplice( ix );

    }
  
  }

  /**
   * 
   * @param {object} _options 
   * 
   * @return {void}
   */
  Emit ( _options ) {

    for ( var i = 0; i < _options.amount; ++i ) {

      if ( Particle.USE_POOL === true ) {

        this.AddParticle( Particle.pool.Retrieve( _options, i ) );
      
      } else {

        this.AddParticle( new Particle( _options, i ) );

      }

    }
  
  }

}
