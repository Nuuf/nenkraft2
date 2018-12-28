/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class Listener {

  constructor ( _holderContext, _listenerContext, _handle, _removeOnNextCall ) {

    this.context = _listenerContext;
    this.holderContext = _holderContext == null ? _listenerContext : _holderContext;
    this.handle = _handle;
    this.removeOnNextCall = _removeOnNextCall; 
  
  }

  Execute () {

    this.handle.apply( this.context, arguments );

    if ( this.removeOnNextCall === true ) {

      this.Remove();
      
    }
  
  }

  Remove () {

    this.holderContext.Remove( this.handle, this.context );
  
  }

}
