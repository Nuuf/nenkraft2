/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Option } from './option';

export class Command {

  constructor ( _id, _handle, _info, _continueToPrime, _optionPrefix ) {
  
    this.id = _id.split( ' ' );
    this.handle = _handle;
    this.info = _info;
    this.data = {};
    this.options = null;
    this.registry = null;
    this.optionPrefix = _optionPrefix == null ? PS_OPTION_PREFIX : _optionPrefix;
    this.dsCopy = [];
    this.dataSeparator = '=';
    this.allOptionIds = null;
    this.fullInfo = null;
    this.continueToPrime = !!_continueToPrime;
    this.filterNull = false;
    
  }
  
  get OPTION_PREFIX () {
  
    return PS_OPTION_PREFIX;
    
  }
  
  set OPTION_PREFIX ( _value ) {
  
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
  
    let i = 0;
    const options = this.options;
    const l = options.length;
    let option = options[i];
    const opt = new Option( _id, _handle, _info, _priority, _breakIfExecuted );
  
    opt.command = this;
  
    for ( ; i < l; option = options[++i] ) {
  
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
  
    let i = 0;
    let str;
    let data;
    const ds = this.dataSeparator;
    const dsCopy = this.dsCopy;

    dsCopy.push.apply( dsCopy, _dataStrs );

    let l = dsCopy.length;
  
    for ( ; i < l; ++i ) {
  
      str = dsCopy[ i ];
      data = str.split( ds );
  
      if ( data.length === 2 ) {

        _dataStrs[i] = null;
        _data[ data[ 0 ] ] = data[ 1 ];
        
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
  
    let i = 0;
    let option;
    const l = matchingOptionIds.length;
    
    for ( ; i < l; ++i ) {
    
      option = this.GetOptionById( matchingOptionIds[ i ] );
      if ( option.Execute( _dataStrs, _data, _staticData ) === true ) return false;
        
    }
    
    return this.continueToPrime;
    
  }
  
  GetOptionById ( _id ) {
  
    let i = 0;
    const options = this.options;
    const l = options.length;
    let option = options[i];
  
    for ( ; i < l; option = options[++i] ) {
  
      option = options[ i ];
      if ( option.id.indexOf( _id ) !== -1 ) return option;
        
    }
    
    return null;
    
  }
  
  GetAllOptionIds () {
  
    let i = 0;
    const options = this.options;
    const l = options.length;
    const allOptionIds = [];

    for ( ; i < l; ++i ) {
  
      allOptionIds.push.apply( allOptionIds, options[ i ].id );
      
    }
  
    return allOptionIds;
    
  }
  
  GetAndRemoveMatchingOptionIds ( _dataStrs ) {
  
    const allOptionIds = this.allOptionIds;
  
    if ( allOptionIds == null ) return null;
  
    let i = 0;
    let ix;
    const l = allOptionIds.length;
    const optionIds = [];
  
    for ( ; i < l; ++i ) {
  
      ix = _dataStrs.indexOf( allOptionIds[ i ] );
  
      if ( ix !== -1 ) {
  
        optionIds.push( _dataStrs.fickleSplice( ix ) );
        
      }
      
    }
  
    return optionIds;
    
  }
  
  GenerateInfoString () {
  
    let i = 0;
    let str = 'COMMAND: ' + this.id.join( ', ' ) + ' -> ' + this.info + '\n';
    const options = this.options;
    const l = options.length;
    let option = options[i];
  
    for ( ; i < l; option = options[++i] ) {
  
      option = options[ i ];
      str += 'OPTION: ' + option.id.join( ', ' ) + ' -> ' + option.info + '\n';
      
    }
  
    return str;
    
  }
  
}
  
// Private Static ----->
const PS_OPTION_PREFIX = '';
const PS_FilterNullElements = function ( _element ) {

  return _element != null;

};
// <----- Private static
