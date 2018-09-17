/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Motion } from './motion';

export class Manager {

  constructor ( _target ) {

    this.motions = [];
    this.target = _target;
  
  }

  Create ( _id, _propertyString, _value, _duration, _easing ) {

    const motion = this.GetMotionById( _id );

    if ( motion == null ) {

      const motion = new Motion( _id, this.target, _propertyString, _value, _duration, _easing );

      this.motions.push( motion );

      return motion;
    
    }

    return null;
  
  }

  Add ( _motion ) {

    const motion = this.GetMotionById( _motion.id );

    if ( motion == null ) {

      this.motions.push( _motion );
    
    }
  
  }

  Start ( _id ) {

    const motion = this.GetMotionById( _id );

    if ( motion !== null ) {

      motion.Start();
    
    }

    return motion;
  
  }

  StartMultiple ( _ids ) {
    
    _ids = _ids.split( ' ' );

    let i = 0;
    const l = _ids.length;

    for ( ; i < l; ++i ) {

      this.Start( _ids[ i ] );
    
    }
  
  }

  Stop ( _id ) {

    const motion = this.GetMotionById( _id );

    if ( motion !== null ) {

      motion.Stop();
    
    }

    return motion;
  
  }

  StopMultiple ( _ids ) {
    
    _ids = _ids.split( ' ' );

    let i = 0;
    const l = _ids.length;

    for ( ; i < l; ++i ) {

      this.Stop( _ids[ i ] );
    
    }
  
  }

  Reset ( _id ) {

    const motion = this.GetMotionByid( _id );

    if ( motion !== null ) {

      motion.Reset();
    
    }

    return motion;
  
  }

  ResetMultiple ( _ids ) {

    _ids = _ids.split( ' ' );

    let i = 0;
    const l = _ids.length;

    for ( ; i < l; ++i ) {

      this.Reset( _ids[ i ] );
    
    }
  
  }

  Process () {

    let i = 0;
    const motions = this.motions;
    const l = motions.length;

    for ( ; i < l; ++i ) {

      motions[i].Process();
      
    }
  
  }

  GetMotionById ( _id ) {

    let i = 0;
    const motions = this.motions;
    const l = motions.length;

    for ( ; i < l; ++i ) {

      if ( motions[i].id === _id ) return motions[i];
      
    }
  
    return null;
  
  }

}