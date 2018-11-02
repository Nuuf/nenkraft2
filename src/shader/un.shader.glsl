/**
* @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
*/

@vertex@
precision highp float;

attribute vec2 a_v2Position;

uniform mat3 u_m3Projection;

varying vec2 v_v2Position;

void main() {
  gl_Position = vec4( ( u_m3Projection * vec3( a_v2Position, 1.0 ) ).xy, 0.0, 1.0 );
  v_v2Position = a_v2Position;
}
@vertex-end@

@fragment@

(import 'RADIAN' /)

precision highp float;

uniform float u_fTime;
uniform vec2 u_v2Resolution;

varying vec2 v_v2Position;

(import 'rotate2d' /)
(import 'mod289' /)
(import 'permute' /)
(import 'snoise' /)
(import 'ridge' /)
(import 'rmf' [
  {
    "set": {
      "OFFSET": "1.0 + 0.1 * abs( sin( u_fTime ) )",
      "OCTAVES": "19"
    }
  }
] /)
(import 'rmf' [
  {
    "replace": {
      "rmf": "rmf2"
    },
    "set": {
      "OFFSET": "0.5 + 0.1 * abs( sin( u_fTime ) )",
      "OCTAVES": "3"
    }
  }
] /)

void main() {

  vec2 pos = v_v2Position / u_v2Resolution;
  float sp = 4.0 * u_fTime;

  pos *= -1.0; 


  pos.y += u_fTime / 2.0;
  
  // pos += 0.5;

  vec3 color = vec3( 0.0, rmf2( pos * 20.0 ) * rmf( pos * 0.4 ), 0.0 );

  color = mix( color * rmf( pos * 20.0 ), vec3( 0.9, 0.0, 0.9 ), 0.2 );

  gl_FragColor = vec4( color, 1.0 );
  
}

@fragment-end@