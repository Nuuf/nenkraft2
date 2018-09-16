/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class Option {

  constructor ( _id, _handle, _info, _priority, _breakIfExecuted ) {

    this.id = _id.split( ' ' );
    this.handle = _handle;
    this.info = _info;
    this.priority = _priority;
    this.breakIfExecuted = !!_breakIfExecuted;
    this.data = {};
    this.command = null;
  
  }

  Execute ( _dataStrs, _data, _staticData ) {

    this.handle( _dataStrs, _data, _staticData );

    return this.breakIfExecuted;
  
  }

}
