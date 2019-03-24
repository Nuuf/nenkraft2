/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class Pool {

  /**
   * 
   */
  constructor () {

    this.objects = [];
    this.floodFunction = null;
    this.floodAmount = null;
    this.context = null;

  }

  /**
   * 
   * @param {object} _object 
   * 
   * @return {void}
   */
  Store ( _object ) {

    this.objects.push( _object );
  
  }

  /**
   * 
   * @return {void}
   */
  PreRetrieve () {

    if ( this.objects.length === 0 ) {

      this.Flood();
    
    }
  
  }

  /**
   * 
   * @return {object}
   */
  Retrieve () {

    this.PreRetrieve();

    return this.objects.pop();
  
  }

  /**
   * 
   * @param {Function?} _function 
   * @param {integer?}  _amount 
   * @param {any?}      _context 
   * 
   * @return {void}
   */
  Flood ( _function, _amount, _context ) {

    if ( _function ) this.floodFunction = _function;
    if ( _amount ) this.floodAmount = _amount;
    if ( _context ) this.context = _context;

    for ( var i = 0; i < this.floodAmount; ++i ) {

      this.Store( this.floodFunction.call( this.context ) );

    }
  
  } 

  /**
   * 
   * @return {void}
   */
  Flush () {

    this.objects.length = 0;
  
  }

  /**
   * 
   * @return {void}
   */
  Clean () {

    const amount = this.objects.length;

    this.Flush();
    this.Flood( undefined, amount );
  
  }

}
