/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

'use strict';

import ShaderTexture2D from './texture2d.shader';
import ShaderTexture2DBatch from './texture2d-batch.shader';
import ShaderPixelPatch from './pixel-batch.shader';
import ShaderRectangle from './rectangle.shader';
import ShaderCircle from './circle.shader';
import ShaderLine2D from './line2d.shader';

const Parse = function ( _data ) {

  let s;
  let e;
  const vS = '@vertex@';
  const vE = '@vertex-end@';
  const fS = '@fragment@';
  const fE = '@fragment-end@';

  s = _data.indexOf( vS ) + vS.length;
  e = _data.indexOf( vE );

  const vShader = _data.substring( s, e );

  s = _data.indexOf( fS ) + fS.length;
  e = _data.indexOf( fE );

  const fShader = _data.substring( s, e );

  return { vertex: vShader, fragment: fShader };

};

export const TEXTURE_2D = Parse( ShaderTexture2D );
export const TEXTURE_2D_BATCH = Parse( ShaderTexture2DBatch );
export const PIXEL_BATCH = Parse( ShaderPixelPatch );
export const RECTANGLE = Parse( ShaderRectangle );
export const CIRCLE = Parse( ShaderCircle );
export const LINE2D = Parse( ShaderLine2D );
