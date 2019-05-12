/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { BasicTexture2D } from '../../texture';
import { 
  GLDynamicTexture2DProgramController,
  GLTexture2DProgramController 
} from '../../controller/program-controller';
import { 
  IsInteger, IsArray, IsObject,
  ValidateWithSchema
} from '../../utility';
import { Frame } from '../../animator/frame';

function IsNumber ( _value ) {

  return typeof _value === 'number';

}

function IsPoint ( _value ) {

  return (
    IsObject( _value ) &&
    IsNumber( _value.x ) &&
    IsNumber( _value.y )
  );

}

function IsBoolean ( _value ) {

  return typeof _value === 'boolean';

}

const MIN_MAX_SCHEMA = {
  min: {
    required: true,
    typeCheck: IsNumber
  },
  max: {
    required: true,
    typeCheck: IsNumber
  }
};

function typeCheckMinMax ( _value ) {

  if ( IsObject( _value ) === true ) {

    return ValidateWithSchema( _value, MIN_MAX_SCHEMA );
      
  }

  return IsNumber( _value );

}

const POINT_SCHEMA = {
  x: {
    required: false,
    typeCheck: typeCheckMinMax
  },
  y: {
    required: false,
    typeCheck: typeCheckMinMax
  },
  xy: {
    required: false,
    typeCheck: typeCheckMinMax
  },
  points: {
    required: false,
    typeCheck: function ( _value ) {

      if ( IsArray( _value ) === false ) {

        return false;

      }

      for ( var i = 0; i < _value.length; ++i ) {

        if ( IsPoint( _value[ i ] ) === false ) {

          return false;
        
        }

      }

      return true;

    }
  },
  moduloWrapper: {
    required: false,
    typeCheck: IsInteger
  },
  indexGap: {
    required: false,
    typeCheck: IsInteger
  },
  scalar: {
    required: false,
    typeCheck: typeCheckPoint
  }
};

function typeCheckPoint ( _value ) {

  if ( IsObject( _value ) === false ) {

    return false; 

  }

  return ValidateWithSchema( _value, POINT_SCHEMA );

}

const OSCILLATION_PROPS_SCHEMA = {
  from: {
    required: true,
    typeCheck: typeCheckMinMax
  },
  to: {
    required: true,
    typeCheck: typeCheckMinMax
  },
  amplitude: {
    required: true,
    typeCheck: typeCheckMinMax
  }
};

function typeCheckOscillationProps ( _value ) {
  
  if ( IsObject( _value ) === false ) {

    return false; 

  }

  return ValidateWithSchema( _value, OSCILLATION_PROPS_SCHEMA );

}

const OSCILLATION_PROP_POINT_SCHEMA = {
  x: {
    required: false,
    typeCheck: _value => {

      return typeCheckOscillationProps( _value );
    
    }
  },
  y: {
    required: false,
    typeCheck: typeCheckOscillationProps
  }
};

function typeCheckOscillationPropPoint ( _value ) {

  if ( IsObject( _value ) === false ) {

    return false; 

  }

  return ValidateWithSchema( _value, OSCILLATION_PROP_POINT_SCHEMA ); 

}

const OSCILLATION_SCHEMA = {
  offset: {
    required: false,
    typeCheck: typeCheckMinMax
  },
  torque: {
    required: false,
    typeCheck: typeCheckOscillationProps
  },
  spin: {
    required: false,
    typeCheck: typeCheckOscillationProps
  },
  velocity: {
    required: false,
    typeCheck: typeCheckOscillationPropPoint
  },
  gravity: {
    required: false,
    typeCheck: typeCheckOscillationPropPoint
  },
  acceleration: {
    required: false,
    typeCheck: typeCheckOscillationPropPoint
  },
  growth: {
    required: false,
    typeCheck: typeCheckOscillationPropPoint
  }
};

function typeCheckOscillation ( _value ) {
  
  if ( IsObject( _value ) === false ) {

    return false; 

  }

  return ValidateWithSchema( _value, OSCILLATION_SCHEMA );

}

const ROOT_SCHEMA = {
  amount: {
    required: true,
    typeCheck: IsInteger
  },
  texture: {
    required: true,
    typeCheck: function ( _value ) {

      return ( 
        _value instanceof BasicTexture2D ||
        _value instanceof GLDynamicTexture2DProgramController ||
        _value instanceof GLTexture2DProgramController
      );
    
    }
  },
  unitId: {
    required: false,
    typeCheck: IsInteger
  },
  anchor: {
    required: false,
    typeCheck: IsPoint
  },
  frames: {
    required: false,
    typeCheck: function ( _value ) {

      if ( IsArray( _value ) === false ) {

        return false;
      
      }

      for ( var i = 0; i < _value.length; ++i ) {
        
        if ( !( _value[ i ] instanceof Frame ) ) {

          return false;
        
        }

      }

      return true;

    }
  },
  position: {
    required: false,
    typeCheck: typeCheckPoint
  },
  velocity: {
    require: false,
    typeCheck: typeCheckPoint
  },
  gravity: {
    require: false,
    typeCheck: typeCheckPoint
  },
  acceleration: {
    require: false,
    typeCheck: typeCheckPoint
  },
  growth: {
    require: false,
    typeCheck: typeCheckPoint
  },
  scale: {
    require: false,
    typeCheck: typeCheckPoint
  },
  rotation: {
    required: false,
    typeCheck: typeCheckMinMax
  },
  lifespan: {
    required: false,
    typeCheck: typeCheckMinMax
  },
  torque: {
    required: false,
    typeCheck: typeCheckMinMax
  },
  spin: {
    required: false,
    typeCheck: typeCheckMinMax
  },
  fade: {
    required: false,
    typeCheck: IsBoolean
  },
  deflate: {
    required: false,
    typeCheck: IsBoolean
  },
  decelerate: {
    required: false,
    typeCheck: IsBoolean
  },
  oscillation: {
    required: false,
    typeCheck: typeCheckOscillation
  }
};

export class Data {

  constructor ( _options ) {

    if ( ValidateWithSchema( _options, ROOT_SCHEMA ) ) {

      for ( var key in _options ) {

        this[ key ] = _options[ key ];
      
      }

    }
  
  }

  static Validate ( _options ) {

    return new Data( _options );

  }

}
