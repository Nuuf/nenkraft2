/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class FlagList {

  constructor () {

    this.value = 0;
  
  }

  Add ( _value ) {

    this.value |= _value;

    return this;
  
  }

  Remove ( _value ) {

    this.value = ( this.value & ~_value );

    return this;
  
  }

  Holds ( _value ) {

    return ( ( this.value & _value ) === _value );
  
  }

  Toggle ( _value ) {

    this.value ^= _value;

    return this;
  
  }

}
