/**
* @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
*/

@vertex@
precision mediump float;

attribute vec2 aPosition;

uniform mat3 uProjection;
uniform lowp vec4 uColor;

void main() {
  gl_Position = vec4( ( uProjection * vec3( aPosition, 1.0 ) ).xy, 0.0, 1.0 );
}
@vertex-end@

@fragment@
precision mediump float;

uniform lowp vec4 uColor;

void main() {
  gl_FragColor = uColor;
}
@fragment-end@