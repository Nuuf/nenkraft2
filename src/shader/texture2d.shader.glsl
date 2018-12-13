/**
* @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
*/

@vertex@
precision highp float;

attribute vec2 aPosition;
attribute vec2 aTexCoord;

uniform mat3 uProjection;
uniform mat3 uTranslation;
uniform mat3 uTransformation;

varying vec2 vTexCoord;

void main() {
    gl_Position = vec4( ( uProjection * uTranslation * vec3( aPosition, 1.0 ) ).xy, 0.0, 1.0 );
    vTexCoord = ( uTransformation * vec3( aTexCoord, 1.0 ) ).xy;
}
@vertex-end@

@fragment@
#if __VERSION__ < 130
#define TEX texture2D
#else
#define TEX texture
#endif

precision highp float;

uniform sampler2D uImage;
uniform vec4 uTint;

varying vec2 vTexCoord;

void main() {
    gl_FragColor = TEX( uImage, vTexCoord ) * uTint;
}
@fragment-end@