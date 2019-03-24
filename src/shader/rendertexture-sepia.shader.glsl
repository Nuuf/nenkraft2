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
      ( color.r * 0.393 ) + ( color.g * 0.769 ) + ( color.b * 0.189 ),
      ( color.r * 0.349 ) + ( color.g * 0.686 ) + ( color.b * 0.168 ),
      ( color.r * 0.272 ) + ( color.g * 0.534 ) + ( color.b * 0.131 )
    ), color.a );
}
@fragment-end@