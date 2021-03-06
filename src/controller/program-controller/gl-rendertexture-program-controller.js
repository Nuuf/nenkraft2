/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { GLProgramController } from './gl-program-controller';
import { TriRectArray } from '../../math';

export class GLRendertextureProgramController extends GLProgramController {

  /**
   * 
   * @param {WebGLRenderingContext|WebGL2RenderingContext} _gl 
   * @param {object}                                       _un 
   */
  constructor ( _gl, _un ) {

    super( _gl, _un );
    
    this.essenceBuffer = null;
    this.frameBuffer = null;
    this.renderBuffer = null;
    this.texture = null;
    this.w = 0;
    this.h = 0;
    this.Initialise();
  
  }

  /**
   * 
   * @return {void}
   */
  Initialise () {

    const { gl } = this;

    this.essenceBuffer = gl.createBuffer();
    this.frameBuffer = gl.createFramebuffer();
    this.renderBuffer = gl.createRenderbuffer();
    this.texture = gl.createTexture();

    this.AssignAttribute( 'aPosition' );
    this.AssignAttribute( 'aTexCoord' );
    this.AssignUniform( 'uImage' );
    this.AssignUniform( 'uProjection' );
    this.AssignUniform( 'uTranslation' );
    this.AssignUniform( 'uTransformation' );

  }

  /**
   * 
   * @param {number}   _w 
   * @param {number}   _h 
   * @param {integer?} _param 
   * @param {number?}  _ex 
   * @param {number?}  _ey 
   * @param {number?}  _ew 
   * @param {number?}  _eh 
   * 
   * @return {void}
   */
  Config ( _w, _h, _param, _ex, _ey, _ew, _eh ) {

    this.w = _w;
    this.h = _h;

    const { gl } = this;
    let essence;

    if ( _ex != null && _ey != null && _ew != null && _eh != null ) {

      essence = TriRectArray( _ex, _ey, _ew, _eh );
    
    } else {

      essence = TriRectArray( -1, -1, 2, 2 );
    
    }

    _param = _param != null ? _param : gl.LINEAR;

    essence.push.apply( essence, TriRectArray( 0, 0, 1, 1 ) );

    gl.bindTexture( gl.TEXTURE_2D, this.texture );

   	gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, _param );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, _param );
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, this.w, this.h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null );
    gl.bindRenderbuffer( gl.RENDERBUFFER, this.renderBuffer );
    gl.renderbufferStorage( gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.w, this.h );
    gl.bindFramebuffer( gl.FRAMEBUFFER, this.frameBuffer );
    gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0 );
    gl.framebufferRenderbuffer( 
      gl.FRAMEBUFFER, 
      gl.DEPTH_ATTACHMENT,
      gl.RENDERBUFFER, 
      this.renderBuffer
    );
    gl.bindBuffer( gl.ARRAY_BUFFER, this.essenceBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( essence ), gl.STATIC_DRAW );
    gl.bindTexture( gl.TEXTURE_2D, null );
    gl.bindFramebuffer( gl.FRAMEBUFFER, null );
    gl.bindRenderbuffer( gl.RENDERBUFFER, null );
  
  }

  /**
   * 
   * @return {void}
   */
  ExecuteClean () {

    const { gl } = this;
    const { attributes } = this;

    if ( this !== GLProgramController.LAST_USED_CONTROLLER ) {

      gl.useProgram( this.program );

      gl.activeTexture( gl.TEXTURE0 );
      gl.bindTexture( gl.TEXTURE_2D, this.texture );
      gl.bindBuffer( gl.ARRAY_BUFFER, this.essenceBuffer );
      gl.enableVertexAttribArray( attributes.aPosition );
      gl.vertexAttribPointer( attributes.aPosition, 2, gl.FLOAT, false, 0, 0 );
      gl.enableVertexAttribArray( attributes.aTexCoord );
      gl.vertexAttribPointer( attributes.aTexCoord, 2, gl.FLOAT, false, 0, 48 );
      gl.uniform1i( this.uniforms.uImage, 0 );

      GLProgramController.LAST_USED_CONTROLLER = this;
    
    }

    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 6 );
  
  }

  /**
   * 
   * @param {Float32Array} _projection 
   * @param {Float32Array} _translation 
   * @param {Float32Array} _transformation 
   * 
   * @return {void}
   */
  Execute ( _projection, _translation, _transformation ) {

    const { gl } = this;
    const { attributes } = this;
    const { uniforms } = this;

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

    gl.uniformMatrix3fv( uniforms.uProjection, false, _projection );
    gl.uniformMatrix3fv( uniforms.uTranslation, false, _translation );
    gl.uniformMatrix3fv( uniforms.uTransformation, false, _transformation );

    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 6 );
  
  }

}
