/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { GLProgramController } from './gl-program-controller';
import { TEXTURE_2D } from '../../shader';
import { TriRectArray } from '../../math';

export class GLTexture2DProgramController extends GLProgramController {

  constructor ( _gl ) {

    super( _gl, TEXTURE_2D );
    this.originalTexture = null;
    this.boundTexture = null;
    this.essenceBuffer = null;
    this.Initialise();
  
  }

  Initialise () {

    this.AssignAttribute( 'aPosition' );
    this.AssignAttribute( 'aTexCoord' );
    this.AssignUniform( 'uImage' );
    this.AssignUniform( 'uUnitId' );
    this.AssignUniform( 'uProjection' );
    this.AssignUniform( 'uTranslation' );
    this.AssignUniform( 'uTransformation' );
    this.AssignUniform( 'uTint' );
  
  }

  BindBasicTexture ( _texture, _param ) {

    const gl = this.gl;
    const essence = TriRectArray( 0, 0, _texture.w, _texture.h );

    _param = _param != null ? _param : gl.LINEAR;

    this[ 'originalTexture' ] = _texture;
    this[ 'boundTexture' ] = gl.createTexture();
    this[ 'essenceBuffer' ] = gl.createBuffer();

    essence.push.apply( essence, TriRectArray( 0, 0, 1, 1 ) );

    gl.bindTexture( gl.TEXTURE_2D, this[ 'boundTexture' ] );
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, _texture.image );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, _param );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, _param );
    gl.bindBuffer( gl.ARRAY_BUFFER, this[ 'essenceBuffer' ] );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( essence ), gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, null );
    gl.bindTexture( gl.TEXTURE_2D, null );
  
  }

  Execute ( _projection, _translation, _transformation, _tint, _unitId ) {

    const gl = this.gl;
    const attributes = this.attributes;
    const uniforms = this.uniforms;

    if ( this !== GLProgramController.LAST_USED_CONTROLLER ) {

      gl.useProgram( this.program );

      gl.activeTexture( gl.TEXTURE0 );
      gl.bindTexture( gl.TEXTURE_2D, this[ 'boundTexture' ] );
      gl.bindBuffer( gl.ARRAY_BUFFER, this[ 'essenceBuffer' ] );
      gl.enableVertexAttribArray( attributes[ 'aPosition' ] );
      gl.vertexAttribPointer( attributes[ 'aPosition' ], 2, gl.FLOAT, false, 0, 0 );
      gl.enableVertexAttribArray( attributes[ 'aTexCoord' ] );
      gl.vertexAttribPointer( attributes[ 'aTexCoord' ], 2, gl.FLOAT, false, 0, 48 );

      gl.uniform1f( uniforms.uUnitId, _unitId );
      gl.uniform1i( uniforms.uImage, _unitId );
      GLProgramController.LAST_USED_CONTROLLER = this;
      this.lastUsedUnit = _unitId;
    
    } else if ( _unitId !== this.lastUsedUnit ) {

      gl.uniform1f( uniforms.uUnitId, _unitId );
      gl.uniform1i( uniforms.uImage, _unitId );
      this.lastUsedUnit = _unitId;
    
    }

    gl.uniform4fv( uniforms.uTint, _tint );
    gl.uniformMatrix3fv( uniforms.uProjection, false, _projection );
    gl.uniformMatrix3fv( uniforms.uTranslation, false, _translation );
    gl.uniformMatrix3fv( uniforms.uTransformation, false, _transformation );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 6 );
  
  }

}
