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

    let i = 0;
    let listener;
    const listeners = this.listeners;
    const l = listeners.length;

    if ( listeners.length === 0 ) return -1;

    for ( ; i < l; ++i ) {

      listener = listeners[ i ];

      if ( listener.context === _context && listener.handle === _handle ) {

        return i;
      
      }
    
    }

    return -1;
  
  }

  Add ( _handle, _context, _removeOnNextCall ) {

    const listener = new Listener( this, _context, _handle, _removeOnNextCall );
    this.listeners.push( listener );
  
  }

  Remove ( _handle, _context ) {

    const ix = this.GetListenerIndex( _handle, _context );

    if ( ix !== -1 ) {

      this.listeners.fickleSplice( ix );
    
    }
  
  }

  Dump ( _context ) {

    let i = 0;
    let listener;
    const listeners = this.listeners;
    const l = listeners.length;

    if ( listeners.length === 0 ) return;

    if ( _context !== undefined ) {

      for ( ; i < l; ++i ) {

        listener = listeners[ i ];

        if ( listener.context === _context ) {

          this.listeners.fickleSplice( i );
        
        }
      
      }
    
    }
    else {

      this.listeners.length = 0;
    
    }
  
  }

  Dispatch ( _target, _data ) {

    let i = 0;
    let listener;
    const listeners = this.listeners.slice();
    const l = listeners.length;

    if ( listeners.length === 0 ) return;

    this.stopPropagation = false;
    this.target = _target;
    this.data = _data;

    for ( ; i < l; ++i ) {

      listener = listeners[ i ];
      listener.Execute( this );
      if ( this.stopPropagation === true ) break;
    
    }

    this.target = null;
    this.data = null;
  
  }

}
