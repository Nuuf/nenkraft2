/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class Key {

  /**
   * 
   * @param {integer} _code 
   */
  constructor ( _code ) {

    this.code = _code;
    this.duration = 0;
    this.isDown = false;
    this.repetitions = 0;
    this.repetitionsTimer = 0;
    this.repetitionsSpeed = 20;
  
  }

  /**
   * 
   * @return {number}
   */
  static get ARROW_LEFT () {

    return 37;
  
  }

  /**
   * 
   * @return {number}
   */
  static get ARROW_UP () {

    return 38;
  
  }

  /**
   * 
   * @return {number}
   */
  static get ARROW_RIGHT () {

    return 39;
  
  }

  /**
   * 
   * @return {number}
   */
  static get ARROW_DOWN () {

    return 40;
  
  }

  /**
   * 
   * @return {number}
   */
  static get SHIFT () {

    return 16;
  
  }

  /**
   * 
   * @return {number}
   */
  static get SPACEBAR () {

    return 32;
  
  }

  /**
   * 
   * @return {number}
   */
  static get BACKSPACE () {

    return 8;
  
  }

  /**
   * 
   * @return {number}
   */
  static get ESCAPE () {

    return 27;
  
  }

  /**
   * 
   * @return {number}
   */
  static get ENTER () {

    return 13;
  
  }

  /**
   * 
   * @return {number}
   */
  static get TAB () {

    return 9;
  
  }

  /**
   * 
   * @return {number}
   */
  static get ALT () {

    return 18;
  
  }

  /**
   * 
   * @return {number}
   */
  static get CONTROL () {

    return 17;
  
  }

  /**
   * 
   * @return {number}
   */
  static get FUNCTION1 () {

    return 112;
  
  }

  /**
   * 
   * @return {number}
   */
  static get FUNCTION1 () {

    return 112;
  
  }

  /**
   * 
   * @return {number}
   */
  static get FUNCTION2 () {

    return 113;
  
  }

  /**
   * 
   * @return {number}
   */
  static get FUNCTION3 () {

    return 114;
  
  }

  /**
   * 
   * @return {number}
   */
  static get FUNCTION4 () {

    return 115;
  
  }

  /**
   * 
   * @return {number}
   */
  static get FUNCTION5 () {

    return 116;
  
  }

  /**
   * 
   * @return {number}
   */
  static get FUNCTION6 () {

    return 117;
  
  }

  /**
   * 
   * @return {number}
   */
  static get FUNCTION7 () {

    return 118;
  
  }

  /**
   * 
   * @return {number}
   */
  static get FUNCTION8 () {

    return 119;
  
  }

  /**
   * 
   * @return {number}
   */
  static get FUNCTION9 () {

    return 120;
  
  }

  /**
   * 
   * @return {number}
   */
  static get FUNCTION10 () {

    return 121;
  
  }

  /**
   * 
   * @return {number}
   */
  static get FUNCTION11 () {

    return 122;
  
  }

  /**
   * 
   * @return {number}
   */
  static get FUNCTION12 () {

    return 123;
  
  }

  /**
   * 
   * @return {number}
   */
  static get A () {

    return 65;
  
  }

  /**
   * 
   * @return {number}
   */
  static get B () {

    return 66;
  
  }

  /**
   * 
   * @return {number}
   */
  static get C () {

    return 67;
  
  }

  /**
   * 
   * @return {number}
   */
  static get D () {

    return 68;
  
  }

  /**
   * 
   * @return {number}
   */
  static get E () {

    return 69;
  
  }

  /**
   * 
   * @return {number}
   */
  static get F () {

    return 70;
  
  }

  /**
   * 
   * @return {number}
   */
  static get G () {

    return 71;
  
  }

  /**
   * 
   * @return {number}
   */
  static get H () {

    return 72;
  
  }

  /**
   * 
   * @return {number}
   */
  static get I () {

    return 73;
  
  }

  /**
   * 
   * @return {number}
   */
  static get J () {

    return 74;
  
  }

  /**
   * 
   * @return {number}
   */
  static get K () {

    return 75;
  
  }

  /**
   * 
   * @return {number}
   */
  static get L () {

    return 76;
  
  }

  /**
   * 
   * @return {number}
   */
  static get M () {

    return 77;
  
  }

  /**
   * 
   * @return {number}
   */
  static get N () {

    return 78;
  
  }

  /**
   * 
   * @return {number}
   */
  static get O () {

    return 79;
  
  }

  /**
   * 
   * @return {number}
   */
  static get P () {

    return 80;
  
  }

  /**
   * 
   * @return {number}
   */
  static get Q () {

    return 81;
  
  }

  /**
   * 
   * @return {number}
   */
  static get R () {

    return 82;
  
  }

  /**
   * 
   * @return {number}
   */
  static get S () {

    return 83;
  
  }

  /**
   * 
   * @return {number}
   */
  static get T () {

    return 84;
  
  }

  /**
   * 
   * @return {number}
   */
  static get U () {

    return 85;
  
  }

  /**
   * 
   * @return {number}
   */
  static get V () {

    return 86;
  
  }

  /**
   * 
   * @return {number}
   */
  static get W () {

    return 87;
  
  }

  /**
   * 
   * @return {number}
   */
  static get X () {

    return 88;
  
  }

  /**
   * 
   * @return {number}
   */
  static get Y () {

    return 89;
  
  }

  /**
   * 
   * @return {number}
   */
  static get Z () {

    return 90;
  
  }

  /**
   * 
   * @return {number}
   */
  static get NUM0 () {

    return 48;
  
  }

  /**
   * 
   * @return {number}
   */
  static get NUM1 () {

    return 49;
  
  }

  /**
   * 
   * @return {number}
   */
  static get NUM2 () {

    return 50;
  
  }

  /**
   * 
   * @return {number}
   */
  static get NUM3 () {

    return 51;
  
  }

  /**
   * 
   * @return {number}
   */
  static get NUM4 () {

    return 52;
  
  }

  /**
   * 
   * @return {number}
   */
  static get NUM5 () {

    return 53;
  
  }

  /**
   * 
   * @return {number}
   */
  static get NUM6 () {

    return 54;
  
  }

  /**
   * 
   * @return {number}
   */
  static get NUM7 () {

    return 55;
  
  }

  /**
   * 
   * @return {number}
   */
  static get NUM8 () {

    return 56;
  
  }

  /**
   * 
   * @return {number}
   */
  static get NUM9 () {

    return 57;
  
  }

  /**
   * 
   * @return {void}
   */
  Reset () {

    this.duration = 0;
    this.repetitions = 0;
    this.repetitionsTimer = 0;
  
  }

}
