/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Container2D } from '../../entity/container2d';
import { Timer } from '../../time/timer';
import { Particle2D } from './particle2d';

export class System extends Container2D {

  constructor ( _x, _y ) {

    super( _x, _y );
    this.particles = [];
    this.deletionTimer = new Timer( 60 );
    this.deletionTimer.onFinish.Add( this.HandleParticleDeletion, this );
    this.deletionTimer.Start();
  
  }

  Process () {

    this.HandleParticles();
    this.deletionTimer.Process();
  
  }

  HandleParticles () {

    let i = 0;
    const particles = this.particles;
    const l = particles.length;

    for ( ; i < l; ++i ) {

      particles[ i ].Process();
    
    }
  
  }

  HandleParticleDeletion () {

    let i = 0;
    const particles = this.particles;
    const l = particles.length;
    let particle = particles[i];

    for ( ; i < l; particle = particles[++i] ) {

      if ( particle ) {

        if ( particle.Destroy( true ) ) {

          i--;
        
        }
      
      }
    
    }

    this.deletionTimer.Start();
  
  }

  AddParticle ( _particle2d ) {

    _particle2d.system = this;
    this.AddChild( _particle2d.entity );
    this.particles.push( _particle2d );

    return _particle2d;
  
  }

  RemoveParticle ( _particle2d ) {

    const particles = this.particles;
    const ix = particles.indexOf( _particle2d );

    if ( ix !== -1 ) {
      
      _particle2d.system = null;
      this.RemoveChild( _particle2d.entity );

      return particles.fickleSplice( ix );

    }
  
  }

  Emit ( _options ) {

    for ( var i = 0; i < _options.amount; ++i ) {

      if ( Particle2D.USE_POOL === true ) {

        this.AddParticle( Particle2D.Pool.Retrieve( _options, i ) );
      
      } else {

        this.AddParticle( new Particle2D( _options, i ) );

      }

    }
  
  }

}