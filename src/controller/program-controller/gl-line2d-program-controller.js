/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { GLProgramController } from './gl-program-controller';
import { LINE2D } from '../../shader';
import { Color } from '../../utility/color';

export class GLLine2DProgramController extends GLProgramController {

  constructor ( _gl ) {

    super( _gl, LINE2D );
    this.essenceBuffer = null;
    this.vertices = null;
    this.color = null;
    this.Initialise();
  
  }

  Initialise () {

    const gl = this.gl;

    this.essenceBuffer = gl.createBuffer();
    this.vertices = new Float32Array( [ -1, 0, 1, 0 ] );
    this.color = new Color();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.essenceBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, null );
    this.AssignAttribute( 'aPosition' );
    this.AssignUniform( 'uProjection' );
    this.AssignUniform( 'uColor' );
  
  }

  Execute ( _projection, _s, _e ) {

    const gl = this.gl;
    const attributes = this.attributes;
    const uniforms = this.uniforms;
    const vertices = this.vertices;
    const channel = this.color.channel;

    vertices[ 0 ] = _s.x;
    vertices[ 1 ] = _s.y;
    vertices[ 2 ] = _e.x;
    vertices[ 3 ] = _e.y;

    if ( this !== super.LAST_USED_CONTROLLER ) {

      gl.useProgram( this.program );
      super.LAST_USED_CONTROLLER = this;
    
    }

    gl.bindBuffer( gl.ARRAY_BUFFER, this.essenceBuffer );
    gl.bufferSubData( gl.ARRAY_BUFFER, 0, vertices );
    gl.enableVertexAttribArray( attributes.aPosition );
    gl.vertexAttribPointer( attributes.aPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.uniformMatrix3fv( uniforms.uProjection, false, _projection );
    gl.uniform4f( uniforms.uColor, channel[ 0 ], channel[ 1 ], channel[ 2 ], channel[ 3 ] );
    gl.drawArrays( gl.LINES, 0, 2 );
  
  }

}
