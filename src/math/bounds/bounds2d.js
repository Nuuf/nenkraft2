/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { AABB2D } from '../../geom/aabb/aabb2d';

export class Bounds2D {

  constructor () {

    this.local = null;
    this.localDirty = true;
    this.global = null;
    this.globalDirty = true;
  
  }

  ComputeLocal ( _x, _y, _w, _h, _anchor, _owner ) {

    if ( _anchor != null ) {

      _x -= _w * _anchor.x;
      _y -= _h * _anchor.y;
    
    }

    if ( this.local === null ) {

      this.local = new AABB2D(
        _x,
        _y,
        _x + _w,
        _y + _h
      );
      this.local.belongsTo = _owner;
    
    } else {

      this.local.Set(
        _x,
        _y,
        _x + _w,
        _y + _h
      );
    
    }

    this.localDirty = false;

    return this.local;
  
  }

  ComputeGlobal ( _x, _y, _w, _h, _anchor, _owner ) {

    if ( _anchor != null ) {

      _x -= _w * _anchor.x;
      _y -= _h * _anchor.y;
    
    }

    if ( this.global === null ) {

      this.global = new AABB2D(
        _x,
        _y,
        _x + _w,
        _y + _h
      );
      this.global.belongsTo = _owner;
    
    } else {

      this.global.Set(
        _x,
        _y,
        _x + _w,
        _y + _h
      );
    
    }

    this.globalDirty = false;

    return this.global;
  
  }

}
