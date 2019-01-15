/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class Frame {

  constructor ( _x, _y, _w, _h, _duration, _id, _offsetX, _offsetY, _originW, _originH ) {

    this.duration = this.timer = _duration;
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
    this.offsetX = _offsetX == null ? 0 : _offsetX;
    this.offsetY = _offsetY == null ? 0 : _offsetY;
    this.originW = _originW == null ? _w : _originW;
    this.originH = _originH == null ? _h : _originH;
    this.id = _id != null ? _id : null;
  
  }

  Copy () {

    return new Frame( 
      this.x, this.y, 
      this.w, this.h, 
      this.duration, this.id, 
      this.offsetX, this.offsetY,
      this.originW,
      this.originH
    );
  
  }

  Process () {

    if ( this.timer-- <= 0 ) {

      this.Reset();

      return true;
      
    }
  
    return false;
  
  }

  Apply ( _sprite, _dynamicSize ) {

    if ( _dynamicSize === true ) {

      _sprite.w = this.w;
      _sprite.h = this.h;
    
    }

    _sprite.ClipReconfigure( 
      this.x, this.y,
      this.w, this.h,
      this.offsetX, this.offsetY,
      this.originW, this.originH
    );

    return this;
  
  }

  FullApply ( _sprite ) {

    this.Apply( _sprite );
    _sprite.w = this.w;
    _sprite.h = this.h;
    _sprite.scale.SetSame( 1 );

    return this;
  
  }

  Reset () {

    this.timer = this.duration;

    return this;
  
  }

}
