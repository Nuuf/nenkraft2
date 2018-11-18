/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { AABB2D as AABB2DGeom } from '../geom/aabb/aabb2d';
import { FFSa } from '../style';

export class AABB2D extends AABB2DGeom {

  constructor ( _tlx, _tly, _brx, _bry, _style ) {

    super( _tlx, _tly, _brx, _bry );
    
    this.programController = null;
    this.style = FFSa( _style );
  
  }

  Render ( _rc ) {

    const tl = this.tl;
    const br = this.br;
    const style = this.style;

    _rc.beginPath();
    _rc.moveTo( tl.x, tl.y );
    _rc.lineTo( br.x, tl.y );
    _rc.lineTo( br.x, br.y );
    _rc.lineTo( tl.x, br.y );
    _rc.closePath();

    if ( style.shadow.applied === true ) style.shadow.Apply( _rc );

    if ( style.fill.applied === true ) {

      style.fill.Apply( _rc );
      _rc.fill();
    
    }

    if ( style.stroke.applied === true ) {

      style.stroke.Apply( _rc );
      _rc.stroke();
    
    }
  
  }

  GLRender ( _gl, _transform2d ) {

    if ( this.programController !== null ) {

      this.programController.Execute(
        _transform2d.globalTransform.AsArray( true ),
        this.tl.x, this.tl.y, this.w, this.h
      );
      
    }
  
  }

  LinkProgramController ( _pc ) {

    this.programController = _pc;
    this.LinkStyle();

    return this;
  
  }

  UseProgramController ( _pc ) {

    this.programController = _pc;
    
    return this;
  
  }

  LinkStyle () {

    const pc = this.programController;

    if ( pc !== null && pc.fillColor !== null && pc.outlineColor !== null && pc.outline !== null ) {

      pc.fillColor.SetHex( this.style.fill.color );
      pc.fillColor.Normalize();
      pc.outlineColor.SetHex( this.style.stroke.color );
      pc.outlineColor.Normalize();
      pc.outline = this.style.stroke.lineWidth + 0.2;
    
    }

    return this;
  
  }

}
