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
import RendertextureBlackWhite from './rendertexture-black-white.shader.glsl';
import RendertextureGrayscale from './rendertexture-grayscale.shader.glsl';
import RendertextureSepia from './rendertexture-sepia.shader.glsl';
import RendertextureInvert from './rendertexture-invert.shader.glsl';

export const Uglify = function ( _data ) {

  return _data
    .replace( /\/\*[\s\S]*?\*\//g, '' )
    .replace( /[\r\t]/g, ' ' )
    .replace( /[ ]{2,}/g, ' ' )
    .replace( /[\n ]{2,}/g, '\n' )
    .replace( /\/\/.*/g, '' )
    .replace( /\s*(\=|\+|\-|\*|\/|\<|\>|\(|\)|\{|\}|\,|\:|\;|\?)\s*/g, '$1' )
    .trim();

};

export const ParseImports = function ( _shader ) {

  const imp = _shader.match( /\((import .[\s\S]*?)\/\)/ );
  let json;
  let key;
  let snippet;
  let rsnippet;

  if ( imp == null ) return null;

  json = imp[ 1 ].match( /\[([\s\S]*?)\]/ );

  if ( json ) {

    imp[ 1 ] = imp[ 1 ].replace( json[ 0 ], '' );

    json = JSON.parse( json[ 1 ] );
      
  }

  snippet = imp[ 1 ].match( /\'(.[\s\S]*?)\'/ )[ 1 ];

  rsnippet = SNIPPETS[ snippet ];

  if ( json != null ) {

    if ( json.replace != null ) {

      for ( key in json.replace ) {

        rsnippet = rsnippet.replace( new RegExp( key, 'g' ), json.replace[ key ] );

      }
      
    }

    if ( json.set != null ) {

      for ( key in json.set ) {

        const v0 = rsnippet.match( new RegExp( '(' + key + '\\s*=\\s*.*?;)', '' ) ) ;

        if ( v0 ) {

          const v1 = v0[ 1 ].match( /=([\s\S]*?);/ );

          v1[ 1 ] = v0[ 1 ].replace( v1[ 1 ], json.set[ key ] );

          console.log( v1 );

          rsnippet = rsnippet.replace( v0[ 1 ], v1[ 1 ] );
          
        }

      }

    }
      
  }

  return { 
    imp: imp, 
    snippet: rsnippet
  };

};

export const SNIPPETS = {
  PI: Uglify( require( './snippets/constants/pi.snippet' ) ),
  RADIAN: Uglify( require( './snippets/constants/radian.snippet' ) ),
  RSEEDS: Uglify( require( './snippets/constants/rseeds.snippet' ) ),
  VRSEEDS: Uglify( require( './snippets/constants/vrseeds.snippet' ) ),
  mod289: Uglify( require( './snippets/misc/mod289.snippet' ) ),
  permute: Uglify( require( './snippets/misc/permute.snippet' ) ), 
  rotate2d: Uglify( require( './snippets/misc/rotate2d.snippet' ) ),
  scale2d: Uglify( require( './snippets/misc/scale2d.snippet' ) ),
  plot: Uglify( require( './snippets/misc/plot.snippet' ) ),
  ridge: Uglify( require( './snippets/misc/ridge.snippet' ) ),
  random: Uglify( require( './snippets/random/random.snippet' ) ),
  vrandom: Uglify( require( './snippets/random/vrandom.snippet' ) ),
  noise: Uglify( require( './snippets/noise/noise.snippet' ) ),
  gnoise: Uglify( require( './snippets/noise/gnoise.snippet' ) ),
  snoise: Uglify( require( './snippets/noise/snoise.snippet' ) ),
  fbm: Uglify( require( './snippets/fbm/fbm.snippet' ) ),
  abs_fbm: Uglify( require( './snippets/fbm/abs_fbm.snippet' ) ),
  rot_fbm: Uglify( require( './snippets/fbm/rot_fbm.snippet' ) ),
  rmf: Uglify( require( './snippets/fbm/rmf.snippet' ) ),
  aabb: Uglify( require( './snippets/geom/aabb.snippet' ) ),
  cruciform: Uglify( require( './snippets/geom/cruciform.snippet' ) ),
  circle: Uglify( require( './snippets/geom/circle.snippet' ) )
};

export const Parse = function ( _data ) {

  let s;
  let e;
  const vS = '@vertex@';
  const vE = '@vertex-end@';
  const fS = '@fragment@';
  const fE = '@fragment-end@';

  s = _data.indexOf( vS ) + vS.length;
  e = _data.indexOf( vE );

  let vShader = _data.substring( s, e ).replace( /\/\*[\s\S]*?\*\//g, '' );

  s = _data.indexOf( fS ) + fS.length;
  e = _data.indexOf( fE );

  let fShader = _data.substring( s, e ).replace( /\/\*[\s\S]*?\*\//g, '' );
  let found = true;

  while ( found === true ) {

    found = false;

    const v = ParseImports( vShader );

    if ( v != null ) {

      vShader = vShader.replace( v.imp[ 0 ], v.snippet );
      found = true;
    
    }

    const f = ParseImports( fShader );

    if ( f != null ) {

      fShader = fShader.replace( f.imp[ 0 ], f.snippet );
      found = true;

    }

  }

  return { 
    vertex: Uglify( vShader ),
    fragment: Uglify( fShader )
  };

};

export const TEXTURE_2D = Parse( ShaderTexture2D );
export const TEXTURE_2D_BATCH = Parse( ShaderTexture2DBatch );
export const PIXEL_BATCH = Parse( ShaderPixelPatch );
export const RECTANGLE = Parse( ShaderRectangle );
export const CIRCLE = Parse( ShaderCircle );
export const LINE2D = Parse( ShaderLine2D );
export const UN = Parse( ShaderUn );
export const RENDERTEXTURE_BLACK_WHITE = Parse( RendertextureBlackWhite );
export const RENDERTEXTURE_GRAYSCALE = Parse( RendertextureGrayscale );
export const RENDERTEXTURE_SEPIA = Parse( RendertextureSepia );
export const RENDERTEXTURE_INVERT = Parse( RendertextureInvert );

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
    'uniform int uUnitId;',
    'varying vec2 vTexCoord;',
    'void main () {',
    'if ( uUnitId == 0 ) {',
    'gl_Position = vec4( ( uProjection * uTranslation * vec3( aPosition0, 1.0 ) ).xy, 0.0, 1.0 );',
    'vTexCoord = ( uTransformation * vec3( aTexCoord0, 1.0 ) ).xy;',
    '}'
  );

  for ( i = 1; i < _num; ++i ) {

    vertex.push(
      'else if ( uUnitId == ' + i + ' ) {',
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
