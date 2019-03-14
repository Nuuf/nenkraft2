/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class Registry {

  /**
   * 
   */
  constructor () {

    this.commands = [];
    this.splitter = ' ';
  
  }

  /**
   * 
   * @param {Command} _command 
   * 
   * @return {Command}
   */
  AddCommand ( _command ) {

    if ( _command.registry == null ) {

      this.commands.push( _command );
      _command.registry = this;

      return _command;
    
    }
  
  }

  /**
   * 
   * @param {Command} _command 
   * 
   * @return {Command}
   */
  RemoveCommand ( _command ) {

    const commands = this.commands;
    const ix = commands.indexOf( _command );

    if ( ix !== -1 ) {

      _command.registry = null;

      return commands.fickleSplice( ix );
    
    }
  
  }

  /**
   * 
   * @param {string} _id 
   * 
   * @return {Command|null}
   */
  GetCommandById ( _id ) {

    const commands = this.commands;
    let command = commands[ 0 ];

    for ( var i = 0; i < commands.length; command = commands[ ++i ] ) {

      if ( command ) {

        for ( var j = 0; j < command.id.length; ++j ) {

          if ( command.id[ j ] === _id ) return command;
        
        }
      
      }
    
    }

    return null;
  
  }

  /**
   * 
   * @param {string}  _str 
   * @param {object?} _staticData 
   * 
   * @return {String|null}
   */
  Parse ( _str, _staticData ) {

    const strs = String( _str ).split( this.splitter );
    const cmdStr = strs.shift();
    const command = this.GetCommandById( cmdStr );

    if ( command ) {

      command.Execute( strs, {}, _staticData );

      return null;
    
    }

    return cmdStr;
  
  }

}
