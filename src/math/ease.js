/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

const Sin = Math.sin;
const Cos = Math.cos;
const Sqrt = Math.sqrt;
const PI = Math.PI;

/**
 * 
 * @param {number} _time 
 * @param {number} _startValue 
 * @param {number} _amplitude 
 * @param {number} _duration 
 * 
 * @return {number}
 */
export const Linear = function ( _time, _startValue, _amplitude, _duration ) {

  return _amplitude * _time / _duration + _startValue;
  
};

/**
 * 
 * @param {number} _time 
 * @param {number} _startValue 
 * @param {number} _amplitude 
 * @param {number} _duration 
 * 
 * @return {number}
 */
export const QuadIn = function ( _time, _startValue, _amplitude, _duration ) {

  _time /= _duration;

  return _amplitude * _time * _time + _startValue;
  
};

/**
 * 
 * @param {number} _time 
 * @param {number} _startValue 
 * @param {number} _amplitude 
 * @param {number} _duration 
 * 
 * @return {number}
 */
export const QuadOut = function ( _time, _startValue, _amplitude, _duration ) {

  _time /= _duration;

  return -_amplitude * _time * ( _time - 2 ) + _startValue;
  
};

/**
 * 
 * @param {number} _time 
 * @param {number} _startValue 
 * @param {number} _amplitude 
 * @param {number} _duration 
 * 
 * @return {number}
 */
export const QuadInOut = function ( _time, _startValue, _amplitude, _duration ) {

  _time /= _duration * 0.5;
  if ( _time < 1 ) return _amplitude * 0.5 * _time * _time + _startValue;
  _time--;

  return -_amplitude * 0.5 * ( _time * ( _time - 2 ) - 1 ) + _startValue;
  
};

/**
 * 
 * @param {number} _time 
 * @param {number} _startValue 
 * @param {number} _amplitude 
 * @param {number} _duration 
 * 
 * @return {number}
 */
export const SineIn = function ( _time, _startValue, _amplitude, _duration ) {

  return -_amplitude * Cos( _time / _duration * ( PI * 0.5 ) ) + _amplitude + _startValue;
  
};

/**
 * 
 * @param {number} _time 
 * @param {number} _startValue 
 * @param {number} _amplitude 
 * @param {number} _duration 
 * 
 * @return {number}
 */
export const SineOut = function ( _time, _startValue, _amplitude, _duration ) {

  return _amplitude * Sin( _time / _duration * ( PI * 0.5 ) ) + _startValue;
  
};

/**
 * 
 * @param {number} _time 
 * @param {number} _startValue 
 * @param {number} _amplitude 
 * @param {number} _duration 
 * 
 * @return {number}
 */
export const SineInOut = function ( _time, _startValue, _amplitude, _duration ) {

  return -_amplitude * 0.5 * ( Cos( PI * _time / _duration ) - 1 ) + _startValue;
  
};

/**
 * 
 * @param {number} _time 
 * @param {number} _startValue 
 * @param {number} _amplitude 
 * @param {number} _duration 
 * 
 * @return {number}
 */
export const CircIn = function ( _time, _startValue, _amplitude, _duration ) {

  _time /= _duration;

  return -_amplitude * ( Sqrt( 1 - _time * _time ) - 1 ) + _startValue;
  
};

/**
 * 
 * @param {number} _time 
 * @param {number} _startValue 
 * @param {number} _amplitude 
 * @param {number} _duration 
 * 
 * @return {number}
 */
export const CircOut = function ( _time, _startValue, _amplitude, _duration ) {

  _time /= _duration;
  _time--;

  return _amplitude * Sqrt( 1 - _time * _time ) + _startValue;
  
};

/**
 * 
 * @param {number} _time 
 * @param {number} _startValue 
 * @param {number} _amplitude 
 * @param {number} _duration 
 * 
 * @return {number}
 */
export const CircInOut = function ( _time, _startValue, _amplitude, _duration ) {

  _time /= _duration * 0.5;
  if ( _time < 1 ) return -_amplitude * 0.5 * ( Sqrt( 1 - _time * _time ) - 1 ) + _startValue;
  _time -= 2;

  return _amplitude * 0.5 * ( Sqrt( 1 - _time * _time ) + 1 ) + _startValue;
  
};
