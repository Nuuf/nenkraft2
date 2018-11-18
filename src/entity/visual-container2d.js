/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Container2D } from './container2d';

export class VisualContainer2D extends Container2D {

  constructor ( _x, _y ) {

    super( _x, _y );
    this.interactive = true;
    this.display = true;
  
  }

  PreRender () {

    return;
  
  }

  GLPreRender () {

    return;
  
  }

  PostRender () {

    return;
  
  }

  GLPostRender () {

    return;
  
  }

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

  RenderChildren ( _rc ) {

    const children = this.children;

    for ( var i = 0 ; i < children.length; ++i ) {

      children[ i ].Render( _rc );
    
    }
  
  }

  GLRenderChildren ( _gl ) {

    const children = this.children;

    for ( var i = 0; i < children.length; ++i ) {

      children[ i ].GLRender( _gl );
    
    }
  
  }

}

// Alias
Container2D.prototype.Mount = Container2D.prototype.AddChildren;
