/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { PII } from '../math';
import { AssignIfUndefined } from '../utility';

export class Draw {

  /**
   * 
   * @param {object} _defaultOptions 
   */
  constructor ( _defaultOptions ) {

    this.defaultOptions = _defaultOptions;
  
  }

  /**
   * 
   * @param {object} _options 
   * 
   * @return {this}
   */
  PreDrawBase ( _options ) {

    if ( this.defaultOptions ) {

      AssignIfUndefined( this.defaultOptions, _options );

    }

    const rc = _options.rc;

    if ( _options.identity ) rc.setTransform( 1, 0, 0, 1, 0, 0 );
  
    rc.fillStyle = _options.fillStyle ? _options.fillStyle : 'rgb(100, 150, 200)';
    
    rc.globalAlpha = _options.globalAlpha ? _options.globalAlpha : 0.7;
    rc.shadowOffsetX = _options.shadowOffsetX ? _options.shadowOffsetX : 0;
    rc.shadowOffsetY = _options.shadowOffsetY ? _options.shadowOffsetY : 0;
    rc.shadowBlur = _options.shadowBlur ? _options.shadowBlur : 12;

    rc.globalCompositeOperation = 
      _options.globalCompositeOperation ? _options.globalCompositeOperation : 'source-over';
    rc.imageSmoothingEnabled = 
      _options.imageSmoothingEnabled ? _options.imageSmoothingEnabled : 'true';

    return this;

  }

  /**
   * 
   * @param {object} _options 
   * 
   * @return {this}
   */
  PreDrawText ( _options ) {

    const rc = _options.rc;

    rc.font = _options.font ? _options.font : '10px sans-serif';
    rc.textAlign = _options.textAlign ? _options.textAlign : 'start';
    rc.textBaseline = _options.textBaseline ? _options.textBaseline : 'alphabetic';
    rc.direction = _options.direction ? _options.direction : 'inherit';

    return this;

  }

  /**
   * 
   * @param {object} _options 
   * 
   * @return {this}
   */
  PreDrawStroke ( _options ) {

    const rc = _options.rc;

    rc.strokeStyle = _options.strokeStyle ? _options.strokeStyle : 'rgb(200, 150, 100)';
    rc.lineWidth = _options.lineWidth ? _options.lineWidth : 3;
    rc.linecap = _options.lineCap ? _options.lineCap : 'round';
    rc.lineJoin = _options.lineJoin ? _options.lineJoin : 'round';
    rc.miterLimit = _options.miterLimit ? _options.miterLimit : 10;
    rc.lineDashOffset = _options.lineDashOffset ? _options.lineDashOffset : 0;
    rc.setLineDash( _options.lineDash ? _options.lineDash : PS_ld );

    return this;

  }

  /**
   * 
   * @param {object} _options 
   * 
   * @return {this}
   */
  Rectangle ( _options ) {

    this.PreDrawBase( _options );
    if ( _options.stroke ) this.PreDrawStroke( _options );

    const rc = _options.rc;

    rc.beginPath();

    rc.rect( _options.x, _options.y, _options.w, _options.h );

    if ( _options.stroke ) rc.stroke();
    if ( _options.fill ) rc.fill();

    return this;

  }

  /**
   * 
   * @param {object} _options 
   * 
   * @return {this}
   */
  RoundRectangle ( _options ) {

    this.PreDrawBase( _options );
    if ( _options.stroke ) this.PreDrawStroke( _options );

    const rc = _options.rc;

    rc.beginPath();

    const x = _options.x;
    const y = _options.y;
    const r = _options.radius;
    const xw = x + _options.w;
    const yh = y + _options.h;

    rc.moveTo( x + r, y );
    rc.lineTo( xw - r, y );
    rc.quadraticCurveTo( xw, y, xw, y + r );
    rc.lineTo( xw, yh - r );
    rc.quadraticCurveTo( xw, yh, xw - r, yh );
    rc.lineTo( x + r, yh );
    rc.quadraticCurveTo( x, yh, x, yh - r );
    rc.lineTo( x, y + r );
    rc.quadraticCurveTo( x, y, x + r, y );

    if ( _options.stroke ) rc.stroke();
    if ( _options.fill ) rc.fill();

    return this;

  }

  /**
   * 
   * @param {object} _options 
   * 
   * @return {this}
   */
  AABB ( _options ) {

    this.PreDrawBase( _options );
    if ( _options.stroke ) this.PreDrawStroke( _options );

    const rc = _options.rc;

    rc.beginPath();

    rc.moveTo( _options.tl.x, _options.tl.y );
    rc.lineTo( _options.br.x, _options.tl.y );
    rc.lineTo( _options.br.x, _options.br.y );
    rc.lineTo( _options.tl.x, _options.br.y );

    rc.closePath();

    if ( _options.stroke ) rc.stroke();
    if ( _options.fill ) rc.fill();

    return this;

  }

  /**
   * 
   * @param {object} _options 
   * 
   * @return {this}
   */
  Circle ( _options ) {

    this.PreDrawBase( _options );
    if ( _options.stroke ) this.PreDrawStroke( _options );

    const rc = _options.rc;

    if ( !_options.continue ) {

      rc.beginPath();

    }

    rc.arc(
      _options.center.x,
      _options.center.y,
      _options.radius,
      0,
      PII,
      false
    );

    if ( _options.stroke ) rc.stroke();
    if ( _options.fill ) rc.fill();

    return this;

  }

