/**
* @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
*/

@vertex@
attribute vec2 aPosition;

uniform mat3 uProjection;
uniform lowp vec4 uFillColor;
uniform lowp vec4 uOutlineColor;
uniform float uRadius;
uniform float uOutline;

varying lowp vec4 vFillColor;
varying lowp vec4 vOutlineColor;
varying vec2 vPosition;
varying float vRadius;
varying float vOutline;

void main() {
  gl_Position = vec4( ( uProjection * vec3( aPosition, 1.0 ) ).xy, 0.0, 1.0 );
  vFillColor = uFillColor;
  vOutlineColor = uOutlineColor;
  vPosition = aPosition;
  vRadius = uRadius;
  vOutline = uOutline;
}
@vertex-end@

@fragment@
precision mediump float;

varying lowp vec4 vFillColor;
varying lowp vec4 vOutlineColor;
varying vec2 vPosition;
varying float vRadius;
varying float vOutline;

void main() {
  float d = dot( vPosition, vPosition );
  float rs = vRadius * vRadius;
  float ors = vRadius - vOutline;
  ors = ors * ors;
  if ( d < rs && d > ors ) {
    gl_FragColor = vOutlineColor;
  } else if ( d < rs ) {
    gl_FragColor = vFillColor;
  }
}
@fragment-end@