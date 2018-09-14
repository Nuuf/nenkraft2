/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

'use strict';

import { RandomInteger } from '.';

export function CCH1 ( _string, _cci ) {

  let i = 0;
  let char;
  let otn;
  const chars = _string.split( '' );
  const l = chars.length;
  const output = [];
  
  _cci = _cci === undefined ? 1 : _cci;

  for ( ; i < l; ++i ) {

    char = chars[ i ];
    char = ( char.charCodeAt( 0 ) + _cci ).toString( 2 );
    otn = RandomInteger( 1, 9 );
    output.push( otn + 'x' + char.replace( /1/g, otn ) );
    
  }

  return output.join( ' ' );

}

export function CCH1Decipher ( _string, _cci ) {
   
  let i = 0;
  let string;
  const strings = _string.split( ' ' );
  const l = strings.length;
  const output = [];

  _cci = _cci === undefined ? 1 : _cci;

  for ( ; i < l; ++i ) {

    string = strings[ i ];
    string = string.slice( -string.length + 2 );
    output.push( String.fromCharCode( parseInt( string.replace( /[2-9]/g, '1' ), 2 ) - _cci ) );
    
  }

  return output.join( '' );

}
