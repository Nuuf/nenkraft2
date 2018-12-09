import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'Utilities', ( conf ) => {

    class Something {

      constructor ( _arg1, _arg2 ) {

        this.mem1 = _arg1;
        this.mem2 = _arg2;
        this.mem3 = null;
        this.mem4 = null;
        this.deep = {
          deeper: {
            deepest: 0
          }
        };

      }
      Some ( _arg1 ) {

        this.mem3 = _arg1;
        this.mem4 = this.mem1 + this.mem2;
      
      }
    
    }

    // Maker

    /*
     * Using the Maker continuously can slow things down quite a bit.
     * It is more for convenience and fun... Initialising etc.
     * 
     */

    const factory = new nk2.Maker();

    console.log(
      factory
        .Many( 15 )
        .Make( Something, '@i(*|2)', '@i(%|3)' )
        .Call( Math.random, null, 'deep.deeper.deepest' )
        .Call( 'Some', [ '@i' ] )
        .Call( console.log, [ '$deep.deeper.deepest' ] )
        .Ship( true )
    );

    console.log( factory );

    // Glob

    nk2.Glob.Create( 'myGlob' );

    const myGlob = window.myGlob;

    myGlob.Define( nk2.Glob.CONSTANT, 'myConstant', 'someValue' );
    myGlob.Define( nk2.Glob.FUNCTION, 'myFunction', () => {} );
    myGlob.Define( nk2.Glob.VALUE, 'myValue', 'someValue' );

    try {

      myGlob.Mark( nk2.Glob.CONSTANT, 'myConstant' );
    
    } catch ( error ) {

      console.error( error );
    
    }

    myGlob.Mark( nk2.Glob.OBJECT, 'myObject' );

    try {

      myGlob.Set( nk2.Glob.OBJECT, 'myObject', 0 );
    
    } catch ( error ) {

      console.error( error );
    
    }

    myGlob.Set( nk2.Glob.OBJECT, 'myObject', {} );

    console.log( myGlob );

    window.myGlob = undefined;

    // Assert 

    nk2.Assert.LOG = true;
    nk2.Assert( 0, nk2.Assert.IS_SAME_TYPE, 1 );
    nk2.Assert( 'myString', nk2.Assert.IS, 'myString' );
    nk2.Assert( 10, nk2.Assert.IS_GREATER_THAN, 9 );

    try {

      nk2.Assert( 10, nk2.Assert.IS_LESS_THAN, 9 );
    
    } catch ( error ) {

      console.error( error );

    }

    try {
     
      nk2.Assert( [], nk2.Assert.IS_SAME_TYPE, Object );
    
    } catch ( error ) {

      console.error( error );

    }

    nk2.Assert( [], nk2.Assert.IS_INSTANCE_OF, Object );

    // CP

    const parser = new nk2.CP.Registry();

    nk2.CP.Command.OPTION_PREFIX = '--';

    parser
      .AddCommand( 
        new nk2.CP.Command(
          'myCommand mycmd',
          ( dataStrs, data, staticData ) => {

            console.log( dataStrs, data, staticData, 'prime' );
      
          },
          'some info about this command',
          true,
          true
        )
          .AddOption( 
            'anOption anopt',
            ( dataStrs, data, staticData ) => {

              console.log( dataStrs, data, staticData, 'priorty 0' );

            },
            'some info about this option',
            0,
            false
          )
          .AddOption(
            'op2',
            () => {

              console.log( 'op2 called.', 'priorty 99' );

            },
            'brrrr',
            99,
            false
          )
      );

    console.log( parser );

    parser.Parse( 'myCommand --anopt someData=myData someString --op2 (JSON)myJsonData={"someJsonData":"value"}', { someStatic: 'data' } );

    if ( parser.Parse( 'what?' ) != null ) {

      console.error( 'Unknown command' );
    
    }

    const unrecognized = parser.Parse( 'hmmm...' );

    if ( unrecognized ) {

      console.error( unrecognized, '- is not a recognized command' );
    
    }

    // Event

    const event = new nk2.Event.Dispatcher();

    event.Once( ( event ) => {

      console.log( event.target, event.data );
    
    } );

    event.Dispatch( 'istarget', { myEventData: 'something' } );

  } );

};
