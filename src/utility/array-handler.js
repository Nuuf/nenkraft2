/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class ArrayHandler {

  constructor ( _object ) {

    this.object = _object;

  }

  static Get ( _id ) {

    return PS_ARRAYS[ _id ];
  
  }

  static GetAll () {

    return PS_ARRAYS;
  
  }

  static Add ( _id, _array ) {

    PS_ARRAYS[ _id ] = _array;

    return ArrayHandler;
  
  }

  In ( _id ) {

    const index = PS_ARRAYS[ _id ].indexOf( this.object );

    if ( index === -1 ) {

      PS_ARRAYS[ _id ].push( this.object );
    
    }

    return this;
  
  }

  InAll () {

    let index = 0;

    for ( var key in PS_ARRAYS ) {

      index = PS_ARRAYS[ key ].indexOf( this.object );
      
      if ( index === -1 ) {

        PS_ARRAYS[ key ].push( index );

      }
    
    }

    return this;
  
  }

  Out ( _id ) {

    const index = PS_ARRAYS[ _id ].indexOf( this.object );

    if ( index !== -1 ) {

      PS_ARRAYS[ _id ].fickleSplice( index );
    
    }

    return this;
  
  }

  OutAll () {

    let index = 0;

    for ( var key in PS_ARRAYS ) {

      index = PS_ARRAYS[ key ].indexOf( this.object );
      
      if ( index !== -1 ) {

        PS_ARRAYS[ key ].fickleSplice( index );

      }
    
    }

    return this;

  }

}

// Private Static ----->
const PS_ARRAYS = {};
// <----- Private Static
