/**
* @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
*/

@vertex@
precision mediump float;

attribute vec2 aPosition;

uniform mat3 uProjection;

varying vec2 vPosition;

void main() {
  gl_Position = vec4( ( uProjection * vec3( aPosition, 1.0 ) ).xy, 0.0, 1.0 );
  vPosition = aPosition;
}
@vertex-end@

@fragment@
precision mediump float;

uniform lowp vec4 uFillColor;
uniform lowp vec4 uOutlineColor;
uniform float uRadius;
uniform float uOutline;

varying vec2 vPosition;

void main() {
  float d = dot( vPosition, vPosition );
  float rs = uRadius * uRadius;
  float ors = uRadius - uOutline;
  ors = ors * ors;
  if ( d < rs && d > ors ) {
    gl_FragColor = uOutlineColor;
  } else if ( d < rs ) {
    gl_FragColor = uFillColor;
  }
}
@fragment-end@