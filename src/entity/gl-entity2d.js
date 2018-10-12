/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { CoreEntity2D } from './core-entity2d';

export class GLEntity2D extends CoreEntity2D {

  constructor ( _x, _y, _pc ) {

    super( _x, _y );
    this.programController = _pc;
    this.transformShouldUpdate = false;
    this.transformAutomaticUpdate = false;
    this.w = 128;
    this.h = 128;
    this.time = 0;
    this.timeInc = 0.1;

  }

  GLPreDraw () {

    return;
  
  }

  GLDraw ( _gl ) {

    this.GLPreDraw( _gl );

    if ( this.transformShouldUpdate === true ) {

      this.UpdateTransform();
      if ( this.transformAutomaticUpdate === false ) this.transformShouldUpdate = false;
      
    }

    const bounds = this.bounds;

    this.programController.Execute(
      this.transform.globalTransform.AsArray( true ),
      bounds.tl.x, bounds.tl.y, bounds.w, bounds.h,
      this.time
    );

    this.time += this.timeInc;

  }

}
