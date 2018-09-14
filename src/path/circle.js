/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Circle as CircleGeom } from '../geom/circle';
import { PII } from '../math';
import { FFSa } from '../style';

export class Circle extends CircleGeom {

  constructor ( _x, _y, _radius, _style ) {

    super( _x, _y, _radius );
    this.programController = null;
    this.style = FFSa( _style );
  
  }

  Draw ( _rc ) {

    const center = this.center;
    const style = this.style;
    
    _rc.beginPath();
    _rc.arc( center.x, center.y, this.radius, 0, PII, false );
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

  GLDraw ( _gl, _transform2d ) {

    if ( this.programController !== null ) {

      this.programController.Execute(
        _transform2d.globalTransform.AsArray( true ),
        this.center.x, this.center.y, this.radius
      );
      
    }
  
  }

  LinkProgramController ( _pc ) {

    this.programController = _pc;
    this.LinkStyle();
  
  }

  UseProgramController ( _pc ) {

    this.programController = _pc;
  
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
  
  }

}
