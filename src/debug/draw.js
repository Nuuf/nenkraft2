/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export const AABB2D = function ( _rc, _aabb2d, _options ) {

  _rc.setTransform( 1, 0, 0, 1, 0, 0 );
  _rc.globalAlpha = 0.25;
  _rc.strokeStyle = 'rgba(255, 0, 255, 1)';
  _rc.fillStyle = 'rgba(0, 255, 0, 1)';

  if ( _options != null ) {

    if ( _options.alpha != null ) {

      _rc.globalAlpha = _options.alpha;

    }

    if ( _options.strokeStyle != null ) {

      _rc.strokeStyle = _options.strokeStyle;
    
    }

    if ( _options.fillStyle != null ) {

      _rc.fillStyle = _options.fillStyle;
    
    }
  
  }

  _rc.lineWidth = 2;
  _rc.beginPath();
  _rc.moveTo( _aabb2d.tl.x, _aabb2d.tl.y );
  _rc.lineTo( _aabb2d.br.x, _aabb2d.tl.y );
  _rc.lineTo( _aabb2d.br.x, _aabb2d.br.y );
  _rc.lineTo( _aabb2d.tl.x, _aabb2d.br.y );
  _rc.closePath();

  if ( _options != null ) {

    if ( _options.noStroke == null ) {

      _rc.stroke();
    
    }

    if ( _options.noFill == null ) {

      _rc.fill();
    
    }

  } else {

    _rc.stroke();
    _rc.fill();
  
  }

};
