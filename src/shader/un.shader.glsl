/**
* @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
*/

@vertex@
precision lowp float;

attribute vec2 a_v2Position;

uniform mat3 u_m3Projection;

varying vec2 v_v2Position;

void main() {
  gl_Position = vec4( ( u_m3Projection * vec3( a_v2Position, 1.0 ) ).xy, 0.0, 1.0 );
  v_v2Position = a_v2Position;
}
@vertex-end@

@fragment@
precision lowp float;

uniform float u_fTime;
uniform vec2 u_v2Resolution;

varying vec2 v_v2Position;

void main() {

  vec2 pos = v_v2Position / u_v2Resolution;

  //pos.x -= v_v2Position.x;

  float r = sqrt( dot( pos, pos ) ) * 1.9 - sin ( u_fTime ) * 0.2;
  float a = atan( pos.x, pos.y ) + sin ( 0.9 * u_fTime );
  float s = 0.5 + 0.4999 * sin( 12.0 * a );
  float t = 0.15 + 0.35 * pow( s, 0.1 * sin( u_fTime ) * 0.5 );
  t += 0.1 * pow( 0.5 + 0.5 * cos( 24.0 * a ), 0.5 );
  float h = r / t;
  float f = 0.0;
  f = smoothstep( h-0.05, h+0.05, 1.0 );

  vec4 color = vec4( mix( vec3( f ), vec3( 0.5 + 0.5 * h, h, 0.5 * h ), f ), f );

  gl_FragColor = color;


}
@fragment-end@