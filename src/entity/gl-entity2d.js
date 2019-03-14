/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { CoreEntity2D } from './core-entity2d';

export class GLEntity2D extends CoreEntity2D {

  /**
   * 
   * @param {number}            _x 
   * @param {number}            _y 
   * @param {ProgramController} _pc 
   */
  constructor ( _x, _y, _pc ) {

    super( _x, _y );
    
    this.programController = _pc;
    this.w = 128;
    this.h = 128;
    this.time = 0;
    this.timeInc = 0.1;
    this.transformShouldUpdate = false;
    this.transformAutomaticUpdate = false;

  }

  /**
   * 
   * @return {void}
   */
  GLPreRender () {

    return;
  
  }

  /**
   * 
   * @return {void}
   */
  GLPostRender () {

    return;
  
  }

  /**
   * 
   * @param {WebGLRenderingContext|WebGL2RenderingContext} _gl 
   * 
   * @return {void}
   */
  GLRender ( _gl ) {

    this.GLPreRender( _gl );

    this.ProcessTransform( this.parent );

    const bounds = this.bounds.local;

    this.programController.Execute(
      this.transform.globalTransform.AsArray( true ),
      bounds.tl.x, bounds.tl.y, bounds.w, bounds.h,
      this.time
    );

    this.time += this.timeInc;

    this.GLPostRender( _gl );

  }

}
