/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Clamp, Base16ToBase10 } from '.';

const Max = Math.max;
const Min = Math.min;
const Round = Math.round;

export class Color {

  constructor ( _r, _g, _b, _a ) {

    this.channel = new Float32Array( [
      _r == null ? 0 : _r,
      _g == null ? 0 : _g,
      _b == null ? 0 : _b,
      _a == null ? 1 : _a
    ] );
    this.value = '';
    this.currentConversion = RGB;
    this.ComputeValueRGBA();
  
  }

  Copy () {

    const color = new Color( this.channel[ 0 ], this.channel[ 1 ], this.channel[ 2 ], this.channel[ 3 ] );

    color.value = this.value;
    color.currentConversion = this.currentConversion;

    return color;
  
  }

  ComputeValueRGBA () {

    this.value = 'rgba('.concat( this.channel.join( ',' ).concat( ')' ) );

    return this;
  
  }

  ComputeValueHSLA () {

    this.value = 'hsla(' + this.channel[ 0 ] + ',' + this.channel[ 1 ] + '%,' + this.channel[ 2 ] + '%,' + this.channel[ 3 ] + ')';

    return this;
  
  }

  ComputeValueHex () {

    this.value = '#' + this.channel[ 0 ].toString( 16 ) + this.channel[ 1 ].toString( 16 ) + this.channel[ 2 ].toString( 16 );

    return this;
  
  }

  Mix ( _color, _percentage ) {
      
    const pb = 1 - _percentage;

    return new Color(
      this.channel[ 0 ] * _percentage + _color.channel[ 0 ] * pb,
      this.channel[ 1 ] * _percentage + _color.channel[ 1 ] * pb,
      this.channel[ 2 ] * _percentage + _color.channel[ 2 ] * pb,
      this.channel[ 3 ] * _percentage + _color.channel[ 3 ] * pb
    );

  }

  ConvertToHSLA ( _round ) {

    let h = 0;
    let s = 0;
    const r = this.channel[ 0 ] / PS_MAX_VAL;
    const g = this.channel[ 1 ] / PS_MAX_VAL;
    const b = this.channel[ 2 ] / PS_MAX_VAL;
    const max = Max( r, g, b );
    const min = Min( r, g, b );
    const maxnmin = max - min;
    const maxpmin = max + min;
    const l = maxpmin * 0.5;

    if ( max !== min ) {

      s = ( l > 0.5 ) ? maxnmin / ( 2 - max - min ) : maxnmin / ( max + min );
      if ( max === r ) h = ( g - b ) / maxnmin + ( ( g < b ) ? 6 : 0 );
      else if ( max === g ) h = ( b - r ) / maxnmin + 2;
      else h = ( r - g ) / maxnmin + 4;
      h /= 6;
    
    }

    this.channel[ 0 ] = h * 360, this.channel[ 1 ] = s * 100, this.channel[ 2 ] = l * 100;

    if ( _round === true ) {

      this.channel[ 0 ] = Round( this.channel[ 0 ] );
      this.channel[ 1 ] = Round( this.channel[ 1 ] );
      this.channel[ 2 ] = Round( this.channel[ 2 ] );
    
    }

    this.currentConversion = HSL;
    this.ComputeValueHSLA();
  
  }

  SetRGB ( _r, _g, _b, _noCompute ) {

    this.channel[ 0 ] = Clamp( _r, PS_MIN_VAL, PS_MAX_VAL );
    this.channel[ 1 ] = Clamp( _g, PS_MIN_VAL, PS_MAX_VAL );
    this.channel[ 2 ] = Clamp( _b, PS_MIN_VAL, PS_MAX_VAL );
    this.currentConversion = RGB;
    if ( !_noCompute ) this.ComputeValueRGBA();

    return this;
  
  }

  SetRGBA ( _r, _g, _b, _a ) {

    this.SetRGB( _r, _g, _b, true );
    this.channel[ 3 ] = Clamp( _a, 0, 1 );
    this.ComputeValueRGBA();

    return this;
  
  }

  SetHex ( _hex ) {

    _hex = _hex.replace( /#/g, '' );
    let strs = _hex.match( /.{2}/g );

    strs = strs.map( Base16ToBase10 );
    if ( strs[ 3 ] == null ) strs[ 3 ] = 1;
    this.SetRGBA( strs[ 0 ], strs[ 1 ], strs[ 2 ], strs[ 3 ] );

    return this;
  
  }

  IncreaseChannel ( _channel, _value ) {

    this.channel[ _channel ] += _value;
    if ( this.currentConversion === RGB ) this.ComputeValueRGBA();
    else if ( this.currentConversion === HSL ) this.ComputeValueHSLA();

    return this;

  }

  SetChannel ( _channel, _value ) {

    this.channel[ _channel ] = _value;
    if ( this.currentConversion === RGB ) this.ComputeValueRGBA();
    else if ( this.currentConversion === HSL ) this.ComputeValueHSLA();

    return this;
  
  }

  SetSame ( _value ) {

    this.channel[ 0 ] = 
    this.channel[ 1 ] = 
    this.channel[ 2 ] = _value;

    if ( this.currentConversion === RGB ) this.ComputeValueRGBA();
    else if ( this.currentConversion === HSL ) this.ComputeValueHSLA();

    return this;

  }

  Normalize () {

    this.channel[ 0 ] = PS_NORM * this.channel[ 0 ];
    this.channel[ 1 ] = PS_NORM * this.channel[ 1 ];
    this.channel[ 2 ] = PS_NORM * this.channel[ 2 ];
  
  }

  get r () {

    return this.channel[ 0 ];
  
  }

  set r ( _value ) {

    this.channel[ 0 ] = _value;
  
  }

  get g () {

    return this.channel[ 1 ];
  
  }

  set g ( _value ) {

    this.channel[ 1 ] = _value;
  
  }

  get b () {

    return this.channel[ 2 ];
  
  }

  set b ( _value ) {

    this.channel[ 2 ] = _value;
  
  }

  get a () {

    return this.channel[ 3 ];
  
  }

  set a ( _value ) {

    this.channel[ 3 ] = _value;
  
  }

}

// Private Static ----->
const RGB = 'RGB';
const HSL = 'HSL';
const PS_MAX_VAL = 255;
const PS_MIN_VAL = 0;
const PS_NORM = 1 / PS_MAX_VAL;
// <----- Private Static
