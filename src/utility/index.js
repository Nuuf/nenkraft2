/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

'use strict';

import { PrecisionRound } from '../math';
import CharacterSets from './character-sets';

const VERSION = require( '../../package.json' ).version;
const Random = Math.random;
const Clz32 = Math.clz32;

/**
 * 
 * @param {number} _min 
 * @param {number} _max
 * 
 * @return {integer}; 
 */
export function RandomInteger ( _min, _max ) {

  return ( Random() * ( _max - _min + 1 ) + _min ) | 0;

}

/**
 * 
 * @param {number} _min 
 * @param {number} _max 
 * @param {number} _amin 
 * @param {number} _amax 
 * 
 * @return {integer}
 */
export function RandomIntegerAvoid ( _min, _max, _amin, _amax ) {

  let value = RandomInteger( _min, _max );

  if ( _min > _amin || _max < _amax ) throw new Error( 'Avoid causing infinite loops!' );

  while ( value > _amin && value < _amax ) {

    value = RandomInteger( _min, _max );
  
  }

  return value;

}

/**
 * 
 * @param {number} _min 
 * @param {number} _max
 * 
 * @return {number} 
 */
export function RandomFloat ( _min, _max ) {

  return Random() * ( _max - _min ) + _min;
  
}

/**
 * 
 * @param {number} _min 
 * @param {number} _max 
 * @param {number} _amin 
 * @param {number} _amax
 * 
 * @return {number} 
 */
export function RandomFloatAvoid ( _min, _max, _amin, _amax ) {

  let value = RandomFloat( _min, _max );

  if ( _min > _amin || _max < _amax ) throw new Error( 'Avoid causing infinite loops!' );

  while ( value > _amin && value < _amax ) {

    value = RandomFloat( _min, _max );
  
  }

  return value;

}

/**
 * 
 * @param {any} _value
 * 
 * @return {boolean} 
 */
export function IsInteger ( _value ) {

  return Number( _value ) === _value && _value % 1 === 0;

}

/**
 * 
 * @param {any} _value
 * 
 * @return {boolean} 
 */
export function IsFloat ( _value ) {

  return Number( _value ) === _value && _value % 1 !== 0;

}

/**
 * 
 * @param {any} _value
 * 
 * @return {boolean} 
 */
export function IsArray ( _value ) {

  return Object.prototype.toString.call( _value ) === '[object Array]';

}

/**
 * 
 * @param {any} _value
 * 
 * @return {boolean} 
 */
export function IsObject ( _value ) {

  return Object.prototype.toString.call( _value ) === '[object Object]';

}

/**
 * 
 * @param {any} _value
 * 
 * @return {boolean} 
 */
export function IsFunction ( _value ) {

  return Object.prototype.toString.call( _value ) === '[object Function]';

}

/**
 * 
 * @param {number}   _value 
 * @param {boolean?} _1If0 
 * 
 * @return {number}
 */
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

/**
 * 
 * @param {integer} _bit 
 * @param {number}  _n
 * 
 * @return {boolean} 
 */
export function IsBitSet ( _bit, _n ) {

  return ( ( _n & ( 1 << _bit ) ) !== 0 );

}

/**
 * 
 * @param {integer} _bit 
 * @param {number}  _n
 * 
 * @return {number} 
 */
export function SetBit ( _bit, _n ) {

  return ( _n | ( 1 << _bit ) );

}

/**
 * 
 * @param {integer} _bit 
 * @param {number}  _n
 * 
 * @return {number} 
 */
export function ClearBit ( _bit, _n ) {

  return ( _n & ~( 1 << _bit ) );

}

/**
 * 
 * @param {integer} _bit 
 * @param {number}  _n
 * 
 * @return {number} 
 */
export function ToggleBit ( _bit, _n ) {

  return ( _n ^ ( 1 << _bit ) );

}

/**
 * 
 * @param {number} _value 
 * @param {number} _min 
 * @param {number} _max 
 * 
 * @return {number}
 */
export function Clamp ( _value, _min, _max ) {

  if ( _value < _min ) return _min;
  else if ( _value > _max ) return _max;

  return _value;

}

/**
 * 
 * @param {number} _value 
 * @param {number} _min 
 * @param {number} _max 
 * 
 * @return {number}
 */
export function InverseClamp ( _value, _min, _max ) {

  if ( _value < _min ) return _max;
  else if ( _value > _max ) return _min;

  return _value;

}

/**
 * 
 * @param {any} _a 
 * @param {any} _b 
 * 
 * @return {any}
 */
export function FlipACoin ( _a, _b ) {

  if ( RandomInteger( 1, 2 ) === 1 ) return _a;

  return _b;

}

/**
 * 
 * @param {number} _n
 * 
 * @return {number} 
 */
export function NearestPow2Floor ( _n ) {

  return ( 1 << 31 - Clz32( _n ) );

}

/**
 * 
 * @param {number} _n
 * 
 * @return {number} 
 */
export function NearestPow2Ceil ( _n ) {

  return ( 1 << 31 - Clz32( _n * 2 ) );

}

/**
 * 
 * @param {number} _n
 * 
 * @return {number} 
 */
export function NearestPow2Round ( _n ) {

  return ( 1 << 31 - Clz32( _n * 1.5 ) );

}

