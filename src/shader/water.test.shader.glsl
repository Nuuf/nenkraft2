/**
* @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
*/

@vertex@
(import 'VERTEX_TEXTURE_TRANSFORM' /)
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
    gl_FragColor = color;
}
@fragment-end@