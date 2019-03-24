/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Container2D } from './container2d';

export class VisualContainer2D extends Container2D {

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   */
  constructor ( _x, _y ) {

    super( _x, _y );
    this.interactive = true;
    this.display = true;
  
  }

  /**
   * 
   * @return {void}
   */
  PreRender () {

    return;
  
  }

  /**
   * 
   * @return {void}
   */
  GLPreRender () {

    return;
  
  }

  /**
   * 
   * @return {void}
   */
  PostRender () {

    return;
  
  }

  /**
   * 
   * @return {void}
   */
  GLPostRender () {

    return;
  
  }

  /**
   * 
   * @param {CanvasRenderingContext2D} _rc 
   * 
   * @return {void}
   */
  Render ( _rc ) {

    this.PreRender( _rc );

    if ( this.render === true ) {

      this.ProcessTransform( this.parent );

      if ( this.children.length > 0 && this.display === true ) {

        this.RenderChildren( _rc );
      
      }
    
    }

    this.PostRender( _rc );
  
  }

  /**
   * 
   * @param {WebGLRenderingContext|WebGL2RenderingContext} _gl 
   * 
   * @return {void}
   */
  GLRender ( _gl ) {

    this.GLPreRender( _gl );

    if ( this.render === true ) {

      this.ProcessTransform( this.parent );

      if ( this.children.length > 0 && this.display === true ) {

        this.GLRenderChildren( _gl );

      }
    
    }

    this.GLPostRender( _gl );
  
  }

  /**
   * 
   * @param {CanvasRenderingContext2D} _rc 
   * 
   * @return {void}
   */
  RenderChildren ( _rc ) {

    const children = this.children;

    for ( var i = 0 ; i < children.length; ++i ) {

      children[ i ].Render( _rc );
    
    }
  
  }

  /**
   * 
   * @param {WebGLRenderingContext|WebGL2RenderingContext} _gl 
   * 
   * @return {void}
   */
  GLRenderChildren ( _gl ) {

    const children = this.children;

    for ( var i = 0; i < children.length; ++i ) {

      children[ i ].GLRender( _gl );
    
    }
  
  }

}

// Alias
Container2D.prototype.Mount = Container2D.prototype.AddChildren;
