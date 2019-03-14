/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { GLProgramController } from './gl-program-controller';
import { TEXTURE_2D } from '../../shader';
import { TriRectArray } from '../../math';

export class GLTexture2DProgramController extends GLProgramController {

  /**
   * 
   * @param {WebGLRenderingContext|WebGL2RenderingContext} _gl 
   */
  constructor ( _gl ) {

    super( _gl, TEXTURE_2D );
    
    this.originalTexture = null;
    this.texture = null;
    this.essenceBuffer = null;
    this.Initialise();
  
  }

  /**
   * 
   * @return {void}
   */
  Initialise () {

    const gl = this.gl;

    this.texture = gl.createTexture();
    this.essenceBuffer = gl.createBuffer();

    this.AssignAttribute( 'aPosition' );
    this.AssignAttribute( 'aTexCoord' );
    this.AssignUniform( 'uImage' );
    this.AssignUniform( 'uProjection' );
    this.AssignUniform( 'uTranslation' );
    this.AssignUniform( 'uTransformation' );
    this.AssignUniform( 'uTint' );
  
  }

  /**
   * 
   * @param {BasicTexture2D} _texture 
   * @param {integer?}       _param 
   * 
   * @return {void}
   */
  BindBasicTexture ( _texture, _param ) {

    const gl = this.gl;
    const essence = TriRectArray( 0, 0, _texture.w, _texture.h );

    _param = _param != null ? _param : gl.LINEAR;

    this.originalTexture = _texture;

    essence.push.apply( essence, TriRectArray( 0, 0, 1, 1 ) );

    gl.bindTexture( gl.TEXTURE_2D, this.texture );
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, _texture.image );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, _param );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, _param );
    gl.bindBuffer( gl.ARRAY_BUFFER, this.essenceBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( essence ), gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, null );
    gl.bindTexture( gl.TEXTURE_2D, null );
  
  }

  /**
   * 
   * @param {Matrix2D} _projection 
   * @param {Matrix2D} _translation 
   * @param {Matrix2D} _transformation 
   * @param {Color}    _tint 
   * 
   * @return {void}
   */
  Execute ( _projection, _translation, _transformation, _tint ) {

    const gl = this.gl;
    const attributes = this.attributes;
    const uniforms = this.uniforms;

    if ( this !== GLProgramController.LAST_USED_CONTROLLER ) {

      gl.useProgram( this.program );

      gl.activeTexture( gl.TEXTURE0 );
      gl.bindTexture( gl.TEXTURE_2D, this.texture );
      gl.bindBuffer( gl.ARRAY_BUFFER, this.essenceBuffer );
      gl.enableVertexAttribArray( attributes.aPosition );
      gl.vertexAttribPointer( attributes.aPosition, 2, gl.FLOAT, false, 0, 0 );
      gl.enableVertexAttribArray( attributes.aTexCoord );
      gl.vertexAttribPointer( attributes.aTexCoord, 2, gl.FLOAT, false, 0, 48 );
      gl.uniform1i( uniforms.uImage, 0 );

      GLProgramController.LAST_USED_CONTROLLER = this;
    
    }

    gl.uniform4fv( uniforms.uTint, _tint );
    gl.uniformMatrix3fv( uniforms.uProjection, false, _projection );
    gl.uniformMatrix3fv( uniforms.uTranslation, false, _translation );
    gl.uniformMatrix3fv( uniforms.uTransformation, false, _transformation );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 6 );
  
  }

}
