/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { GLProgramController } from './gl-program-controller';
import { TEXTURE_2D_BATCH } from '../../shader';
import { TriRectArray } from '../../math';

export class GLTexture2DBatchProgramController extends GLProgramController {

  constructor ( _gl ) {

    super( _gl, TEXTURE_2D_BATCH );
    this.originalTexture = null;
    this.texture = null;
    this.essenceBuffer = null;
    this.dataBuffer = null;
    this.indexBuffer = null;
    this.previousNumberOfElements = 0;
    this.Initialise();
  
  }

  Initialise () {

    const gl = this.gl;

    this.texture = gl.createTexture();
    this.essenceBuffer = gl.createBuffer();
    this.dataBuffer = gl.createBuffer();

    this.AssignAttribute( 'aPosition' );
    this.AssignAttribute( 'aTexCoord' );
    this.AssignAttribute( 'aProjection1' );
    this.AssignAttribute( 'aProjection2' );
    this.AssignAttribute( 'aProjection3' );
    this.AssignAttribute( 'aTranslation1' );
    this.AssignAttribute( 'aTranslation2' );
    this.AssignAttribute( 'aTranslation3' );
    this.AssignAttribute( 'aTransformation1' );
    this.AssignAttribute( 'aTransformation2' );
    this.AssignAttribute( 'aTransformation3' );
    this.AssignUniform( 'uImage' );
  
  }

  BindBasicTexture ( _texture, _param ) {

    const gl = this.gl;
    const essence = TriRectArray( 0, 0, _texture.w, _texture.h );

    _param = _param != null ? _param : gl.LINEAR;

    this.aia = gl.getExtension( 'ANGLE_instanced_arrays' );
    this.originalTexture = _texture;

    essence.push.apply( essence, TriRectArray( 0, 0, 1, 1 ) );

    gl.bindTexture( gl.TEXTURE_2D, this.texture );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, _param );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, _param );
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, _texture.image );
    gl.bindBuffer( gl.ARRAY_BUFFER, this.essenceBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( essence ), gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, null );
    gl.bindTexture( gl.TEXTURE_2D, null );
  
  }

  Execute ( _data, _numberOfElements ) {

    const gl = this.gl;
    const aia = this.aia;
    const attributes = this.attributes;
    const uniforms = this.uniforms;

    if ( this !== GLProgramController.LAST_USED_CONTROLLER ) {

      gl.useProgram( this.program );
      gl.activeTexture( gl.TEXTURE0 );
      gl.bindTexture( gl.TEXTURE_2D, this.texture );
      gl.uniform1i( uniforms.uImage, 0 );
      gl.bindBuffer( gl.ARRAY_BUFFER, this.essenceBuffer );
      gl.enableVertexAttribArray( attributes.aPosition );
      gl.vertexAttribPointer( attributes.aPosition, 2, gl.FLOAT, false, 0, 0 );
      aia.vertexAttribDivisorANGLE( attributes.aPosition, 0 );
      gl.enableVertexAttribArray( attributes.aTexCoord );
      gl.vertexAttribPointer( attributes.aTexCoord, 2, gl.FLOAT, false, 0, 48 );
      aia.vertexAttribDivisorANGLE( attributes.aTexCoord, 0 );
      GLProgramController.LAST_USED_CONTROLLER = this;
    
    }

    gl.bindBuffer( gl.ARRAY_BUFFER, this.dataBuffer );

    if ( _numberOfElements !== this.previousNumberOfElements ) {

      gl.bufferData( gl.ARRAY_BUFFER, _data, gl.DYNAMIC_DRAW );
    
    } else {

      gl.bufferSubData( gl.ARRAY_BUFFER, 0, _data );
    
    }

    gl.enableVertexAttribArray( attributes.aProjection1 );
    gl.vertexAttribPointer( attributes.aProjection1, 3, gl.FLOAT, false, 108, 0 );
    aia.vertexAttribDivisorANGLE( attributes.aProjection1, 1 );
    gl.enableVertexAttribArray( attributes.aProjection2 );
    gl.vertexAttribPointer( attributes.aProjection2, 3, gl.FLOAT, false, 108, 12 );
    aia.vertexAttribDivisorANGLE( attributes.aProjection2, 1 );
    gl.enableVertexAttribArray( attributes.aProjection3 );
    gl.vertexAttribPointer( attributes.aProjection3, 3, gl.FLOAT, false, 108, 24 );
    aia.vertexAttribDivisorANGLE( attributes.aProjection3, 1 );
    gl.enableVertexAttribArray( attributes.aTranslation1 );
    gl.vertexAttribPointer( attributes.aTranslation1, 3, gl.FLOAT, false, 108, 36 );
    aia.vertexAttribDivisorANGLE( attributes.aTranslation1, 1 );
    gl.enableVertexAttribArray( attributes.aTranslation2 );
    gl.vertexAttribPointer( attributes.aTranslation2, 3, gl.FLOAT, false, 108, 48 );
    aia.vertexAttribDivisorANGLE( attributes.aTranslation2, 1 );
    gl.enableVertexAttribArray( attributes.aTranslation3 );
    gl.vertexAttribPointer( attributes.aTranslation3, 3, gl.FLOAT, false, 108, 60 );
    aia.vertexAttribDivisorANGLE( attributes.aTranslation3, 1 );
    gl.enableVertexAttribArray( attributes.aTransformation1 );
    gl.vertexAttribPointer( attributes.aTransformation1, 3, gl.FLOAT, false, 108, 72 );
    aia.vertexAttribDivisorANGLE( attributes.aTransformation1, 1 );
    gl.enableVertexAttribArray( attributes.aTransformation2 );
    gl.vertexAttribPointer( attributes.aTransformation2, 3, gl.FLOAT, false, 108, 84 );
    aia.vertexAttribDivisorANGLE( attributes.aTransformation2, 1 );
    gl.enableVertexAttribArray( attributes.aTransformation3 );
    gl.vertexAttribPointer( attributes.aTransformation3, 3, gl.FLOAT, false, 108, 96 );
    aia.vertexAttribDivisorANGLE( attributes.aTransformation3, 1 );
    aia.drawArraysInstancedANGLE( gl.TRIANGLE_STRIP, 0, 6, _numberOfElements );
  
  }

}
