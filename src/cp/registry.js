/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class Registry {

  constructor () {

    this.commands = [];
    this.splitter = ' ';
  
  }

  AddCommand ( _command ) {

    if ( _command.registry == null ) {

      this.commands.push( _command );
      _command.registry = this;

      return _command;
    
    }
  
  }

  RemoveCommand ( _command ) {

    const commands = this.commands;
    const ix = commands.indexOf( _command );

    if ( ix !== -1 ) {

      _command.registry = null;

      return commands.fickleSplice( ix );
    
    }
  
  }

  GetCommandById ( _id ) {

    let i = 0;
    let j;
    let jl;
    const commands = this.commands;
    const l = commands.length;
    let command = commands[i];

    for ( ; i < l; command = commands[++i] ) {

      if ( command ) {

        j = 0;
        jl = command.id.length;

        for ( ; j < jl; ++j ) {

          if ( command.id[ j ] === _id ) return command;
        
        }
      
      }
    
    }

    return null;
  
  }

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
