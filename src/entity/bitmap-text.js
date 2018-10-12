/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Sprite } from './sprite';
import { Char } from './char';

export class BitmapText extends Sprite {

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

  Draw ( _rc ) {

    this.PreDraw( _rc );

    if ( this.render === true ) {

      if ( this.transformShouldUpdate === true ) {

        this.UpdateTransform();
        if ( this.transformAutomaticUpdate === false ) this.transformShouldUpdate = false;
      
      }

      this.transform.ApplyGlobal( _rc );

      if ( this.display === true ) {

        _rc.globalAlpha = this.alpha;
        _rc.globalCompositeOperation = this.gco;
        this.DrawText( _rc );
      
      }

      if ( this.children.length > 0 ) {

        this.DrawChildren( _rc );
      
      }
    
    }
  
  }

  GLDraw ( _gl ) {

    this.GLPreDraw( _gl );

    if ( this.render === true ) {

      if ( this.transformShouldUpdate === true ) {

        this.UpdateTransform();
        if ( this.transformAutomaticUpdate === false ) this.transformShouldUpdate = false;
      
      }

      if ( this.display === true && this.programController !== null ) {

        this.GLDrawText( _gl );
      
      }

      if ( this.children.length > 0 && this.display === true ) {

        if ( this.isBatchParent === true ) {

          this.GLBatchDrawChildren( _gl );
        
        } else {

          this.GLDrawChildren( _gl );
        
        }
      
      }
    
    }
  
  }

  DrawText ( _rc ) {

    const chars = this.chars;
    const image = this.texture.image;

    for ( var i = 0; i < chars.length; ++i ) {

      chars[ i ].Draw( _rc, image );
    
    }
  
  }

  GLDrawText () {

    const chars = this.chars;

    if ( this.autoUpdateChars === true ) {

      for ( var i = 0; i < chars.length; ++i ) {

        chars[ i ].GLDrawAuto( this.programController, this.tint.channel, this.texture.uniformId );
      
      }
    
    } else {

      for ( i = 0; i < chars.length; ++i ) {

        chars[ i ].GLDraw( this.programController, this.tint.channel, this.texture.uniformId );
      
      }
    
    }
  
  }

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

    this.UpdateTransform();
    chars.length = 0;

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

      char = new Char( 0, 0, this.GetCharDataById( charCode ) );
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

  UpdateChars () {

    const chars = this.chars;

    for ( var i = 0; i < chars.length; ++i ) {

      chars[ i ].UpdateMatrices();
      
    }
  
  }

  GetCharDataById ( _id ) {

    const chars = this.fontData.font.chars.char;

    for ( var i = 0; i < chars.length; ++i ) {

      if ( parseInt( chars[ i ].attributes.id ) === _id ) {
  
        return chars[ i ].attributes;
        
      }
      
    }
  
  }

  UpdateInBuffer () {

    throw new Error( PS_ACCESS_BUFFER_ERROR_MSG );
  
  }

  GetBufferData () {

    throw new Error( PS_ACCESS_BUFFER_ERROR_MSG );
  
  }

}

// Private Static ----->
const PS_ACCESS_BUFFER_ERROR_MSG = 'Cannot access buffer data directly on BitmapText!';
// <----- Private static
