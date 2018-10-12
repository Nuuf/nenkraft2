/**
* @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
*/

@vertex@
precision mediump float;

attribute vec2 aPosition;
attribute vec2 aTexCoord;

attribute vec3 aProjection1;
attribute vec3 aProjection2;
attribute vec3 aProjection3;

attribute vec3 aTranslation1;
attribute vec3 aTranslation2;
attribute vec3 aTranslation3;

attribute vec3 aTransformation1;
attribute vec3 aTransformation2;
attribute vec3 aTransformation3;

varying vec2 vTexCoord;

void main() {
  mat3 projection = mat3( aProjection1, aProjection2, aProjection3 );
  mat3 translation = mat3( aTranslation1, aTranslation2, aTranslation3 );
  mat3 transformation = mat3( aTransformation1, aTransformation2, aTransformation3 );
  gl_Position = vec4( ( projection * translation * vec3( aPosition, 1.0 ) ).xy, 0.0, 1.0 );
  vTexCoord = ( transformation * vec3( aTexCoord, 1.0 ) ).xy;
}
@vertex-end@

@fragment@
#if __VERSION__ < 130
#define TEX texture2D
#else
#define TEX texture
#endif

precision mediump float;

uniform sampler2D uImage;

varying vec2 vTexCoord;

void main() {
  gl_FragColor = TEX( uImage, vTexCoord );
}
@fragment-end@