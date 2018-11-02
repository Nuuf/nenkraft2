/**
* @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
*/

@vertex@
precision mediump float;

attribute vec2 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
    gl_Position = vec4( aPosition, 1.0, 1.0 );
    vTexCoord = aTexCoord;
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
  vec4 color = TEX( uImage, vTexCoord );
  gl_FragColor = vec4( vec3( step( 1.0, color.r + color.g + color.b / 3.0 ) ), color.a );
}
@fragment-end@