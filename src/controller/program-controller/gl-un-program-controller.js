/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { GLProgramController } from './gl-program-controller';
import { TriRectArray } from '../../math';

export class GLUnProgramController extends GLProgramController {

  constructor ( _gl, _un ) {

    super( _gl, _un );
    
    this.essenceBuffer = null;
    this.vertices = null;
    this.Initialise();
  
  }

  Initialise () {

    const gl = this.gl;

    this.essenceBuffer = gl.createBuffer();
    this.vertices = new Float32Array( TriRectArray( 0, 0, 1, 1 ) );
    gl.bindBuffer( gl.ARRAY_BUFFER, this.essenceBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, null );
    this.AssignAttribute( 'a_v2Position' );
    this.AssignUniform( 'u_m3Projection' );
    this.AssignUniform( 'u_fTime' );
    this.AssignUniform( 'u_v2Resolution' );
  
  }

  Execute ( _projection, _x, _y, _w, _h, _time ) {

    const gl = this.gl;
    const attributes = this.attributes;
    const uniforms = this.uniforms;
    const vertices = this.vertices;

    TriRectArray( _x, _y, _w, _h, vertices );

    if ( this !== GLProgramController.LAST_USED_CONTROLLER ) {

      gl.useProgram( this.program );
      GLProgramController.LAST_USED_CONTROLLER = this;
    
    }

    gl.bindBuffer( gl.ARRAY_BUFFER, this.essenceBuffer );
    gl.bufferSubData( gl.ARRAY_BUFFER, 0, vertices );
    gl.enableVertexAttribArray( attributes.a_v2Position );
    gl.vertexAttribPointer( attributes.a_v2Position, 2, gl.FLOAT, false, 0, 0 );
    gl.uniformMatrix3fv( uniforms.u_m3Projection, false, _projection );
    gl.uniform2f( uniforms.u_v2Resolution, _w, _h );
    gl.uniform1f( uniforms.u_fTime, _time );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 6 );
  
  }

}
