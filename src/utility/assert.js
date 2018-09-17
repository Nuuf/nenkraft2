/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

'use strict';

export function Assert ( _data, _compare, _value, _noSelfAssert ) {

  if ( _noSelfAssert == undefined || typeof _data.Assert !== 'function' ) {

    switch ( _compare ) {
  
      case Assert.IS:
        Is( _data, _value, _compare );

        return;
      case Assert.IS_NOT:
        IsNot( _data, _value, _compare );

        return;
      case Assert.IS_SAME_TYPE:
        IsSameType( _data, _value, _compare );

        return;
      case Assert.IS_NOT_SAME_TYPE:
        IsNotSameType( _data, _value, _compare );

        return;
      case Assert.IS_INSTANCE_OF:
        IsInstanceOf( _data, _value, _compare );

        return;
      case Assert.IS_NOT_INSTANCE_OF:
        IsNotInstanceOf( _data, _value, _compare );

        return;
      case Assert.IS_LESS_THAN:
        IsLessThan( _data, _value, _compare );

        return;
      case Assert.IS_GREATER_THAN:
        IsGreaterThan( _data, _value, _compare );

        return;
      case Assert.IS_LESS_THAN_OR_EQUAL:
        IsLessThanOrEqual( _data, _value, _compare );

        return;
      case Assert.IS_GREATER_THAN_OR_EQUAL:
        IsGreaterThanOrEqual( _data, _value, _compare );

        return;
      default:
        throw new Error( 'No comparison: ' + _compare );
        
    }
      
  } else {
  
    _data.Assert( _compare, _value );
      
  }

}

function Is ( _data, _value, _compare ) {

  let failed = false;

  if ( _data !== _value ) {

    failed = true;
    
  }

  Check( failed, _data, _value, _compare );
  
}

function IsNot ( _data, _value, _compare ) {

  let failed = false;

  if ( _data === _value ) {

    failed = true;
    
  }

  Check( failed, _data, _value, _compare );
  
}

function IsSameType ( _data, _value, _compare ) {

  let failed = false;

  if ( Array.isArray( _data ) || Array.isArray( _value ) ) {

    if ( !Array.isArray( _data ) !== !Array.isArray( _value ) ) {

      failed = true;

    }  
    
  } else if ( _data === null || _value === null ) {

    if ( _data !== _value ) {

      failed = true;
        
    }
      
  } else if ( typeof _data !== typeof _value ) {

    failed = true;
      
  } else if ( typeof _data === 'number' || typeof _value === 'number' ) {

    if ( isNaN( _data ) || isNaN( _value ) ) {

      if ( _data !== _value ) {

        failed = true;
      
      }
      
    }
    
  }

  Check( failed, _data, _value, _compare );
  
}

function IsNotSameType ( _data, _value, _compare ) {

  let failed = false;

  if ( Array.isArray( _data ) || Array.isArray( _value ) ) {

    if ( Array.isArray( _data ) && ( Array.isArray( _value ) ) ) {

      failed = true;
      
    }
    
  } else if ( _data === null || _value === null ) {

    if ( _value === _data ) {

      failed = true;
        
    }
      
  } else if ( typeof _data === typeof _value ) {

    failed = true;
      
  } else if ( typeof _data === 'number' || typeof _value === 'number' ) {

    if ( isNaN( _data ) || isNaN( _value ) ) {

      if ( isNaN( _data ) && isNaN( _value ) ) {

        failed = true;
        
      }
      
    }
    
  }

  Check( failed, _data, _value, _compare );
  
}

function IsInstanceOf ( _data, _value, _compare ) {

  let failed = false;

  if ( !( _data instanceof _value ) ) {

    failed = true;
    
  }

  Check( failed, _data, _value.name, _compare );
  
}

function IsNotInstanceOf ( _data, _value, _compare ) {

  let failed = false;

  if ( _data instanceof _value ) {

    failed = true;
    
  }

  Check( failed, _data, _value.name, _compare );
  
}

function IsLessThan ( _data, _value, _compare ) {

  let failed = false;

  if ( _data >= _value ) {

    failed = true;
    
  }

  Check( failed, _data, _value, _compare );
  
}

function IsGreaterThan ( _data, _value, _compare ) {

  let failed = false;

  if ( _data <= _value ) {

    failed = true;
    
  }

  Check( failed, _data, _value, _compare );
  
}

