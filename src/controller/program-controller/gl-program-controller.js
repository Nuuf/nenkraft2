/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class GLProgramController {

  constructor ( _gl, _shader ) {

    this.gl = _gl;
    this.data = {};
    this.program = null;
    this.attributes = null;
    this.uniforms = null;

    if ( _gl != null && _shader != null ) {

      this.Init( _shader.v, _shader.f );
    
    }
  
  }

  static get LAST_USED_CONTROLLER () {

    return PS_LAST_USED_CONTROLLER;
  
  }

  static set LAST_USED_CONTROLLER ( _value ) {

    PS_LAST_USED_CONTROLLER = _value;
  
  }

  Init ( _vs, _fs ) {

    const gl = this.gl;
    const vShader = this.CreateShader( _vs, gl.VERTEX_SHADER );
    const fShader = this.CreateShader( _fs, gl.FRAGMENT_SHADER );
    const program = this.program = gl.createProgram();

    gl.attachShader( program, vShader );
    gl.attachShader( program, fShader );
    gl.linkProgram( program );

    if ( !gl.getProgramParameter( program, gl.LINK_STATUS ) ) {

      const info = gl.getProgramInfoLog( program );

      throw new Error( 'Program link failed:' + info );
    
    }

    gl.detachShader( program, vShader );
    gl.detachShader( program, fShader );
    gl.deleteShader( vShader );
    gl.deleteShader( fShader );
    this.attributes = {};
    this.uniforms = {};
  
  }

  CreateShader ( _script, _type ) {

    const gl = this.gl;
    const shader = gl.createShader( _type );

    gl.shaderSource( shader, _script );
    gl.compileShader( shader );

    if ( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) ) {

      const info = gl.getShaderInfoLog( shader );

      throw new Error( 'Shader compilation failed:' + info );
    
    }

    return shader;
  
  }

  AssignAttribute ( _attribute ) {

    this.attributes[ _attribute ] = this.gl.getAttribLocation( this.program, _attribute );
  
  }

  AssignUniform ( _uniform ) {

    this.uniforms[ _uniform ] = this.gl.getUniformLocation( this.program, _uniform );
  
  }

  Execute () {

    return;
  
  }

}

// Private Static ----->
let PS_LAST_USED_CONTROLLER = null;
// <----- Private static
