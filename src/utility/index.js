/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

'use strict';

import { PrecisionRound } from '../math';
import CharacterSets from './character-sets';

const VERSION = require( '../../package.json' ).version;
const Random = Math.random;

export function RandomInteger ( _min, _max ) {

  return ( Random() * ( _max - _min + 1 ) + _min ) | 0;

}

export function RandomFloat ( _min, _max ) {

  return Random() * ( _max - _min ) + _min;
  
}

export function IsInteger ( _value ) {

  return Number( _value ) === _value && _value % 1 === 0;

}

export function IsFloat ( _value ) {

  return Number( _value ) === _value && _value % 1 !== 0;

}

export function IsArray ( _value ) {

  return Object.prototype.toString.call( _value ) === '[object Array]';

}

export function ThisOrThat ( _this, _that ) {

  if ( Random() > 0.5 ) return _this;

  return _that;

}

export function Sign ( _value, _1If0 ) {

  if ( _value === 0 ) {

    if ( _1If0 === true ) {
  
      return 1;
        
    }
  
    return 0;
      
  }
  
  if ( _value > 0 ) return 1;

  return -1;

}

export function Clamp ( _value, _min, _max ) {

  if ( _value < _min ) return _min;
  else if ( _value > _max ) return _max;

  return _value;

}

export function InverseClamp ( _value, _min, _max ) {

  if ( _value < _min ) return _max;
  else if ( _value > _max ) return _min;

  return _value;

}

export function FlipACoin ( _x, _y ) {

  if ( RandomInteger( 1, 2 ) === 1 ) return _x;

  return _y;

}

export function GenerateSequence ( _from, _to, _interval, _precision ) {

  const sequence = [];

  for ( var i = 0 ; i < _to; i += _interval ) {

    sequence.push( PrecisionRound( i, _precision ) );
    
  }

  return sequence;

}

export function RandomInArray ( _array ) {

  return _array[ RandomInteger( 0, _array.length - 1 ) ];

}

export function MinMaxOrValue ( _options, _other ) {

  if ( _options.min != null && _options.max != null ) {
        
    return RandomFloat( _options.min, _options.max );
  
  } else if ( _options.values != null && _options.values.length > 0 ) {
  
    return RandomInArray( _options.values );
  
  } else if ( _other != null && _options[ _other ].length > 0 ) {
  
    return RandomInArray( _options[ _other ] );
  
  }
  
  return _options;

}

export function UUID ( _length, _parts, _charSetIndex, _separator ) {

  let at;
  let ilpdd;
  let id = '';
  const lpd = ( _length / _parts );
  const charset = CharacterSets[ _charSetIndex ];

  _length = _length == null ? 32 : _length;
  _parts = _parts == null ? 4 : _parts;
  _charSetIndex = _charSetIndex == null ? 0 : _charSetIndex;
  _separator = _separator == null ? '-' : _separator;

  for ( var i = 0; i < _length; ++i ) {

    ilpdd = i / lpd;

    if ( ilpdd !== 0 && IsInteger( ilpdd ) ) id += _separator;
    else {

      at = RandomInteger( 1, charset.length - 1 );
      id += charset.charAt( at );
      
    }
    
  }

  return id;

}

export function ApplyProperties ( _object, _props ) {

  if ( _props !== undefined ) {

    let key;
  
    for ( key in _props ) {
  
      if ( _object[ key ] !== undefined ) _object[ key ] = _props[ key ];
        
    }
      
  }

}

export function Nested ( _object, _string, _getObjectHolding, _set, _value, _splitter ) {

  if ( typeof _string === 'string' ) {

    _splitter = _splitter == null ? '.' : _splitter;
    _string = _string.split( _splitter );
      
  }
  
  let key;
  
  if ( _string.length > 1 ) {
  
    key = _string.shift();
  
    if ( _object[ key ] !== undefined ) {
  
      return Nested( _object[ key ], _string, _getObjectHolding, _set, _value, _splitter );
        
    }
      
  } else {
  
    key = _string.shift();
  
    if ( _object[ key ] !== undefined ) {
  
      if ( _set === true ) {
  
        _object[ key ] = _value;

        return;
          
      }
  
      if ( _getObjectHolding === true ) {
  
        return _object;
          
      }
  
      return _object[ key ];
        
    }
  
    if ( _set === true ) {
  
      _object[ key ] = _value;

      return;
        
    }
      
  }

}