/**
 * 
 * @param {number} _from 
 * @param {number} _to 
 * @param {number} _interval 
 * @param {number} _precision 
 * 
 * @return {number[]}
 */
export function GenerateSequence ( _from, _to, _interval, _precision ) {

  const sequence = [];

  for ( var i = 0 ; i < _to; i += _interval ) {

    sequence.push( PrecisionRound( i, _precision ) );
    
  }

  return sequence;

}

/**
 * 
 * @param {any[]} _array 
 * 
 * @return {any}
 */
export function RandomInArray ( _array ) {

  return _array[ RandomInteger( 0, _array.length - 1 ) ];

}

/**
 * 
 * @param {object}  _options 
 * @param {string?} _other
 * 
 * @return {object|any} 
 */
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

/**
 * 
 * @param {integer?} _length 
 * @param {integer?} _parts 
 * @param {integer?} _charSetIndex 
 * @param {string?}  _separator 
 * 
 * @return {string}
 */
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

/**
 * 
 * @param {object} _object 
 * @param {object} _props
 * 
 * @return {void} 
 */
export function ApplyProperties ( _object, _props ) {

  if ( _props !== undefined ) {

    let key;
  
    for ( key in _props ) {
  
      if ( _object[ key ] !== undefined ) _object[ key ] = _props[ key ];
        
    }
      
  }

}

/**
 * 
 * @param {object}  _object 
 * @param {string}  _string 
 * @param {boolean} _getObjectHolding 
 * @param {boolean} _set 
 * @param {any}     _value 
 * @param {string?} _splitter 
 * 
 * @return {any}
 */
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

/**
 * 
 * @param {any[]}   _array 
 * @param {integer} _amount
 * 
 * @return {any} 
 */
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

/**
 * 
 * @param {any[]} _array
 * 
 * @return {void} 
 */
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

/**
 * 
 * @param {string|number} _value
 * 
 * @return {integer} 
 */
export function Base16ToBase10 ( _value ) {

  return parseInt( _value, 16 );

}

/**
 * 
 * @param {string|number} _value
 * 
 * @return {integer} 
 */
export function Base2ToBase10 ( _value ) {

  return parseInt( _value, 2 );

}

/**
 * 
 * @param {object} _object
 * 
 * @return {boolean} 
 */
export function IsObjectEmpty ( _object ) {

  let key;

  for ( key in _object ) {

    if ( _object.hasOwnProperty( key ) ) {
  
      return false;
        
    }
      
  }
  
  return JSON.stringify( _object ) === JSON.stringify( {} );

}

/**
 * 
 * @param {object} _object 
 * 
 * @return {object}
 */
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

/**
 * 
 * @param {string[]} _args 
 * @param {string}   _pre 
 * @param {string}   _post
 * 
 * @return {any[]} 
 */
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

/**
 * 
 * @param {object}   _object 
 * @param {string[]} _args 
 * @param {string}   _pre
 * 
 * @return {void} 
 */
export function ReplaceArgumentWithObjectValue ( _object, _args, _pre ) {

  let arg = _args[ 0 ];

  for ( var i = 0; i < _args.length; arg = _args[ ++i ] ) {

    if ( typeof arg === 'string' ) {

      if ( arg.indexOf( _pre ) === 0 ) {

        _args[ i ] = Nested( _object, arg.slice( _pre.length ) );

      }

    }

  }

}

/**
 * 
 * @param {object} _o1 
 * @param {object} _o2
 * 
 * @return {void} 
 */
export function AssignIfUndefined ( _o1, _o2 ) {

  for ( var key in _o1 ) {

    if ( _o1.hasOwnProperty( key ) ) {
  
      if ( _o2[ key ] === undefined ) {

        _o2[ key ] = _o1[ key ];

      }
        
    }
      
  }

}

/**
 * 
 * @param {object} _obj 
 * @param {object} _schema
 * 
 * @return {boolean} 
 */
export function ValidateWithSchema ( _obj, _schema ) {

  let valid = true;
  let key;

  for ( key in _schema ) {

    if ( _schema[ key ] != null ) {
      
      if ( _schema[ key ].required === true && _obj[ key ] == null ) {

        console.error( 'Key: ' + key + ' is required!' );
        valid = false;
      
      }

    }

  }

  for ( key in _obj ) {

    if ( _obj[ key ] != null ) {

      if ( _schema[ key ] == null ) {

        console.error( 'Unknown key: ' + key );
        valid = false;
    
      } else if ( _schema[ key ].typeCheck( _obj[ key ] ) === false ) {
      
        console.error( 'Type check failed for key: ' + key );
        valid = false;

      }
    
    }

  }

  return valid;

}

/**
 * 
 * @param {boolean} _server
 * 
 * @return {void} 
 */
export function PRINT_VERSION ( _server ) {

  if ( !_server ) {

    console.log(
      '%cnenkraft2 %cversion %c' + VERSION,
      'color:#c89664;background-color:#304860;font-family' + 
      ':Arial;font-size:18px;font-weight:900;padding:5px;',
      'color:#c89664;background-color:#5078a0;font-family' + 
      ':Arial;font-size:18px;font-weight:900;padding:5px;',
      'color:#c89664;background-color:#6496c8;font-family' + 
      ':Arial;font-size:18px;font-weight:900;padding:5px;'
    );
  
  } else {

    console.log( 'nenkraft2 server version ' + VERSION );
  
  }

}
