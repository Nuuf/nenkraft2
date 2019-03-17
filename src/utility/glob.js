/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { IsArray } from '.';

export class Glob {

  /**
   * 
   */
  constructor () {

    this.functions = {};
    this.values = {};
    this.constants = {};
    this.components = {};
    this.objects = {};
    this.lists = {};

  }

  /**
   * 
   * @return {string}
   */
  static get FUNCTION () {

    return PS_FUNCTION;
  
  }

  /**
   * 
   * @return {string}
   */
  static get VALUE () {

    return PS_VALUE;
  
  }

  /**
   * 
   * @return {string}
   */
  static get CONSTANT () {

    return PS_CONSTANT;
  
  }

  /**
   * 
   * @return {string}
   */
  static get COMPONENT () {

    return PS_COMPONENT;
  
  }

  /**
   * 
   * @return {string}
   */
  static get OBJECT () {

    return PS_OBJECT;
  
  }

  /**
   * 
   * @return {string}
   */
  static get LIST () {

    return PS_LIST;

  }

  /**
   * 
   * @return {boolean}
   */
  static get AllowGetNullUndefined () {

    return PS_AllowGetNullUndefined;
  
  }

  /**
   *
   * @param {boolean} _value
   */
  static set AllowGetNullUndefined ( _value ) {

    PS_AllowGetNullUndefined = !!_value;
  
  }

  /**
   * 
   * @param {object} _g 
   * 
   * @return {void}
   */
  static Assign ( _g ) {

    if ( window && !_g ) {

      _g = window;
      
    } else if ( global && !_g ) {
  
      _g = global;
      
    }
  
    if ( _g ) {
  
      _g.FUNC = PS_FUNCTION;
      _g.VAL = PS_VALUE;
      _g.CONST = PS_CONSTANT;
      _g.COMP = PS_COMPONENT;
      _g.OBJ = PS_OBJECT;
      _g.LIST = PS_LIST;
      
    } else {
  
      throw new Error( 'No global namespace' );
      
    }
  
  }

  /**
   * 
   * @param {string} _id 
   * 
   * @return {void}
   */
  static Create ( _id ) {

    const window = window || null;

    if ( window == null ) {

      if ( global != null ) {
  
        if ( global[ _id ] !== undefined ) throw new Error( 'global.' + _id + ' already exists!' );
  
        global[ _id ] = new Glob();
        
      } else {
  
        throw new Error( 'Neither window nor global exists!' );
        
      }
  
    } else {
  
      if ( window[ _id ] !== undefined ) throw new Error( 'window.' + _id + ' already exists!' );
  
      window[ _id ] = new Glob();
      
    }
  
  }

  /**
   * 
   * @param {string} _type 
   * @param {string} _id 
   * @param {any}    _value 
   * 
   * @return {void}
   */
  Define ( _type, _id, _value ) {

    this.Mark( _type, _id );
    this.Set( _type, _id, _value );
  
  }
  
  /**
   * 
   * @param {string} _type 
   * @param {string} _id
   * 
   * @return {void} 
   */
  Mark ( _type, _id ) {

    if ( typeof _type !== 'string' ) throw new Error( 'Type needs to be a string!' );
    if ( typeof _id !== 'string' ) throw new Error( 'Id needs to be a string!' );

    if ( this[ _type ] == null ) throw new Error( 'Type does not exist' );

    if ( _type === PS_CONSTANT || _type === PS_COMPONENT ) {

      if ( this[ _type ][ _id ] !== undefined ) {

        throw new Error( 'Constants cannot be reassigned!' );
      
      }

    }

    this[ _type ][ _id ] = null;
  
  }

  /**
   * 
   * @param {string} _type 
   * @param {string} _id
   * 
   * @return {any} 
   */
  Get ( _type, _id ) {

    if ( typeof _type !== 'string' ) throw new Error( 'Type needs to be a string!' );
    if ( typeof _id !== 'string' ) throw new Error( 'Id needs to be a string!' );

    if ( this[ _type ] == null ) throw new Error( 'Type does not exist' );

    if ( Glob.AllowGetNullUndefined === false ) {

      if ( this[ _type ][ _id ] == null ) throw new Error( 'Null or undefined!' );
    
    }

    return this[ _type ][ _id ];
  
  }

  /**
   * 
   * @param {string} _type 
   * @param {string} _id 
   * @param {any}    _value 
   * 
   * @return {void}
   */
  Set ( _type, _id, _value ) {

    if ( typeof _type !== 'string' ) throw new Error( 'Type needs to be a string!' );
    if ( typeof _id !== 'string' ) throw new Error( 'Id needs to be a string!' );

    switch ( _type ) {

      case PS_FUNCTION:
        if ( typeof _value !== 'function' ) throw new Error( 'Needs to be a function!' );
  
        if ( this.functions[ _id ] !== null ) throw new Error( 'No mark!' );
  
        this.functions[ _id ] = _value;
        break;

      case PS_VALUE: 
        if ( _value instanceof Object ) throw new Error( 'Objects are not allowed!' );
  
        if ( this.values[ _id ] !== null ) throw new Error( 'No mark!' );

        this.values[ _id ] = _value;
        break;

      case PS_CONSTANT:
        if ( _value instanceof Object ) throw new Error( 'Objects are not allowed!' );
  
        if ( this.constants[ _id ] !== null ) throw new Error( 'No mark!' );

        Object.defineProperty( this.constants, _id, {
          writable: false,
          configurable: false,
          value: _value
        } );
        break;

      case PS_COMPONENT:
        if ( typeof _value !== 'function' ) throw new Error( 'Needs to be a function!' );
  
        if ( this.components[ _id ] !== null ) throw new Error( 'No mark!' );

        Object.defineProperty( this.components, _id, {
          writable: false,
          configurable: false,
          value: _value
        } );
        break;
      
      case PS_OBJECT:
        if ( typeof _value !== 'object' ) throw new Error( 'Needs to be an object' );
        if ( IsArray( _value ) === true ) throw new Error( 'Arrays are not allowed!' );
  
        if ( this.objects[ _id ] !== null ) throw new Error( 'No mark!' );

        this.objects[ _id ] = _value;
        break;

      case PS_LIST:
        if ( IsArray( _value ) === false ) throw new Error( 'Needs to be an array!' );

        if ( this.lists[ _id ] !== null ) throw new Error( 'No mark!' );

        this.lists[ _id ] = _value;
        break;

      default:
        throw new Error( 'Unrecognized type!' );
    
    }

  }

}

const PS_FUNCTION = 'functions';
const PS_VALUE = 'values';
const PS_CONSTANT = 'constants';
const PS_COMPONENT = 'components';
const PS_OBJECT = 'objects';
const PS_LIST = 'lists';
const PS_AllowGetNullUndefined = false;
