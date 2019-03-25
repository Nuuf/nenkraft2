/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class OscillatingObject {

  /**
   * 
   * @param {number} _from 
   * @param {number} _to 
   * @param {number} _amplitude 
   */
  constructor ( _from, _to, _amplitude ) {

    this.Set( _from, _to, _amplitude );
  
  }

  /**
   * 
   * @param {number} _from 
   * @param {number} _to 
   * @param {number} _amplitude 
   * 
   * @return {void}
   */
  Set ( _from, _to, _amplitude ) {

    this.from = _from;
    this.to = _to;
    this.amplitude = _amplitude;
    this.active = true;
  
  }

  /**
   * 
   * @return {void}
   */
  Inactivate () {

    this.active = false;
  
  }

}

export class Oscillation {

  /**
   * 
   */
  constructor () {

    this.velocityX = null;
    this.velocityY = null;
    this.torque = null;
    this.accelerationX = null;
    this.accelerationY = null;
    this.spin = null;
    this.growthX = null;
    this.growthY = null;
    this.gravityX = null;
    this.gravityY = null;
    this.active = true;

  }

  /**
   * 
   * @param {string} _key 
   * @param {number} _from 
   * @param {number} _to 
   * @param {number} _amplitude 
   * 
   * @return {void}
   */
  CreateOscillatingObject ( _key, _from, _to, _amplitude ) {

    if ( this[ _key ] !== null ) throw new Error( 'Invalid key' );

    this[ _key ] = new OscillatingObject( _from, _to, _amplitude );
  
  }

  /**
   * 
   * @param {string} _key 
   * @param {number} _from 
   * @param {number} _to 
   * @param {number} _amplitude 
   * 
   * @return {void}
   */
  SetOscillatingObject ( _key, _from, _to, _amplitude ) {

    const obj = this[ _key ];

    if ( obj == null ) {

      return this.CreateOscillatingObject( _key, _from, _to, _amplitude );
    
    }

    obj.Set( _from, _to, _amplitude );
  
  }

  /**
   * 
   * @param {string} _key 
   * 
   * @return {void}
   */
  Nullify ( _key ) {

    if ( this[ _key ] != null ) {

      this[ _key ].Inactivate();
    
    }
  
  }

}
