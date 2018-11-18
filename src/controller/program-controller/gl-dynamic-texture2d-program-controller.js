/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { GLProgramController } from './gl-program-controller';
import { DynamicTEXTURE_2D } from '../../shader';
import { TriRectArray } from '../../math';

export class GLDynamicTexture2DProgramController extends GLProgramController {

  constructor ( _gl, _units ) {

    if ( _gl.getParameter( _gl.MAX_VERTEX_ATTRIBS ) * 0.5 < _units ) {

      console.error( _gl.getParameter( _gl.MAX_VERTEX_ATTRIBS ) * 0.5, 'MAX' );
    
    }

    super( _gl, DynamicTEXTURE_2D( _units ) );
    
    this.units = _units;
    this.originalTextures = [];
    this.textures = [];
    this.essenceBuffers = [];
    this.lastUsedUnit = 0;
    this.Initialise();
  
  }

  Initialise () {

    for ( var i = 0; i < this.units; ++i ) {

      this.AssignAttribute( 'aPosition' + i );
      this.AssignAttribute( 'aTexCoord' + i );

    }

    this.AssignUniform( 'uImage' );
    this.AssignUniform( 'uUnitId' );
    this.AssignUniform( 'uProjection' );
    this.AssignUniform( 'uTranslation' );
    this.AssignUniform( 'uTransformation' );
    this.AssignUniform( 'uTint' );
  
  }

  BindBasicTexture ( _texture, _unitId, _param ) {

    const gl = this.gl;
    const essence = TriRectArray( 0, 0, _texture.w, _texture.h );

    if ( _unitId == null || _unitId < 0 || _unitId > 3 ) _unitId = 0;
    _param = _param != null ? _param : gl.LINEAR;

    _texture.uniformId = _unitId;
    this.originalTextures[ _unitId ] = _texture;
    this.textures[ _unitId ] = gl.createTexture();
    this.essenceBuffers[ _unitId ] = gl.createBuffer();

    essence.push.apply( essence, TriRectArray( 0, 0, 1, 1 ) );

    gl.bindTexture( gl.TEXTURE_2D, this.textures[ _unitId ] );
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, _texture.image );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, _param );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, _param );
    gl.bindBuffer( gl.ARRAY_BUFFER, this.essenceBuffers[ _unitId ] );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( essence ), gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, null );
    gl.bindTexture( gl.TEXTURE_2D, null );
  
  }

  BindUnit ( _gl, _uniforms, _attributes, _unitId ) {

    if ( this.textures[ _unitId ] == null ) return;

    _gl.activeTexture( _gl.TEXTURE0 + _unitId );
    _gl.bindTexture( _gl.TEXTURE_2D, this.textures[ _unitId ] );
    _gl.bindBuffer( _gl.ARRAY_BUFFER, this.essenceBuffers[ _unitId ] );
    _gl.enableVertexAttribArray( _attributes[ 'aPosition' + _unitId ] );
    _gl.vertexAttribPointer( _attributes[ 'aPosition' + _unitId ], 2, _gl.FLOAT, false, 0, 0 );
    _gl.enableVertexAttribArray( _attributes[ 'aTexCoord' + _unitId ] );
    _gl.vertexAttribPointer( _attributes[ 'aTexCoord' + _unitId ], 2, _gl.FLOAT, false, 0, 48 );
  
  }

  Execute ( _projection, _translation, _transformation, _tint, _unitId ) {

    const gl = this.gl;
    const attributes = this.attributes;
    const uniforms = this.uniforms;

    if ( this !== GLProgramController.LAST_USED_CONTROLLER ) {

      gl.useProgram( this.program );

      for ( var i = 0; i < this.units; ++i ) {

        this.BindUnit( gl, uniforms, attributes, i );
      
      }
      
      gl.uniform1i( uniforms.uUnitId, _unitId );
      gl.uniform1i( uniforms.uImage, _unitId );
      GLProgramController.LAST_USED_CONTROLLER = this;
      this.lastUsedUnit = _unitId;
    
    } else if ( _unitId !== this.lastUsedUnit ) {

      gl.uniform1i( uniforms.uUnitId, _unitId );
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
