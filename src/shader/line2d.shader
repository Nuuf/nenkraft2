/**
* @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
*/

@vertex@
attribute vec2 aPosition;

uniform mat3 uProjection;
uniform lowp vec4 uColor;

varying lowp vec4 vColor;

void main() {
  gl_Position = vec4( ( uProjection * vec3( aPosition, 1.0 ) ).xy, 0.0, 1.0 );
  vColor = uColor;
}
@vertex-end@

@fragment@
precision mediump float;

varying lowp vec4 vColor;

void main() {
  gl_FragColor = vColor;
}
@fragment-end@