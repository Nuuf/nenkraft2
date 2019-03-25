/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

'use strict';

import { RandomInteger } from '.';

/**
 * 
 * @param {string}   _string 
 * @param {integer?} _cci
 * 
 * @return {string} 
 */
export function CCH1 ( _string, _cci ) {

  let char;
  let otn;
  const chars = _string.split( '' );
  const output = [];
  
  _cci = _cci ? _cci : 1;

  for ( var i = 0; i < chars.length; ++i ) {

    char = chars[ i ];
    char = ( char.charCodeAt( 0 ) + _cci ).toString( 2 );
    otn = RandomInteger( 1, 9 );
    output.push( otn + 'x' + char.replace( /1/g, otn ) );
    
  }

  return output.join( ' ' );

}

/**
 * 
 * @param {string}   _string 
 * @param {integer?} _cci
 * 
 * @return {string} 
 */
export function CCH1Decipher ( _string, _cci ) {
   
  let string;
  const strings = _string.split( ' ' );
  const output = [];

  _cci = _cci ? _cci : 1;

  for ( var i = 0; i < strings.length; ++i ) {

    string = strings[ i ];
    string = string.slice( -string.length + 2 );
    output.push( String.fromCharCode( parseInt( string.replace( /[2-9]/g, '1' ), 2 ) - _cci ) );
    
  }

  return output.join( '' );

}
