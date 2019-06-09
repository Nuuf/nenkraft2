/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { GLProgramController } from './gl-program-controller';
import { LINE2D } from '../../shader';
import { Color } from '../../utility/color';

export class GLLine2DProgramController extends GLProgramController {

  /**
   * 
   * @param {WebGLRenderingContext|WebGL2RenderingContext} _gl 
   */
  constructor ( _gl ) {

    super( _gl, LINE2D );
    
    this.essenceBuffer = null;
    this.vertices = null;
    this.color = null;
    this.Initialise();
  
  }

  /**
   * 
   * @return {void}
   */
  Initialise () {

    const { gl } = this;

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

  /**
   * 
   * @param {matrix2D} _projection 
   * @param {Vector2D} _s 
   * @param {Vector2D} _e 
   * 
   * @return {void}
   */
  Execute ( _projection, _s, _e ) {

    const { gl } = this;
    const { attributes } = this;
    const { uniforms } = this;
    const { vertices } = this;
    const { channel } = this.color;

    vertices[ 0 ] = _s.x;
    vertices[ 1 ] = _s.y;
    vertices[ 2 ] = _e.x;
    vertices[ 3 ] = _e.y;

    if ( this !== GLProgramController.LAST_USED_CONTROLLER ) {

      gl.useProgram( this.program );
      GLProgramController.LAST_USED_CONTROLLER = this;
    
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
