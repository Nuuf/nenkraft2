/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Ticker } from '../time/ticker/ticker';
import { Stage2D } from './stage2d';

export class Stadium2D {

  constructor ( _options ) {

    this.stages = [];
    this.currentStage = null;
    this.onlyCurrent = false;
    this.options = null;
    this.ticker = new Ticker( this.Process.bind( this ), 60, _options.halt );
  
    this.SetOptions( _options );

  }

  SetOptions ( _options ) {
      
    if ( _options != null ) {

      this.options = _options; 
      
    }
  
  }

  CreateStage ( _options ) {

    let id;
    const canvas = document.createElement( 'canvas' );

    if ( typeof _options === 'string' ) {

      id = _options;
      _options = null;
    
    }

    if ( _options == null ) _options = this.options;
    if ( _options == null ) _options = {};

    if ( id !== null ) {

      _options.id = id;
    
    }

    if ( _options.width != null ) canvas.width = _options.width;
    if ( _options.height != null ) canvas.height = _options.height;
    if ( _options.className != null ) canvas.className = _options.className;

    if ( _options.rootNode == null ) _options.rootNode = document.body;

    _options.rootNode.appendChild( canvas );
    _options.canvas = canvas;
    _options.noTicker = true;
    _options.halt = true;

    const stage = new Stage2D( _options );

    _options.id = null;
    _options.canvas = null;

    this.stages.push( stage );

    return stage;
  
  }

  GetStages () {

    let i = 0;
    let j = 0;
    const stages = this.stages;
    const rStages = [];
    const l = stages.length;
    let stage = stages[i];

    for ( ; i < l; stage = stages[++i] ) {

      stage = stages[i];

      for ( ; j < arguments.length; ++j ) {

        if ( stage.id === arguments[j] ) {

          rStages.push( stage );
        
        } 
      
      }
    
    }

    return rStages;
  
  }

  Process ( _delta ) {

    let i = 0;
    const stages = this.stages;
    const l = stages.length;

    for ( ; i < l; ++i ) {

      stages[i].MixedProcess( _delta );
      
    }
  
  }

}
