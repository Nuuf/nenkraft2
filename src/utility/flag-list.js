/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class FlagList {

  /**
   * 
   */
  constructor () {

    this.value = 0;
  
  }

  /**
   * 
   * @param {integer} _value 
   * 
   * @return {this}
   */
  Add ( _value ) {

    this.value |= _value;

    return this;
  
  }

  /**
   * 
   * @param {integer} _value 
   * 
   * @return {this}
   */
  Remove ( _value ) {

    this.value = ( this.value & ~_value );

    return this;
  
  }

  /**
   * 
   * @param {integer} _value 
   * 
   * @return {boolean}
   */
  Holds ( _value ) {

    return ( ( this.value & _value ) === _value );
  
  }

  /**
   * 
   * @param {integer} _value 
   * 
   * @return {this}
   */
  Toggle ( _value ) {

    this.value ^= _value;

    return this;
  
  }

}
