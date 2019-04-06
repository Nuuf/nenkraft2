/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { TextureEntity2D } from './texture-entity2d';
import { Tile } from './tile';
import { IsBitSet, ClearBit } from '../utility';

export class Tilemap extends TextureEntity2D {

  /**
   * 
   * @param {number}   _x 
   * @param {number}   _y 
   * @param {Tileset}  _tileset 
   * @param {number}   _layerIndex 
   * @param {integer?} _unitId 
   */
  constructor ( _x, _y, _tileset, _layerIndex, _unitId ) {

    super( _x, _y, _tileset.pc || _tileset.basicTexture, _unitId );
    
    this.w = 0;
    this.h = 0;
    this.tileW = 0;
    this.tileH = 0;
    this.columns = 0;
    this.cull = false;
    this.tiles = [];
    this.tileset = _tileset;

    this.Config( _tileset.mapData );
    this.SetMapLayer( _tileset.mapData.layers[ _layerIndex ] );
  
  }

  /**
   * 
   * @param {object} _mapData 
   * 
   * @return {void}
   */
  Config ( _mapData ) {

    this.tileW = _mapData.tilewidth;
    this.tileH = _mapData.tileheight;
    this.w = this.tileW * _mapData.width;
    this.h = this.tileH * _mapData.height;
    this.columns = ( this.w / this.tileW ) | 0;
  
  }

  /**
   * 
   * @param {object} _layer 
   * 
   * @return {void}
   */
  SetMapLayer ( _layer ) {

    const data = _layer.data;

    if ( _layer.width * _layer.height !== data.length ) {

      throw new Error( PS_MAPDATA_SIZE_ERROR );
    
    }

    this.tiles.length = 0;
    this.alpha = _layer.opacity;

    if ( this.tileset.mapData.orientation === PS_ORTHOGONAL ) {

      this.SetOrthogonal( data );
    
    }
  
  }

  /**
   * 
   * @param {Culler2D} _culler 
   * 
   * @return {void}
   */
  Cull ( _culler ) {

    this.culler = _culler;
    this.cull = true;
  
  }

  /**
   * 
   * @param {object} _data 
   * 
   * @return {void}
   */
  SetOrthogonal ( _data ) {

    const attributes = this.tileset.setData.tileset.attributes;
    const l = _data.length;
    const tileW = this.tileW;
    const tileH = this.tileH;
    const texColumns = attributes.columns;
    const spacing = parseInt( attributes.spacing );
    const margin = parseInt( attributes.margin );
    const columns = this.columns;
    const tscaleX = tileW / this.texture.fw;
    const tscaleY = tileH / this.texture.fh;
    let tileIndex = 0;
    let index = 0;
    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let texRow = 0;
    let texCol = 0;

    for ( var i = 0; i < l; ++i ) {

      index = _data[ i ];

      if ( index === 0 ) continue;

      tileIndex = ClearBit( 31, ClearBit( 30, ClearBit( 29, index ) ) ) - 1;

      texCol = ( tileIndex % texColumns );
      texRow = ( ( tileIndex / texColumns ) | 0 );
      
      x = ( i % columns ) * tileW;
      y = ( ( i / columns ) | 0 ) * tileH ;

      cx = ( texCol * tileW ) + ( texCol * spacing ) + margin;
      cy = ( texRow * tileH ) + ( texRow * spacing ) + margin;

      this.tiles.push( new Tile(
        tileIndex, x, y, cx, cy,
        IsBitSet( 31, index ), IsBitSet( 30, index ), IsBitSet( 29, index ),
        tileW, tileH, tscaleX, tscaleY
      ) );

    }
  
  }

  /**
   * 
   * @param {CanvasRenderingContext2D} _rc 
   * 
   * @return {void}
   */
  Render ( _rc ) {

    this.PreRender( _rc );

    if ( this.render === true ) {

      this.ProcessTransform( this.parent );

      if ( this.display === true ) {

        if ( this.cull === true ) {

          this.CullRender( _rc );
        
        } else {

          this.NoCullRender( _rc );
        
        }

        if ( this.children.length > 0 ) {

          this.RenderChildren( _rc );
      
        }
      
      }
    
    }

    this.PostRender( _rc );

  }

