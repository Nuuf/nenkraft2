/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Line2D as Line2DGeom } from '../geom/line/line2d';
import { SSa } from '../style';

export class Line2D extends Line2DGeom {

  constructor ( _sx, _sy, _ex, _ey, _style ) {

    super( _sx, _sy, _ex, _ey );

    this.programController = null;
    this.style = SSa( _style );
  
  }

  Render ( _rc ) {

    const s = this.s;
    const e = this.e;
    const style = this.style;
    
    _rc.beginPath();
    _rc.moveTo( s.x, s.y );
    _rc.lineTo( e.x, e.y );
    
    if ( style.shadow.applied === true ) style.shadow.Apply( _rc );

    if ( style.stroke.applied === true ) {

      style.stroke.Apply( _rc );
      _rc.stroke();
    
    }
  
  }

  GLRender ( _gl, _transform2d ) {

    if ( this.programController !== null ) {

      this.programController.Execute(
        _transform2d.globalTransform.AsArray( true ),
        this.s, this.e
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

    if ( pc !== null && pc.color !== null ) {

      pc.color.SetHex( this.style.stroke.color );
      pc.color.Normalize();
    
    }

    return this;
  
  }

}
