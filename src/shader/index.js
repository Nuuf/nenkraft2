/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

'use strict';

import ShaderTexture2D from './texture2d.shader.glsl';
import ShaderTexture2DBatch from './texture2d-batch.shader.glsl';
import ShaderPixelPatch from './pixel-batch.shader.glsl';
import ShaderRectangle from './rectangle.shader.glsl';
import ShaderCircle from './circle.shader.glsl';
import ShaderLine2D from './line2d.shader.glsl';
import ShaderUn from './un.shader.glsl';

const Parse = function ( _data ) {

  let s;
  let e;
  const vS = '@vertex@';
  const vE = '@vertex-end@';
  const fS = '@fragment@';
  const fE = '@fragment-end@';

  s = _data.indexOf( vS ) + vS.length;
  e = _data.indexOf( vE );

  let vShader = _data.substring( s, e );

  s = _data.indexOf( fS ) + fS.length;
  e = _data.indexOf( fE );

  let fShader = _data.substring( s, e );
  let found = true;

  while ( found === true ) {

    found = false;

    const vimp = vShader.match( /\((import .*?)\)/ );
    const fimp = fShader.match( /\((import .*?)\)/ );

    if ( vimp != null ) {

      vShader = vShader.replace( vimp[ 0 ], require( vimp[ 1 ].replace( /\'/g, '' ).replace( 'import ', '' ) + '.glslfunc' ) );

      found = true;
    
    }

    if ( fimp != null ) {

      fShader = fShader.replace( fimp[ 0 ], require( fimp[ 1 ].replace( /\'/g, '' ).replace( 'import ', '' ) + '.glslfunc' ) );

      found = true;
    
    }

  }

  return { 
    vertex: vShader.replace( /\n/g, '' ), 
    fragment: fShader.replace( /\n/g, '' )
  };

};

export const TEXTURE_2D = Parse( ShaderTexture2D );
export const TEXTURE_2D_BATCH = Parse( ShaderTexture2DBatch );
export const PIXEL_BATCH = Parse( ShaderPixelPatch );
export const RECTANGLE = Parse( ShaderRectangle );
export const CIRCLE = Parse( ShaderCircle );
export const LINE2D = Parse( ShaderLine2D );
export const UN = Parse( ShaderUn );

export const DynamicTEXTURE_2D = function ( _num ) {

  const vertex = [];

  vertex.push( 
    'precision mediump float;'
  );

  let i;

  for ( i = 0; i < _num; ++i ) {

    vertex.push(
      'attribute vec2 aPosition' + i + ';',
      'attribute vec2 aTexCoord' + i + ';'
    );
  
  }

  vertex.push(
    'uniform mat3 uProjection;',
    'uniform mat3 uTranslation;',
    'uniform mat3 uTransformation;',
    'uniform float uUnitId;',
    'varying vec2 vTexCoord;',
    'void main () {',
    'if ( uUnitId == 0.0 ) {',
    'gl_Position = vec4( ( uProjection * uTranslation * vec3( aPosition0, 1.0 ) ).xy, 0.0, 1.0 );',
    'vTexCoord = ( uTransformation * vec3( aTexCoord0, 1.0 ) ).xy;',
    '}'
  );

  for ( i = 1; i < _num; ++i ) {

    vertex.push(
      'else if ( uUnitId == ' + i + '.0 ) {',
      'gl_Position = vec4( ( uProjection * uTranslation * vec3( aPosition' + i + ', 1.0 ) ).xy, 0.0, 1.0 );',
      'vTexCoord = ( uTransformation * vec3( aTexCoord' + i + ', 1.0 ) ).xy;',
      '}'
    );
  
  }

  vertex.push( '}' );

  return {
    vertex: vertex.join( '' ),
    fragment: TEXTURE_2D.fragment
  };

};
