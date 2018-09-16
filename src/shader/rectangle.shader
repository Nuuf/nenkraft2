/**
* @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
*/

@vertex@
attribute vec2 aPosition;

uniform mat3 uProjection;
uniform lowp vec4 uFillColor;
uniform lowp vec4 uOutlineColor;
uniform vec2 uSize;
uniform float uOutline;

varying lowp vec4 vFillColor;
varying lowp vec4 vOutlineColor;
varying vec2 vPosition;
varying float vBorderX;
varying float vNegBorderX;
varying float vBorderY;
varying float vNegBorderY;

void main() {
  gl_Position = vec4( ( uProjection * vec3( aPosition, 1.0 ) ).xy, 0.0, 1.0 );
  vFillColor = uFillColor;
  vOutlineColor = uOutlineColor;
  vPosition = aPosition;
  vBorderX = -uSize.x * 0.5 + uOutline;
  vNegBorderX = uSize.x * 0.5 - uOutline;
  vBorderY = -uSize.y * 0.5 + uOutline;
  vNegBorderY = uSize.y * 0.5 - uOutline;
}
@vertex-end@

@fragment@
precision mediump float;

varying lowp vec4 vFillColor;
varying lowp vec4 vOutlineColor;
varying vec2 vPosition;
varying float vBorderX;
varying float vNegBorderX;
varying float vBorderY;
varying float vNegBorderY;

void main() {
  if (
    vPosition.x > vBorderX &&
    vPosition.x < vNegBorderX && 
    vPosition.y > vBorderY && 
    vPosition.y < vNegBorderY
  ) {
    gl_FragColor = vFillColor;
  } else {
    gl_FragColor = vOutlineColor;
  }
}
@fragment-end@