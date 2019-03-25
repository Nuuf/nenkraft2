/**
* @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
*/

@vertex@
(import 'VERTEX_TEXTURE_DEFAULT' /)
@vertex-end@

@fragment@
#if __VERSION__ < 130
#define TEX texture2D
#else
#define TEX texture
#endif

precision highp float;

uniform sampler2D uImage;

varying vec2 vTexCoord;

void main() {
    vec4 color = TEX( uImage, vTexCoord );
    gl_FragColor = vec4( vec3(
      1.0 - color.r,
      1.0 - color.g,
      1.0 - color.b
    ), color.a );
}
@fragment-end@