/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Listener } from './listener';

export class Event {

  constructor () {

    this.listeners = [];
    this.stopPropagation = false;
    this.target = null;
    this.data = null;
  
  }

  GetListenerIndex ( _handle, _context ) {

    let listener;
    const listeners = this.listeners;

    if ( listeners.length === 0 ) return -1;

    for ( var i = 0; i < listeners.length; ++i ) {

      listener = listeners[ i ];

      if ( listener.context === _context && listener.handle === _handle ) {

        return i;
      
      }
    
    }

    return -1;
  
  }

  Add ( _handle, _context, _removeOnNextCall ) {

    this.listeners.push( new Listener( this, _context, _handle, _removeOnNextCall ) );
  
  }

  Once ( _handle, _context ) {

    this.Add( _handle, _context, true );

  }

  Remove ( _handle, _context ) {

    const ix = this.GetListenerIndex( _handle, _context );

    if ( ix !== -1 ) {

      this.listeners.fickleSplice( ix );
    
    }
  
  }

  Dump ( _context ) {

    let listener;
    const listeners = this.listeners;

    if ( _context !== undefined ) {

      for ( var i = 0; i < listeners.length; ++i ) {

        listener = listeners[ i ];

        if ( listener.context === _context ) {

          listeners.splice( i );
        
        }
      
      }
    
    }
    else {

      listeners.length = 0;
    
    }
  
  }

  Dispatch ( _target, _data ) {

    const listeners = this.listeners.slice();

    if ( listeners.length === 0 ) return;

    this.stopPropagation = false;
    this.target = _target;
    this.data = _data;

    for ( var i = 0; i < listeners.length; ++i ) {

      listeners[ i ].Execute( this );
      if ( this.stopPropagation === true ) break;
    
    }

    this.target = null;
    this.data = null;
  
  }

}
