/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { TextureEntity2D } from './texture-entity2d';
import { Char } from './char';

export class BitmapText extends TextureEntity2D {

  /**
   * 
   * @param {number}         _x 
   * @param {number}         _y 
   * @param {BasicTexture2D} _texture 
   * @param {object}         _data 
   * @param {string?}        _text 
   * @param {integer?}       _unitId 
   */
  constructor ( _x, _y, _texture, _data, _text, _unitId ) {

    super( _x, _y, _texture, _unitId );

    this.fontData = _data;
    this.lineHeight = _data.font.common.attributes.lineHeight;
    this.chars = [];
    this.maxWidth = 1024;
    this.text = '';
    this.autoUpdateChars = true;

    if ( _text != null ) {

      this.text = _text;
    
    }

    this.ComputeText();
  
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

      this.transform.ApplyGlobal( _rc );

      if ( this.display === true ) {

        _rc.globalAlpha = this.alpha;
        _rc.globalCompositeOperation = this.gco;
        this.RenderText( _rc );
      
      }

      if ( this.children.length > 0 ) {

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

      if ( this.display === true && this.programController !== null ) {

        this.GLRenderText( _gl );
      
      }

      if ( this.children.length > 0 && this.display === true ) {

        if ( this.isBatchParent === true ) {

          this.GLBatchRenderChildren( _gl );
        
        } else {

          this.GLRenderChildren( _gl );
        
        }
      
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
  RenderText ( _rc ) {

    const chars = this.chars;
    const image = this.texture.image;

    for ( var i = 0; i < chars.length; ++i ) {

      chars[ i ].Render( _rc, image );
    
    }
  
  }

  /**
   * 
   * @return {void}
   */
  GLRenderText () {

    const chars = this.chars;

    if ( this.autoUpdateChars === true ) {

      for ( var i = 0; i < chars.length; ++i ) {

        chars[ i ].GLRenderAuto( 
          this.programController, 
          this.tint.channel, 
          this.texture.uniformId
        );
      
      }
    
    } else {

      for ( i = 0; i < chars.length; ++i ) {

        chars[ i ].GLRender( this.programController, this.tint.channel, this.texture.uniformId );
      
      }
    
    }
  
  }

  /**
   * 
   * @return {void}
   */
  ComputeText () {

    let kernings;
    let lineNum = 0;
    let newLines = 0;
    let newLineAdvance = false;
    let w = 0;
    let h = 0;
    let tW = 0;
    let tH = 0;
    let char;
    let prevChar;
    const chars = this.chars;
    const text = this.text;

    this.UpdateTransform( this.parent );

    if ( chars.length !== 0 ) {

      this.StoreAllChars();
    
    }

    if ( this.fontData.font.kernings ) {

      kernings = this.fontData.font.kernings.kerning;
    
    }

    for ( var i = 0; i < text.length; ++i ) {

      const charCode = text.charCodeAt( i );

      prevChar = chars[ i - 1 - newLines ];

      if ( charCode === 10 ) {

        newLines++;
        newLineAdvance = true;
        continue;
      
      }

      char = Char.pool.Retrieve( this.GetCharDataById( charCode ) );
      if ( kernings != null ) char.ApplyKernings( kernings );
      char.Crunch( prevChar );

      tW = char.position.x + char.width;
      tH = char.position.y + char.height;

      if ( ( tW ) > this.maxWidth || newLineAdvance === true ) {

        char.position.SetSame( 0 );
        char.yadvance = this.lineHeight * ++lineNum;
        char.position.Add( char.xoffset, char.yoffset + char.yadvance );
        newLineAdvance = false;
      
      }

      if ( tW > w ) w = tW;
      if ( tH > h ) h = tH;

      char.parent = this;
      char.UpdateMatrices();
      chars.push( char );
    
    }

    this.w = w;
    this.h = h;
  
  }

  /**
   * 
   * @return {void}
   */
  UpdateChars () {

    const chars = this.chars;

    for ( var i = 0; i < chars.length; ++i ) {

      chars[ i ].UpdateMatrices();
      
    }
  
  }

  /**
   * 
   * @param {string} _id 
   * 
   * @return {object}
   */
  GetCharDataById ( _id ) {

    const chars = this.fontData.font.chars.char;

    for ( var i = 0; i < chars.length; ++i ) {

      if ( parseInt( chars[ i ].attributes.id ) === _id ) {
  
        return chars[ i ].attributes;
        
      }
      
    }
  
  }

  /**
   * 
   * @return {this}
   */
  StoreAllChars () {

    const chars = this.chars;

    for ( var i = 0; i < chars.length; ++i ) {

      chars[ i ].Store();

    }

    chars.length = 0;

    return this;
  
  }

  /**
   * 
   * @return {void}
   */
  UpdateInBuffer () {

    throw new Error( PS_ACCESS_BUFFER_ERROR_MSG );
  
  }

  /**
   * 
   * @return {void}
   */
  GetBufferData () {

    throw new Error( PS_ACCESS_BUFFER_ERROR_MSG );
  
  }

}

// Private Static ----->
const PS_ACCESS_BUFFER_ERROR_MSG = 'Cannot access buffer data directly on BitmapText!';
// <----- Private Static