  /**
   * 
   * @param {WebGLRenderingContext|WebGL2RenderingContext} _gl 
   * 
   * @return {void}
   */
  GLRender ( _gl ) {

    this.GLPreRender( _gl );

    if ( this.render === true ) {

      this.ProcessTransform( this.parent );

      if ( this.display === true ) {

        if ( this.cull === true ) {

          this.GLCullRender( _gl );
        
        } else {

          this.GLNoCullRender( _gl );
        
        }

        if ( this.children.length > 0 ) {

          this.GLRenderChildren( _gl );
      
        }
      
      }
    
    }

    this.GLPostRender( _gl );

  }

  /**
   * 
   * @param {CanvasRenderingContext2D} _rc 
   * 
   * @return {void}
   */
  CullRender ( _rc ) {

    const image = this.texture.image;
    const tiles = this.tiles;
    const tileW = this.tileW;
    const tileH = this.tileH;
    const culler = this.culler;
    const cBounds = culler.bounds;
    const cm = culler.conversionMatrix;
    let tile = tiles[ 0 ];

    for ( var i = 0; i < tiles.length; tile = tiles[ ++i ] ) {

      tile.ProcessTransform( this );

      if ( cBounds.IntersectsAABB2D( tile.ComputeGlobalBounds( null, cm ) ) ) {

        tile.transform.ApplyGlobal( _rc );

        _rc.drawImage(
          image, 
          tile.clipX, tile.clipY,
          tileW, tileH,
          tile.textureTranslation.e, tile.textureTranslation.f,
          tileW, tileH
        );
      
      }

    }
  
  }

  /**
   * 
   * @param {CanvasRenderingContext2D} _rc 
   * 
   * @return {void}
   */
  NoCullRender ( _rc ) {

    const image = this.texture.image;
    const tiles = this.tiles;
    const tileW = this.tileW;
    const tileH = this.tileH;
    let tile = tiles[ 0 ];

    for ( var i = 0; i < tiles.length; tile = tiles[ ++i ] ) {

      tile.ProcessTransform( this );

      tile.transform.ApplyGlobal( _rc );

      _rc.drawImage(
        image, 
        tile.clipX, tile.clipY,
        tileW, tileH,
        tile.textureTranslation.e, tile.textureTranslation.f,
        tileW, tileH
      );

    }
  
  }

  /**
   * 
   * 
   * @return {void}
   */
  GLCullRender () {

    const pc = this.programController;
    const uniformId = this.texture.uniformId;
    const tint = this.tint.channel;
    const tiles = this.tiles;
    const culler = this.culler;
    const cBounds = culler.bounds;
    const cm = culler.conversionMatrix;
    let tile = tiles[ 0 ];

    for ( var i = 0; i < tiles.length; tile = tiles[ ++i ] ) {

      tile.ProcessTransform( this );

      if ( cBounds.IntersectsAABB2D( tile.ComputeGlobalBounds( null, cm ) ) ) {

        pc.Execute(
          tile.transform.globalTransform.AsArray( true ),
          tile.textureTranslation.AsArray( true ),
          tile.textureTransformation.AsArray( true ),
          tint,
          uniformId
        );
      
      }

    }
  
  }

  /**
   * 
   * 
   * @return {void}
   */
  GLNoCullRender () {

    const pc = this.programController;
    const uniformId = this.texture.uniformId;
    const tint = this.tint.channel;
    const tiles = this.tiles;
    let tile = tiles[ 0 ];

    for ( var i = 0; i < tiles.length; tile = tiles[ ++i ] ) {

      tile.ProcessTransform( this );

      pc.Execute(
        tile.transform.globalTransform.AsArray( true ),
        tile.textureTranslation.AsArray( true ),
        tile.textureTransformation.AsArray( true ),
        tint,
        uniformId
      );

    }
  
  }

}

// Private Static ----->
const PS_MAPDATA_SIZE_ERROR = 'Size error!';
const PS_ORTHOGONAL = 'orthogonal';
// <----- Private Static
