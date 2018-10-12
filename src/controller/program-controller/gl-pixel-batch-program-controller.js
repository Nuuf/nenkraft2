/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { GLProgramController } from './gl-program-controller';
import { PIXEL_BATCH } from '../../shader';

export class GLPixelBatchProgramController extends GLProgramController {

  constructor ( _gl ) {

    super( _gl, PIXEL_BATCH );
    this.dataBuffer = null;
    this.previousNumberOfElements = 0;
    this.Initialise();
  
  }

  Initialise () {

    const gl = this.gl;

    this.dataBuffer = gl.createBuffer();
    this.AssignAttribute( 'aProjection1' );
    this.AssignAttribute( 'aProjection2' );
    this.AssignAttribute( 'aProjection3' );
    this.AssignAttribute( 'aPosition' );
    this.AssignAttribute( 'aColor' );
    this.AssignAttribute( 'aPointSize' );
  
  }

  Execute ( _data, _numElements ) {

    const gl = this.gl;
    const attributes = this.attributes;

    if ( GLProgramController.LAST_USED_CONTROLLER !== this ) {

      gl.useProgram( this.program );
      GLProgramController.LAST_USED_CONTROLLER = this;
    
    }

    gl.bindBuffer( gl.ARRAY_BUFFER, this.dataBuffer );

    if ( _numElements !== this.previousNumberOfElements ) {

      gl.bufferData( gl.ARRAY_BUFFER, _data, gl.DYNAMIC_DRAW );
    
    } else {

      gl.bufferSubData( gl.ARRAY_BUFFER, 0, _data );
    
    }

    gl.enableVertexAttribArray( attributes.aProjection1 );
    gl.vertexAttribPointer( attributes.aProjection1, 3, gl.FLOAT, false, 64, 0 );
    gl.enableVertexAttribArray( attributes.aProjection2 );
    gl.vertexAttribPointer( attributes.aProjection2, 3, gl.FLOAT, false, 64, 12 );
    gl.enableVertexAttribArray( attributes.aProjection3 );
    gl.vertexAttribPointer( attributes.aProjection3, 3, gl.FLOAT, false, 64, 24 );
    gl.enableVertexAttribArray( attributes.aPosition );
    gl.vertexAttribPointer( attributes.aPosition, 2, gl.FLOAT, false, 64, 36 );
    gl.enableVertexAttribArray( attributes.aColor );
    gl.vertexAttribPointer( attributes.aColor, 4, gl.FLOAT, false, 64, 44 );
    gl.enableVertexAttribArray( attributes.aPointSize );
    gl.vertexAttribPointer( attributes.aPointSize, 1, gl.FLOAT, false, 64, 60 );
    gl.drawArrays( gl.POINTS, 0, _numElements );
    this.previousNumberOfElements = _numElements;
  
  }

}
