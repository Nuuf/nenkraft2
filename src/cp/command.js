/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Option } from './option';

export class Command {

  constructor ( _id, _handle, _info, _continueToPrime, _filterNull, _optionPrefix ) {
  
    this.id = _id.split( ' ' );
    this.handle = _handle;
    this.info = _info;
    this.data = {};
    this.options = null;
    this.registry = null;
    this.optionPrefix = _optionPrefix == null ? PS_OPTION_PREFIX : _optionPrefix;
    this.dataSeparator = '=';
    this.allOptionIds = null;
    this.fullInfo = null;
    this.continueToPrime = !!_continueToPrime;
    this.filterNull = !!_filterNull;
    this.jsonPrefix = '(JSON)';
    
  }
  
  static get OPTION_PREFIX () {
  
    return PS_OPTION_PREFIX;
    
  }
  
  static set OPTION_PREFIX ( _value ) {
  
    PS_OPTION_PREFIX = _value;
    
  }
  
  Execute ( _dataStrs, _data, _staticData ) {
  
    this.HandleData( _dataStrs, _data );

    if ( this.filterNull === true ) {

      _dataStrs = _dataStrs.filter( PS_FilterNullElements );
    
    }
  
    if ( this.HandleOptions( _dataStrs, _data, _staticData ) === true ) {
  
      this.handle( _dataStrs, _data, _staticData );
      
    }
    
  }
  
  AddOption ( _id, _handle, _info, _priority, _breakIfExecuted, _optionPrefix ) {
  
    _optionPrefix = _optionPrefix == null ? this.optionPrefix : _optionPrefix;
    if ( _optionPrefix != null ) _id = _id.replace( /\S+/g, _optionPrefix + '$&' );
    if ( this.options == null ) this.options = [];
    _priority = _priority == null ? 0 : _priority;
  
    const options = this.options;
    let option = options[ 0 ];
    const opt = new Option( _id, _handle, _info, _priority, _breakIfExecuted );
  
    opt.command = this;
  
    for ( var i = 0; i < options.length; option = options[ ++i ] ) {
  
      if ( option.priority <= _priority ) {
  
        options.splice( i, 0, opt );
        this.allOptionIds = this.GetAllOptionIds();
  
        return this;
        
      }
      
    }
  
    this.options.push( opt );
    this.allOptionIds = this.GetAllOptionIds();
  
    return this;
    
  }
  
  HandleData ( _dataStrs, _data ) {
  
    let data;
    const dsep = this.dataSeparator;
    const dsCopy = PS_DS_COPY;
    const jsonPrefix = this.jsonPrefix;
    const jsonPrefixL = jsonPrefix.length;

    dsCopy.push.apply( dsCopy, _dataStrs );

    let str = dsCopy[ 0 ];
  
    for ( var i = 0; i < dsCopy.length; str = dsCopy[ ++i ] ) {
  
      data = str.split( dsep );
  
      if ( data.length === 2 ) {

        _dataStrs[ i ] = null;

        if ( data[ 0 ].substring( 0, jsonPrefixL ) === jsonPrefix ) {

          _data[ data[ 0 ].substring( jsonPrefixL ) ] = JSON.parse( data[ 1 ] );

        } else {

          _data[ data[ 0 ] ] = data[ 1 ];
        
        }
        
      }
      
    }
  
    dsCopy.length = 0;
    
  }
  
  HandleOptions ( _dataStrs, _data, _staticData ) {
  
    if ( _dataStrs.length === 0 ) {
  
      return this.continueToPrime;
        
    }
  
    const matchingOptionIds = this.GetAndRemoveMatchingOptionIds( _dataStrs );
  
    if ( matchingOptionIds == null ) return this.continueToPrime;
  
    let option;
    
    for ( var i = 0; i < matchingOptionIds.length; ++i ) {
    
      option = this.GetOptionById( matchingOptionIds[ i ] );
      if ( option.Execute( _dataStrs, _data, _staticData ) === true ) return false;
        
    }
    
    return this.continueToPrime;
    
  }
  
  GetOptionById ( _id ) {
  
    const options = this.options;
    let option = options[ 0 ];
  
    for ( var i = 0; i < options.length; option = options[ ++i ] ) {
  
      if ( option.id.indexOf( _id ) !== -1 ) return option;
        
    }
    
    return null;
    
  }
  
  GetAllOptionIds () {
  
    const options = this.options;
    const allOptionIds = [];

    for ( var i = 0; i < options.length; ++i ) {
  
      allOptionIds.push.apply( allOptionIds, options[ i ].id );
      
    }
  
    return allOptionIds;
    
  }
  
  GetAndRemoveMatchingOptionIds ( _dataStrs ) {
  
    const allOptionIds = this.allOptionIds;
  
    if ( allOptionIds == null ) return null;
  
    let ix;
    const optionIds = [];
  
    for ( var i = 0; i < allOptionIds.length; ++i ) {
  
      ix = _dataStrs.indexOf( allOptionIds[ i ] );
  
      if ( ix !== -1 ) {
  
        optionIds.push( _dataStrs.fickleSplice( ix ) );
        
      }
      
    }
  
    return optionIds;
    
  }
  
  GenerateInfoString () {
  
    let str = 'COMMAND: ' + this.id.join( ', ' ) + ' -> ' + this.info + '\n';
    const options = this.options;
    let option = options[ 0 ];
  
    for ( var i = 0; i < options.length; option = options[ ++i ] ) {
  
      str += 'OPTION: ' + option.id.join( ', ' ) + ' -> ' + option.info + '\n';
      
    }
  
    return str;
    
  }
  
}
  
// Private Static ----->
let PS_OPTION_PREFIX = '';
const PS_DS_COPY = [];
const PS_FilterNullElements = function ( _element ) {

  return _element != null;

};
// <----- Private Static
