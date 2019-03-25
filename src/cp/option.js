/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class Option {

  /**
   * 
   * @param {string}   _id 
   * @param {Function} _handle 
   * @param {string?}  _info 
   * @param {integer?} _priority 
   * @param {boolean?} _breakIfExecuted 
   */
  constructor ( _id, _handle, _info, _priority, _breakIfExecuted ) {

    this.id = _id.split( ' ' );
    this.handle = _handle;
    this.info = _info;
    this.priority = _priority;
    this.breakIfExecuted = !!_breakIfExecuted;
    this.data = {};
    this.command = null;
  
  }

  /**
   * 
   * @param {[]}      _dataStrs 
   * @param {object}  _data 
   * @param {object?} _staticData 
   * 
   * @return {boolean}
   */
  Execute ( _dataStrs, _data, _staticData ) {

    this.handle( _dataStrs, _data, _staticData );

    return this.breakIfExecuted;
  
  }

}