function IsLessThanOrEqual ( _data, _value, _compare ) {

  let failed = false;

  if ( _data > _value ) {

    failed = true;
    
  }

  Check( failed, _data, _value, _compare );
  
}

function IsGreaterThanOrEqual ( _data, _value, _compare ) {

  let failed = false;

  if ( _data < _value ) {

    failed = true;
    
  }

  Check( failed, _data, _value, _compare );
  
}

function Check ( _failed, _data, _value, _compare ) {

  if ( _failed ) {

    ErrorInfo( _data, _value, _compare );
    throw new Error( 'Assertion failed: ' + _compare );
    
  } else if ( Assert.LOG && window ) {

    SuccessLog( _data, _value, _compare );
      
  }
  
}

function ErrorInfo ( _data, _value, _compare ) {

  switch ( _compare ) {

    case Assert.IS:
      _compare = Assert.IS_NOT;
      break;
    case Assert.IS_NOT:
      _compare = Assert.IS;
      break;
    case Assert.IS_SAME_TYPE:
      _compare = Assert.IS_NOT_SAME_TYPE;
      break;
    case Assert.IS_NOT_SAME_TYPE:
      _compare = Assert.IS_SAME_TYPE;
      break;
    case Assert.IS_INSTANCE_OF:
      _compare = Assert.IS_NOT_INSTANCE_OF;
      break;
    case Assert.IS_NOT_INSTANCE_OF:
      _compare = Assert.IS_INSTANCE_OF;
      break;
    case Assert.IS_LESS_THAN:
      _compare = Assert.IS_GREATER_THAN_OR_EQUAL;
      break;
    case Assert.IS_GREATER_THAN:
      _compare = Assert.IS_LESS_THAN_OR_EQUAL;
      break;
    case Assert.IS_LESS_THAN_OR_EQUAL:
      _compare = Assert.IS_GREATER_THAN;
      break;
    case Assert.IS_GREATER_THAN_OR_EQUAL:
      _compare = Assert.IS_LESS_THAN;
      break;
    default:
      throw new Error( 'Unexpected error' );
    
  }

  console.error( _data, _compare, _value );
  
}

function SuccessLog ( _data, _value, _compare ) {

  console.log( '%c<<||-?START?-||>>', 'background-color: black; color: #0FF; padding: 0px 25px;' );
  console.log( '%cAssertion success: ', 'background-color: #333; color: #0F0; padding: 0px 25px;' );
  console.log( _data );
  console.log( _compare );
  console.log( _value );
  console.log( '%c>>||-?END?-||<<', 'background-color: black; color: #FF0; padding: 0px 25px;' );
  
}

Assert.IS = 'I';
Assert.IS_NOT = 'IN';
Assert.IS_SAME_TYPE = 'IST';
Assert.IS_NOT_SAME_TYPE = 'INST';
Assert.IS_INSTANCE_OF = 'IIO';
Assert.IS_NOT_INSTANCE_OF = 'INIO';
Assert.IS_LESS_THAN = 'ILT';
Assert.IS_GREATER_THAN = 'IGT';
Assert.IS_LESS_THAN_OR_EQUAL = 'ILTOE';
Assert.IS_GREATER_THAN_OR_EQUAL = 'IGTOE';

Assert.Assign = function ( _g ) {

  if ( window && !_g ) {

    _g = window;
  
  } else if ( global && !_g ) {

    _g = global;
  
  }

  if ( _g ) {

    _g.IS = Assert.IS;
    _g.IS_NOT = Assert.IS_NOT;
    _g.IS_SAME_TYPE = Assert.IS_SAME_TYPE;
    _g.IS_NOT_SAME_TYPE = Assert.IS_NOT_SAME_TYPE;
    _g.IS_INSTANCE_OF = Assert.IS_INSTANCE_OF;
    _g.IS_NOT_INSTANCE_OF = Assert.IS_NOT_INSTANCE_OF;
    _g.IS_LESS_THAN = Assert.IS_LESS_THAN;
    _g.IS_GREATER_THAN = Assert.IS_GREATER_THAN;
    _g.IS_LESS_THAN_OR_EQUAL = Assert.IS_LESS_THAN_OR_EQUAL;
    _g.IS_GREATER_THAN_OR_EQUAL = Assert.IS_GREATER_THAN_OR_EQUAL;
  
  } else {

    throw new Error( 'No global namespace' );
  
  }

};

Assert.LOG = false;
