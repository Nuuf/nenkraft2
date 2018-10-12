/**
* @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
*/

@vertex@
precision mediump float;

attribute vec2 aPosition;

uniform mat3 uProjection;
uniform vec2 uSize;
uniform float uOutline;

varying vec2 vPosition;
varying float vBorderX;
varying float vNegBorderX;
varying float vBorderY;
varying float vNegBorderY;

void main() {
  gl_Position = vec4( ( uProjection * vec3( aPosition, 1.0 ) ).xy, 0.0, 1.0 );
  vPosition = aPosition;
  vBorderX = -uSize.x * 0.5 + uOutline;
  vNegBorderX = uSize.x * 0.5 - uOutline;
  vBorderY = -uSize.y * 0.5 + uOutline;
  vNegBorderY = uSize.y * 0.5 - uOutline;
}
@vertex-end@

@fragment@
precision mediump float;

uniform lowp vec4 uFillColor;
uniform lowp vec4 uOutlineColor;

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
    gl_FragColor = uFillColor;
  } else {
    gl_FragColor = uOutlineColor;
  }
}
@fragment-end@