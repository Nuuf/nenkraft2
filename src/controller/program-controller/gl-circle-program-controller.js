/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { GLProgramController } from './gl-program-controller';
import { CIRCLE } from '../../shader';
import { Color } from '../../utility/color';
import { TriRectArray } from '../../math';

export class GLCircleProgramController extends GLProgramController {

  /**
   * 
   * @param {WebGLRenderingContext|WebGL2RenderingContext} _gl 
   */
  constructor ( _gl ) {

    super( _gl, CIRCLE );
    
    this.essenceBuffer = null;
    this.vertices = null;
    this.fillColor = null;
    this.outlineColor = null;
    this.outline = 5.0;
    this.Initialise();
  
  }

  /**
   * 
   * @return {void}
   */
  Initialise () {

    const gl = this.gl;

    this.essenceBuffer = gl.createBuffer();
    this.vertices = new Float32Array( TriRectArray( 0, 0, 1, 1 ) );
    this.fillColor = new Color();
    this.outlineColor = new Color();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.essenceBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, null );
    this.AssignAttribute( 'aPosition' );
    this.AssignUniform( 'uProjection' );
    this.AssignUniform( 'uFillColor' );
    this.AssignUniform( 'uOutlineColor' );
    this.AssignUniform( 'uRadius' );
    this.AssignUniform( 'uOutline' );
  
  }

  /**
   * 
   * @param {Matrix2D} _projection 
   * @param {number}   _x 
   * @param {number}   _y 
   * @param {number}   _radius 
   * 
   * @return {void}
   */
  Execute ( _projection, _x, _y, _radius ) {

    const gl = this.gl;
    const attributes = this.attributes;
    const uniforms = this.uniforms;
    const vertices = this.vertices;
    const fillChannel = this.fillColor.channel;
    const outlineChannel = this.outlineColor.channel;
    
    TriRectArray( _x - _radius, _y - _radius, _radius * 2, _radius * 2, vertices );

    if ( this !== GLProgramController.LAST_USED_CONTROLLER ) {

      gl.useProgram( this.program );
      GLProgramController.LAST_USED_CONTROLLER = this;
    
    }

    gl.bindBuffer( gl.ARRAY_BUFFER, this.essenceBuffer );
    gl.bufferSubData( gl.ARRAY_BUFFER, 0, vertices );
    gl.enableVertexAttribArray( attributes.aPosition );
    gl.vertexAttribPointer( attributes.aPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.uniformMatrix3fv( uniforms.uProjection, false, _projection );
    gl.uniform4f( 
      uniforms.uFillColor,
      fillChannel[ 0 ],
      fillChannel[ 1 ],
      fillChannel[ 2 ],
      fillChannel[ 3 ]
    );
    gl.uniform4f( 
      uniforms.uOutlineColor,
      outlineChannel[ 0 ],
      outlineChannel[ 1 ],
      outlineChannel[ 2 ],
      outlineChannel[ 3 ]
    );
    gl.uniform1f( uniforms.uOutline, this.outline );
    gl.uniform1f( uniforms.uRadius, _radius );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 6 );
  
  }

}
