/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class Frame {

  constructor ( _x, _y, _w, _h, _rate, _id ) {

    this.rate = _rate;
    this.timer = _rate;
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
    this.nextFrameIndex = null;
    this.id = null;

    if ( _id != null ) {

      this.id = _id;
    
    }
  
  }

  Process () {

    if ( this.timer-- <= 0 ) {

      this.Reset();
      return true;
      
    }
  
    return false;
  
  }

  Apply ( _sprite ) {

    _sprite.ClipReconfigure( this.x, this.y, this.w, this.h );
  
  }

  Reset () {

    this.timer = this.rate;
  
  }

}
