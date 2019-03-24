/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Ticker } from '../time/ticker/ticker';
import { Stage2D } from './stage2d';

export class Stadium {

  /**
   * 
   * @param {object?} _options 
   */
  constructor ( _options ) {

    this.stages = [];
    this.currentStage = null;
    this.onlyCurrent = false;
    this.options = null;
    this.ticker = new Ticker( this.Process.bind( this ), 60, _options.halt );
  
    this.SetOptions( _options );

  }

  /**
   * 
   * @param {object?} _options 
   * 
   * @return {this}
   */
  SetOptions ( _options ) {
      
    if ( _options != null ) {

      this.options = _options; 
      
    }

    return this;
  
  }

  /**
   * 
   * @param {object?} _options 
   * 
   * @return {Stage2D}
   */
  CreateStage2D ( _options ) {

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

  /**
   * 
   * @return {Stage2D[]}
   */
  GetStages () {

    const stages = this.stages;
    const rStages = [];

    for ( var i = 0; i < stages.length; ++i ) {

      for ( var j = 0; j < arguments.length; ++j ) {

        if ( stages[ i ].id === arguments[ j ] ) {

          rStages.push( stages[ i ] );
        
        } 
      
      }
    
    }

    return rStages;
  
  }

  /**
   * 
   * @param {number} _delta 
   * 
   * @return {void}
   */
  Process ( _delta ) {

    const stages = this.stages;

    for ( var i = 0; i < stages.length; ++i ) {

      stages[ i ].MixedProcess( _delta );
      
    }
  
  }

  /**
   * 
   * @return {this}
   */
  Destroy () {

    const stages = this.stages;

    for ( var i = 0; i < stages.length; ++i ) {

      stages[ i ].Destroy();

    }

    this.ticker.Stop();

    return this;

  }

}
