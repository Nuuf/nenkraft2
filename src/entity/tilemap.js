/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { TextureEntity2D } from './texture-entity2d';
import { Tile } from './tile';
import { IsBitSet, ClearBit } from '../utility';

export class Tilemap extends TextureEntity2D {

  constructor ( _x, _y, _texture, _mapData, _layerIndex, _unitId ) {

    super( _x, _y, _texture, _unitId );
    
    this.w = 0;
    this.h = 0;
    this.tileW = 0;
    this.tileH = 0;
    this.columns = 0;
    this.cull = false;
    this.tiles = [];
    this.mapData = _mapData;

    this.Config( _mapData );
    this.SetMapLayer( _mapData.layers[ _layerIndex ] );
  
  }

  Config ( _mapData ) {

    this.tileW = _mapData.tilewidth;
    this.tileH = _mapData.tileheight;
    this.w = this.tileW * _mapData.width;
    this.h = this.tileH * _mapData.height;
    this.columns = ( this.w / this.tileW ) | 0;
  
  }

  SetMapLayer ( _layer ) {

    const data = _layer.data;

    if ( _layer.width * _layer.height !== data.length ) throw new Error( PS_MAPDATA_SIZE_ERROR );

    this.tiles.length = 0;
    this.alpha = _layer.opacity;

    if ( this.mapData.orientation === PS_ORTHOGONAL ) {

      this.SetOrthogonal( data );
    
    }
  
  }

  Cull ( _culler ) {

    this.culler = _culler;
    this.cull = true;
  
  }

  SetOrthogonal ( _data ) {

    const l = _data.length;
    const tileW = this.tileW;
    const tileH = this.tileH;
    const texColumns = ( this.texture.fw / tileW ) | 0;
    const columns = ( this.w / tileW ) | 0;
    const tscaleX = tileW / this.texture.fw;
    const tscaleY = tileH / this.texture.fh;
    let tileIndex = 0;
    let index = 0;
    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;

    for ( var i = 0; i < l; ++i ) {

      index = _data[ i ];

      if ( index === 0 ) continue;

      tileIndex = ClearBit( 31, ClearBit( 30, ClearBit( 29, index ) ) ) - 1;
      
      x = ( i % columns ) * ( tileW );
      y = ( ( i / columns ) | 0 ) * ( tileH );
      cx = ( tileIndex % texColumns ) * ( tileW ); 
      cy = ( ( tileIndex / texColumns ) | 0 ) * ( tileH );

      this.tiles.push( new Tile(
        tileIndex, x, y, cx, cy,
        IsBitSet( 31, index ), IsBitSet( 30, index ), IsBitSet( 29, index ),
        tileW, tileH, tscaleX, tscaleY
      ) );

    }
  
  }

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

  CullRender ( _rc ) {

    const image = this.texture.image;
    const tiles = this.tiles;
    const tileW = this.tileW;
    const tileH = this.tileH;
    const culler = this.culler;
    const cBoundsTL = culler.bounds.tl;
    const cBoundsBR = culler.bounds.br;
    const rme = culler.rootMatrix.e;
    const rmf = culler.rootMatrix.f;
    const rma = culler.rootMatrix.a;
    const rmd = culler.rootMatrix.d;
    let tile = tiles[ 0 ];
    let tgpos = null;

    for ( var i = 0; i < tiles.length; tile = tiles[ ++i ] ) {

      tile.ProcessTransform( this );

      tgpos = tile.GetGlobalPosition();

      tgpos.Subtract( rme, rmf );
      tgpos.Divide( rma, rmd );

      /*
       * w & h are disposed as a simple performance "boost"
       * and should be applied in the culler bounds
       */

      if ( 
        tgpos.x > cBoundsBR.x ||
        tgpos.y > cBoundsBR.y ||
        tgpos.x < cBoundsTL.x ||
        tgpos.y < cBoundsTL.y
      ) {

        continue;
      
      }

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

  GLCullRender () {

    const pc = this.programController;
    const uniformId = this.texture.uniformId;
    const tint = this.tint.channel;
    const tiles = this.tiles;
    const culler = this.culler;
    const cBoundsTL = culler.bounds.tl;
    const cBoundsBR = culler.bounds.br;
    const rme = culler.rootMatrix.e;
    const rmf = culler.rootMatrix.f;
    const rma = culler.rootMatrix.a;
    const rmd = culler.rootMatrix.d;
    let tile = tiles[ 0 ];
    let tgpos = null;

    for ( var i = 0; i < tiles.length; tile = tiles[ ++i ] ) {

      tile.ProcessTransform( this );

      tgpos = tile.GetGlobalPosition(); 

      tgpos.Subtract( rme, rmf );
      tgpos.Divide( rma, rmd );

      if ( 
        tgpos.x > cBoundsBR.x ||
        tgpos.y > cBoundsBR.y ||
        tgpos.x < cBoundsTL.x ||
        tgpos.y < cBoundsTL.y
      ) {

        continue;
      
      }

      pc.Execute(
        tile.transform.globalTransform.AsArray( true ),
        tile.textureTranslation.AsArray( true ),
        tile.textureTransformation.AsArray( true ),
        tint,
        uniformId
      );

    }
  
  }

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