export function ArrayGetRandom ( _array, _amount ) {

  const array = [];
  const control = {};
  const al = _array.length;

  for ( var i = 0; i < _amount; ++i ) {

    let ix = ( Random() * al ) | 0;

    if ( control[ ix ] === undefined ) {

      control[ ix ] = null;
      array.push( _array[ ix ] );
      
    }
    else i--;
    
  }

  return array;

}

export function ArrayShuffle ( _array ) {

  let temp;
  let random;

  for ( var i = _array.length - 1; i-- >= 0; ) {

    random = ( Random() * i ) | 0;
    temp = _array[ i ];
    _array[ i ] = _array[ random ];
    _array[ random ] = temp;
    
  }

}

export function Base16ToBase10 ( _value ) {

  return parseInt( _value, 16 );

}

export function Base2ToBase10 ( _value ) {

  return parseInt( _value, 2 );

}

export function IsObjectEmpty ( _object ) {

  let key;

  for ( key in _object ) {

    if ( _object.hasOwnProperty( key ) ) {
  
      return false;
        
    }
      
  }
  
  return JSON.stringify( _object ) === JSON.stringify( {} );

}

export function DeepClone ( _object ) {

  let r = null;
  let ia = false;

  if ( typeof _object === 'function' ) {

    throw new TypeError( 'Object was of type: function. Not acceptable.' );

  }

  if ( IsArray( _object ) ) {

    r = [];
    ia = true;

  } else if ( typeof _object === 'object' ) {

    r = {};

  } else {

    return _object;

  }

  if ( ia ) {

    for ( var i = 0; i < _object.length; ++i ) {

      r[ i ] = DeepClone( _object[ i ] );

    }

  } else {

    let key;

    for ( key in _object ) {

      if ( _object.hasOwnProperty( key ) ) {

        r[ key ] = DeepClone( _object[ key ] );

      }

    }

  }

  return r;

}

export function CreateIteratorArgs ( _args, _pre, _post ) {

  let arg;
  let mod;
  let val;
  let pipe;
  const ias = [];

  for ( var i = 0; i < _args.length; ++i ) {

    arg = _args[ i ];

    if ( typeof arg === 'string' ) {

      if ( arg.indexOf( _pre ) === 0 && arg.indexOf( _post ) === _pre.length ) {

        pipe = arg.indexOf( '|' );

        if ( pipe !== -1 ) {

          mod = arg.slice( arg.indexOf( '(' ) + 1, pipe );
          val = arg.slice( pipe + 1, arg.indexOf( ')' ) );
          ias.push(
            {
              mod: mod,
              val: val,
              iteratorIndex: i
            }
          );
          
        } else {

          ias.push( {
            iteratorIndex: i
          } );

        }

      }
      
    }

  }

  return ias;

}

export function ReplaceArgumentWithObjectValue ( _object, _args, _pre ) {

  let arg;

  for ( var i = 0; i < _args.length; ++i ) {

    arg = _args[ i ];

    if ( typeof arg === 'string' ) {

      if ( arg.indexOf( _pre ) === 0 ) {

        _args[ i ] = Nested( _object, arg.slice( _pre.length ) );

      }

    }

  }

}

export function PRINT_VERSION ( _server ) {

  if ( !_server ) {

    console.log(
      '%cnenkraft2 %cversion %c' + VERSION,
      'color:#f0f7da;background-color:#234d20;font-family:Arial;font-size:18px;font-weight:900;padding:5px;',
      'color:#f0f7da;background-color:#36802d;font-family:Arial;font-size:18px;font-weight:900;padding:5px;',
      'color:#f0f7da;background-color:#77ab59;font-family:Arial;font-size:18px;font-weight:900;padding:5px;'
    );
  
  } else {

    console.log( 'nenkraft2 server version ' + VERSION );
  
  }

}
