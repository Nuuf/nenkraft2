/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { IsObjectEmpty } from '.';

const Ceil = Math.ceil;

export function GenerateSimpleBase64PNG ( 
  _renderFunction, _backgroundColor, _forceWidth, _forceHeight
) {

  const drawable = _renderFunction();

  if ( PS_canvas == null ) {

    PS_canvas = document.createElement( 'canvas' );
    PS_canvasrc = PS_canvas.getContext( '2d' );
    
  }

  PS_canvas.width = Ceil( drawable.width ) ;
  PS_canvas.height = Ceil( drawable.height );

  if ( _forceWidth != null ) {

    PS_canvas.width = _forceWidth;
    
  }

  if ( _forceHeight != null ) {

    PS_canvas.height = _forceHeight;
    
  }

  if ( _backgroundColor != null ) {

    PS_canvasrc.fillStyle = _backgroundColor;
    PS_canvasrc.fillRect( 0, 0, PS_canvas.width, PS_canvas.height );

  } else {

    PS_canvasrc.clearRect( 0, 0, PS_canvas.width, PS_canvas.height );
  
  }

  PS_canvasrc.setTransform( 1, 0, 0, 1, 0, 0 );
  drawable.Render( PS_canvasrc );

  return PS_canvas.toDataURL( 'image/png' );

}

export function ImageFromDataURL ( _url, _onLoad, _w, _h ) {

  const image = new Image();

  if ( _w ) image.width = _w;
  if ( _h ) image.height = _h;
  image.onload = _onLoad;
  image.src = _url;

  return image;

}

export function ParsedXMLToJSON ( _xml, _deleteWhitespace ) {

  let i;
  let attrs;
  let attr;
  let child;
  let pchild;
  let temp;
  let o = {};
  const children = _xml.childNodes;
  let l = children.length;

  if ( _xml.nodeType === 1 ) {

    attrs = _xml.attributes;
    l = attrs.length;

    if ( l > 0 ) {

      o.attributes = {};

      for ( i = 0, attr = attrs.item( i ); i < l; attr = attrs.item( ++i ) ) {

        o.attributes[ attr.nodeName ] = attr.nodeValue;
        
      }
      
    }
    
  } else if ( _xml.nodeType === 3 ) {

    if ( ! /^\s*$/g.exec( _xml.nodeValue ) ) {

      o = _xml.nodeValue;

      if ( _deleteWhitespace === true ) {

        o = o.replace( /^\s+|\s+&|\n/gmi, '' );
        
      }
      
    }
    
  }

  if ( children != null ) {

    l = children.length;

    for ( i = 0, child = children.item( i ); i < l; child = children.item( ++i ) ) {

      if ( o[ child.nodeName ] === undefined ) {

        o[ child.nodeName ] = ParsedXMLToJSON( child, _deleteWhitespace );
        
      } else {

        if ( o[ child.nodeName ].push === undefined ) {

          temp = o[ child.nodeName ];
          o[ child.nodeName ] = [];

          if ( !IsObjectEmpty( temp ) ) {

            o[ child.nodeName ].push( temp );
            
          }
          
        }

        pchild = ParsedXMLToJSON( child, _deleteWhitespace );

        if ( !IsObjectEmpty( pchild ) ) {

          o[ child.nodeName ].push( pchild );
          
        }
        
      }
      
    }
    
  }

  if ( o[ '#text' ] && o[ '#text' ].length === 0 ) {

    delete o[ '#text' ];
    
  }

  return o;

}

export function XMLToJSON ( _xml, _deleteWhitespace ) {

  if ( PS_dparser == null ) {

    PS_dparser = new DOMParser();
  
  }

  return ParsedXMLToJSON( PS_dparser.parseFromString( _xml, 'text/xml' ), _deleteWhitespace );

}

export function DownloadAsJSON ( _obj, _fileName ) {

  const url = 'data:text/json;charset=utf-8,' + encodeURIComponent( JSON.stringify( _obj ) );
  const a = document.createElement( 'a' );

  a.setAttribute( 'href', url );
  a.setAttribute( 'download', _fileName + '.json' );
  a.click();

}

// Private Static ----->
let PS_canvas;
let PS_canvasrc;
let PS_dparser;
// <----- Private Static
