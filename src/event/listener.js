/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class Listener {

  /**
   * 
   * @param {any}      _holderContext 
   * @param {any}      _listenerContext 
   * @param {Function} _handle 
   * @param {boolean?} _removeOnNextCall 
   */
  constructor ( _holderContext, _listenerContext, _handle, _removeOnNextCall ) {

    this.context = _listenerContext;
    this.holderContext = _holderContext == null ? _listenerContext : _holderContext;
    this.handle = _handle;
    this.removeOnNextCall = _removeOnNextCall; 
  
  }

  /**
   * 
   * @return {void}
   */
  Execute () {

    this.handle.apply( this.context, arguments );

    if ( this.removeOnNextCall === true ) {

      this.Remove();
      
    }
  
  }

  /**
   * 
   * @return {void}
   */
  Remove () {

    this.holderContext.Remove( this.handle, this.context );
  
  }

}
