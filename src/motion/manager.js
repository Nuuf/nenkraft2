/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Motion } from './motion';

export class Manager {

  /**
   * 
   * @param {object} _target 
   */
  constructor ( _target ) {

    this.motions = [];
    this.target = _target;
  
  }

  /**
   * 
   * @param {string}  _id 
   * @param {string}  _propertyString 
   * @param {number}  _value 
   * @param {number}  _duration 
   * @param {string?} _easing 
   * 
   * @return {Motion|null}
   */
  Create ( _id, _propertyString, _value, _duration, _easing ) {

    const motion = this.GetMotionById( _id );

    if ( motion == null ) {

      const motion = new Motion( _id, this.target, _propertyString, _value, _duration, _easing );

      this.motions.push( motion );

      return motion;
    
    }

    return null;
  
  }

  /**
   * 
   * @param {Motion} _motion 
   * 
   * @return {void}
   */
  Add ( _motion ) {

    const motion = this.GetMotionById( _motion.id );

    if ( motion == null ) {

      this.motions.push( _motion );
    
    }
  
  }

  /**
   * 
   * @param {string} _id 
   * 
   * @return {Motion|null}
   */
  Start ( _id ) {

    const motion = this.GetMotionById( _id );

    if ( motion !== null ) {

      motion.Start();
    
    }

    return motion;
  
  }

  /**
   * 
   * @param {string} _ids 
   * 
   * @return {void}
   */
  StartMultiple ( _ids ) {
    
    _ids = _ids.split( ' ' );

    for ( var i = 0; i < _ids.length; ++i ) {

      this.Start( _ids[ i ] );
    
    }
  
  }

  /**
   * 
   * @param {string} _id 
   * 
   * @return {Motion|null}
   */
  Stop ( _id ) {

    const motion = this.GetMotionById( _id );

    if ( motion !== null ) {

      motion.Stop();
    
    }

    return motion;
  
  }

  /**
   * 
   * @param {string} _ids
   * 
   * @return {void} 
   */
  StopMultiple ( _ids ) {
    
    _ids = _ids.split( ' ' );

    for ( var i = 0; i < _ids.length; ++i ) {

      this.Stop( _ids[ i ] );
    
    }
  
  }

  /**
   * 
   * @param {string} _id 
   * 
   * @return {Motion|null}
   */
  Reset ( _id ) {

    const motion = this.GetMotionByid( _id );

    if ( motion !== null ) {

      motion.Reset();
    
    }

    return motion;
  
  }

  /**
   * 
   * @param {string} _ids
   * 
   * @return {void} 
   */
  ResetMultiple ( _ids ) {

    _ids = _ids.split( ' ' );

    for ( var i = 0; i < _ids.length; ++i ) {

      this.Reset( _ids[ i ] );
    
    }
  
  }

  /**
   * 
   * @return {void}
   */
  Process () {

    const motions = this.motions;

    for ( var i = 0; i < motions.length; ++i ) {

      motions[ i ].Process();
      
    }
  
  }

  /**
   * 
   * @param {string} _id
   * 
   * @return {Motion|null} 
   */
  GetMotionById ( _id ) {

    const motions = this.motions;

    for ( var i = 0; i < motions.length; ++i ) {

      if ( motions[ i ].id === _id ) return motions[ i ];
      
    }
  
    return null;
  
  }

}
