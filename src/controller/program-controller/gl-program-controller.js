/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class GLProgramController {

  /**
   * 
   * @param {WebGLRenderingContext|WebGL2RenderingContext} _gl 
   * @param {object}                                       _shader 
   */
  constructor ( _gl, _shader ) {

    this.gl = _gl;
    this.data = {};
    this.program = null;
    this.attributes = null;
    this.uniforms = null;

    if ( _gl != null && _shader != null ) {

      this.Init( _shader.vertex, _shader.fragment );
    
    }
  
  }

  /**
   * 
   * @return {GLProgramController}
   */
  static get LAST_USED_CONTROLLER () {

    return PS_LAST_USED_CONTROLLER;
  
  }

  /**
   * 
   * @param {GLProgramController} _value
   */
  static set LAST_USED_CONTROLLER ( _value ) {

    PS_LAST_USED_CONTROLLER = _value;
  
  }

  /**
   * 
   * @param {string} _vs 
   * @param {string} _fs 
   * 
   * @return {void}
   */
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

  /**
   * 
   * @param {string}  _script 
   * @param {integer} _type 
   * 
   * @return {WebGLShader}
   */
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

  /**
   * 
   * @param {string} _attribute 
   * 
   * @return {void}
   */
  AssignAttribute ( _attribute ) {

    this.attributes[ _attribute ] = this.gl.getAttribLocation( this.program, _attribute );
  
  }

  /**
   * 
   * @param {string} _uniform 
   * 
   * @return {void}
   */
  AssignUniform ( _uniform ) {

    this.uniforms[ _uniform ] = this.gl.getUniformLocation( this.program, _uniform );
  
  }

  /**
   * 
   * @return {void}
   */
  Execute () {

    return;
  
  }

}

// Private Static ----->
let PS_LAST_USED_CONTROLLER = null;
// <----- Private Static
