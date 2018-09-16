/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { GLProgramController } from './gl-program-controller';
import { TEXTURE_2D } from '../../shader';
import { TriRectArray } from '../../math';

export class GLTexture2DProgramController extends GLProgramController {

  constructor ( _gl ) {

    super( _gl, TEXTURE_2D );
    this.originalTexture0 = null;
    this.boundTexture0 = null;
    this.essenceBuffer0 = null;
    this.originalTexture1 = null;
    this.boundTexture1 = null;
    this.essenceBuffer1 = null;
    this.originalTexture2 = null;
    this.boundTexture2 = null;
    this.essenceBuffer2 = null;
    this.originalTexture3 = null;
    this.boundTexture3 = null;
    this.essenceBuffer3 = null;
    this.lastUsedUnit = 0;
    this.Initialise();
  
  }

  Initialise () {

    this.AssignAttribute( 'aPosition0' );
    this.AssignAttribute( 'aTexCoord0' );
    this.AssignAttribute( 'aPosition1' );
    this.AssignAttribute( 'aTexCoord1' );
    this.AssignAttribute( 'aPosition2' );
    this.AssignAttribute( 'aTexCoord2' );
    this.AssignAttribute( 'aPosition3' );
    this.AssignAttribute( 'aTexCoord3' );
    this.AssignUniform( 'uImage' );
    this.AssignUniform( 'uUnitId' );
    this.AssignUniform( 'uProjection' );
    this.AssignUniform( 'uTranslation' );
    this.AssignUniform( 'uTransformation' );
    this.AssignUniform( 'uTint' );
  
  }

  BindBasicTexture ( _texture, _unitId ) {

    const gl = this.gl;
    const essence = TriRectArray( 0, 0, _texture.w, _texture.h );

    if ( _unitId == null || _unitId < 0 || _unitId > 3 ) _unitId = 0;

    _texture.uniformId = _unitId;
    this['originalTexture' + _unitId] = _texture;
    this['boundTexture' + _unitId] = gl.createTexture();
    this['essenceBuffer' + _unitId] = gl.createBuffer();

    essence.push.apply( essence, TriRectArray( 0, 0, 1, 1 ) );

    gl.bindTexture( gl.TEXTURE_2D, this['boundTexture' + _unitId] );
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, _texture.image );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
    gl.bindBuffer( gl.ARRAY_BUFFER, this['essenceBuffer' + _unitId] );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( essence ), gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, null );
    gl.bindTexture( gl.TEXTURE_2D, null );
  
  }

  BindUnit ( _gl, _uniforms, _attributes, _unitId ) {

    if ( this['boundTexture' + _unitId] == null ) return;

    _gl.activeTexture( _gl.TEXTURE0 + _unitId );
    _gl.bindTexture( _gl.TEXTURE_2D, this['boundTexture' + _unitId] );
    _gl.bindBuffer( _gl.ARRAY_BUFFER, this['essenceBuffer' + _unitId] );
    _gl.enableVertexAttribArray( _attributes['aPosition' + _unitId] );
    _gl.vertexAttribPointer( _attributes['aPosition' + _unitId], 2, _gl.FLOAT, false, 0, 0 );
    _gl.enableVertexAttribArray( _attributes['aTexCoord' + _unitId] );
    _gl.vertexAttribPointer( _attributes['aTexCoord' + _unitId], 2, _gl.FLOAT, false, 0, 48 );
  
  }

  Execute ( _projection, _translation, _transformation, _tint, _unitId ) {

    const gl = this.gl;
    const attributes = this.attributes;
    const uniforms = this.uniforms;

    if ( this !== super.LAST_USED_CONTROLLER ) {

      gl.useProgram( this.program );

      this.BindUnit( gl, uniforms, attributes, 0 );
      this.BindUnit( gl, uniforms, attributes, 1 );
      this.BindUnit( gl, uniforms, attributes, 2 );
      this.BindUnit( gl, uniforms, attributes, 3 );

      gl.uniform1f( uniforms.uUnitId, _unitId );
      gl.uniform1i( uniforms.uImage, _unitId );
      super.LAST_USED_CONTROLLER = this;
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
