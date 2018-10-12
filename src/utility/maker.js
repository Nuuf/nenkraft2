/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Nested, CreateIteratorArgs, ReplaceArgumentWithObjectValue, IsArray } from '.';

export class Maker {

  constructor () {

    this.orders = [];
    this.classUsed = null;
    this.amount = 1;
    this.locked = false;
  
  }

  Many ( _amount ) {

    this.amount = _amount;

    return this;
  
  }

  Bind ( _object, _reset ) {

    if ( _reset ) this.orders.length = 0;
    this.orders.push( _object );

    return this;
  
  }

  Make ( _class ) {

    const l = this.amount;
    const ias = CreateIteratorArgs( arguments, '@', 'i' );

    if ( this.locked === true ) throw new Error( '"Make" called twice before end!' );

    this.locked = true;

    this.orders.length = 0;
    this.classUsed = _class;

    for ( var i = 0; i < l; ++i ) {

      PS_IteratorArgsLookup( arguments, ias, i );

      this.orders.push(
        new ( Function.prototype.bind.apply( _class, arguments ) )()
      );
      
    }

    return this;
  
  }

  Call ( _function, _args, _prop ) {

    let context;
    let f;
    let args;
    let ias;
    const orders = this.orders;
    const isArray = IsArray( _args );
    const isString = typeof _function === 'string';
    let order = orders[ 0 ];

    if ( isArray === true ) {

      ias = CreateIteratorArgs( _args, '@', 'i' );

    }

    for ( var i = 0; i < orders.length; order = orders[ ++i ] ) {

      if ( isArray === true ) {

        args = _args.slice();

        ReplaceArgumentWithObjectValue( order, args, '$' );

        PS_IteratorArgsLookup( args, ias, i );
      
      }

      if ( isString === false && _prop != null ) {

        if ( _prop[ 0 ] === '$' ) {

          _prop = _prop.slice( 1 );
          console.warn( 'No need for \'$\' on property arguments' );
        
        }

        Nested( order, _prop, false, true, _function.apply( null, args ) );

      } else if ( isString === false ) {

        _function.apply( null, args );

      } else {

        context = Nested( order, _function, true );
        f = Nested( order, _function );
  
        f.apply( context, args );
      
      }
    
    }

    return this;
  
  }

  Cast ( _key, _value ) {

    const orders = this.orders;
    const isString = typeof _value === 'string';

    for ( var i = 0 ; i < orders.length; ++i ) {

      if ( isString === true && _value[ 0 ] === '$' ) {

        _value = Nested( orders[ i ], _value );
      
      }
  
      Nested( orders[ i ], _key, false, true, _value );
    
    }

    return this;
  
  }

  Done () {

    this.amount = 1;
    this.locked = false;

    return this.orders[ 0 ];
  
  }

  Mass () {

    this.amount = 1;
    this.locked = false;

    return this.orders;
  
  }

  Ship ( _mass ) {

    this.amount = 1;
    this.locked = false;
    
    const returns = _mass === true ? this.orders.slice() : this.orders[ 0 ];

    this.orders.length = 0;

    return returns;

  }

}

// Private Static ----->
const PS_IteratorArgsLookup = function ( _args, _ias, _index ) {

  if ( _ias != null ) {

    for ( var i = 0, ia = _ias[ i ]; i < _ias.length; ia = _ias[ ++i ] ) {
  
      if ( ia.iteratorIndex !== -1 ) {
  
        if ( ia.mod && ia.val ) {
  
          switch ( ia.mod ) {
  
            case '+':
              _args[ ia.iteratorIndex ] = _index + parseInt( ia.val );
              break;
            case '*':
              _args[ ia.iteratorIndex ] = _index * parseInt( ia.val );
              break;
            case '-':
              _args[ ia.iteratorIndex ] = _index - parseInt( ia.val );
              break;
            case '/':
              _args[ ia.iteratorIndex ] = _index / parseInt( ia.val );
              break;
            case '%':
              _args[ ia.iteratorIndex ] = _index % parseInt( ia.val );
              break;
            default:
              throw new Error( 'Bad mod!' );
            
          }
            
        } else {
  
          _args[ ia.iteratorIndex ] = _index;
          
        }
  
      }
        
    }
  
  }

};
// <----- Private static
