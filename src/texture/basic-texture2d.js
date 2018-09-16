/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class BasicTexture2D {

  constructor ( _image, _id, _w, _h, _fullWidth, _fullHeight ) {

    this.image = _image;
    this.id = null;
    this.w = 0;
    this.h = 0;
    this.fw = 0;
    this.fh = 0;
    this.uniformId = 0;

    if ( _id != null ) {

      this.id = _id;
    
    } else {

      this.id = _image.id;
    
    }

    if ( _w != null ) {

      this.w = _w;
    
    } else {

      this.w = _image.naturalWidth;
    
    }

    if ( _h != null ) {

      this.h = _h;
    
    } else {

      this.h = _image.naturalHeight;
    
    }

    if ( _fullWidth != null ) {

      this.fw = _fullWidth;
    
    } else {

      this.fw = _image.naturalWidth;
    
    }

    if ( _fullHeight != null ) {

      this.fh = _fullHeight;
    
    } else {

      this.fh = _image.naturalHeight;
    
    }
  
  }

}
