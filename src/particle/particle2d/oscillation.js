/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class Oscillation {

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

  CreateOscillatingObject ( _key, _from, _to, _amplitude ) {

    if ( this[ _key ] !== null ) throw new Error( 'Invalid key' );

    this[ _key ] = {
      from: _from,
      to: _to,
      amplitude: _amplitude,
      active: true
    };
  
  }

  SetOscillatingObject ( _key, _from, _to, _amplitude ) {

    const obj = this[ _key ];

    if ( obj == null ) {

      return this.CreateOscillatingObject( _key, _from, _to, _amplitude );
    
    }

    obj.from = _from;
    obj.to = _to;
    obj.amplitude = _amplitude;
    obj.active = true;
  
  }

  Nullify ( _key ) {

    if ( this[ _key ] != null ) {

      this[ _key ].active = false;
    
    }
  
  }

}