  /**
   * 
   * @param {object} _options 
   * 
   * @return {this}
   */
  Ellipse ( _options ) {

    this.PreDrawBase( _options );
    if ( _options.stroke ) this.PreDrawStroke( _options );

    const rc = _options.rc;

    if ( !_options.continue ) {

      rc.beginPath();

    }

    rc.ellipse( 
      _options.center.x, 
      _options.center.y,
      _options.radiusX,
      _options.radiusY,
      0,
      PII,
      false
    );

    if ( _options.stroke ) rc.stroke();
    if ( _options.fill ) rc.fill();

    return this;

  }

  /**
   * 
   * @param {object} _options 
   * 
   * @return {this}
   */
  Line ( _options ) {

    this.PreDrawBase( _options );
    if ( _options.stroke ) this.PreDrawStroke( _options );

    const rc = _options.rc;

    if ( !_options.continue ) {

      rc.beginPath();
      rc.moveTo( _options.s.x, _options.s.y );
  
    }

    rc.lineTo( _options.e.x, _options.e.y );

    if ( _options.stroke ) rc.stroke();

    return this;

  }

  /**
   * 
   * @param {object} _options 
   * 
   * @return {this}
   */
  LineChain ( _options ) {

    this.PreDrawBase( _options );
    if ( _options.stroke ) this.PreDrawStroke( _options );

    const rc = _options.rc;
    const points = _options.points;

    rc.beginPath();

    rc.moveTo( points[ 0 ].x, points[ 0 ].y );

    for ( var i = 1; i < points.length; ++i ) {

      rc.lineTo( points[ i ].x, points[ i ].y );
    
    }

    if ( _options.close ) rc.closePath();

    if ( _options.stroke ) rc.stroke();
    if ( _options.fill ) rc.fill();

    return this;

  }

  /**
   * 
   * @param {object} _options 
   * 
   * @return {this}
   */
  Arc ( _options ) {

    this.PreDrawBase( _options );
    if ( _options.stroke ) this.PreDrawStroke( _options );

    const rc = _options.rc;

    if ( !_options.continue ) {

      rc.beginPath();
  
    }

    rc.arc( 
      _options.center.x, 
      _options.center.y, 
      _options.radius, 
      _options.startAngle, 
      _options.endAngle, 
      _options.anticlockwise
    );
  
    if ( _options.close ) rc.closePath();

    if ( _options.stroke ) rc.stroke();
    if ( _options.fill ) rc.fill();

    return this;

  }

  /**
   * 
   * @param {object} _options 
   * 
   * @return {this}
   */
  EllipticArc ( _options ) {

    this.PreDrawBase( _options );
    if ( _options.stroke ) this.PreDrawStroke( _options );

    const rc = _options.rc;

    if ( !_options.continue ) {

      rc.beginPath();
  
    }

    rc.ellipse( 
      _options.center.x, 
      _options.center.y, 
      _options.radiusX,
      _options.radiusY,
      _options.startAngle, 
      _options.endAngle, 
      _options.anticlockwise
    );
  
    if ( _options.close ) rc.closePath();

    if ( _options.stroke ) rc.stroke();
    if ( _options.fill ) rc.fill();

    return this;

  }

  /**
   * 
   * @param {object} _options 
   * 
   * @return {this}
   */
  Curve ( _options ) {

    this.PreDrawBase( _options );
    if ( _options.stroke ) this.PreDrawStroke( _options );

    const rc = _options.rc;

    if ( !_options.continue ) {

      rc.beginPath();
      rc.moveTo( _options.s.x, _options.s.y );
  
    }

    rc.arcTo(
      _options.c1.x,
      _options.c1.y,
      _options.e.x,
      _options.e.y,
      _options.radius
    );

    if ( _options.close ) rc.closePath();

    if ( _options.stroke ) rc.stroke();
    if ( _options.fill ) rc.fill();

    return this;

  }

  /**
   * 
   * @param {object} _options 
   * 
   * @return {this}
   */
  BezierCurve ( _options ) {

    this.PreDrawBase( _options );
    if ( _options.stroke ) this.PreDrawStroke( _options );

    const rc = _options.rc;

    if ( !_options.continue ) {

      rc.beginPath();
      rc.moveTo( _options.s.x, _options.s.y );
  
    }

    rc.bezierCurveTo(
      _options.c1.x,
      _options.c1.y,
      _options.c2.x,
      _options.c2.y,
      _options.e.x,
      _options.e.y
    );

    if ( _options.close ) rc.closePath();

    if ( _options.stroke ) rc.stroke();
    if ( _options.fill ) rc.fill();

    return this;

  }

  /**
   * 
   * @param {object} _options 
   * 
   * @return {this}
   */
  QuadraticCurve ( _options ) {

    this.PreDrawBase( _options );
    if ( _options.stroke ) this.PreDrawStroke( _options );

    const rc = _options.rc;

    if ( !_options.continue ) {

      rc.beginPath();
      rc.moveTo( _options.s.x, _options.s.y );
  
    }

    rc.quadraticCurveTo(
      _options.c1.x,
      _options.c1.y,
      _options.e.x,
      _options.e.y
    );

    if ( _options.close ) rc.closePath();

    if ( _options.stroke ) rc.stroke();
    if ( _options.fill ) rc.fill();

    return this;

  }

}

// Private Static ----->
const PS_ld = [];
// <----- Private Static
