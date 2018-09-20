/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import * as GCO from './gco';
import * as LineConf from './line_conf';
import * as TextConf from './text_conf';

import { FillStyle } from './fill-style';
import { StrokeStyle } from './stroke-style';
import { ShadowStyle } from './shadow-style';
import { TextStyle } from './text-style';
import { PixelStyle } from './pixel-style';

export { FillStyle as Fill };
export { StrokeStyle as Stroke };
export { ShadowStyle as Shadow };
export { TextStyle as Text };
export { PixelStyle as Pixel };

export { GCO };

export { LineConf };
export { TextConf };

export const All = function ( _style ) {

  return {
    fill: new FillStyle( _style ? _style.fill : null ),
    stroke: new StrokeStyle( _style ? _style.stroke : null ),
    shadow: new ShadowStyle( _style ? _style.shadow : null ),
    text: new TextStyle( _style ? _style.text : null ),
    pixel: new PixelStyle( _style ? _style.pixel : null )
  };

};

export const FFSa = function ( _style ) {

  return {
    fill: new FillStyle( _style ? _style.fill : null ),
    stroke: new StrokeStyle( _style ? _style.stroke : null ),
    shadow: new ShadowStyle( _style ? _style.shadow : null )
  };

};

export const SSa = function ( _style ) {

  return {
    stroke: new StrokeStyle( _style ? _style.stroke : null ),
    shadow: new ShadowStyle( _style ? _style.shadow : null )
  };
  
};

export const FSa = function ( _style ) {

  return {
    fill: new FillStyle( _style ? _style.fill : null ),
    shadow: new ShadowStyle( _style ? _style.shadow : null )
  };
  
};

export const SaT = function ( _style ) {

  return {
    shadow: new ShadowStyle( _style ? _style.shadow : null ),
    text: new TextStyle( _style ? _style.text : null )
  };
  
};

export const P = function ( _style ) {

  return {
    pixel: new PixelStyle( _style ? _style.pixel : null )
  };
  
};
