/**
* @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
*/

@vertex@
precision highp float;

attribute vec3 aProjection1;
attribute vec3 aProjection2;
attribute vec3 aProjection3;
attribute vec2 aPosition;
attribute vec4 aColor;
attribute float aPointSize;

varying vec4 vColor;

void main() {
    mat3 projection = mat3( aProjection1, aProjection2, aProjection3 );
    gl_Position = vec4( ( projection * vec3( aPosition, 1.0 ) ).xy, 0.0, 1.0 );
    gl_PointSize = aPointSize;
    vColor = aColor;
}
@vertex-end@

@fragment@
precision highp float;

varying vec4 vColor;

void main() {
    gl_FragColor = vColor;
}
@fragment-end@