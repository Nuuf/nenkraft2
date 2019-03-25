/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class FlagEnum {

  /**
   * 
   */
  constructor () {

    this.NONE = 0;
    this.next = 1;
  
  }

  /**
   * 
   * @param {string} _id
   * 
   * @return {this} 
   */
  Add ( _id ) {

    _id = _id.toUpperCase();

    if ( this[ _id ] === undefined ) {
    
      this[ _id ] = this.next;
      this.next = this.next << 1;
        
    }

    return this;
  
  }

}
