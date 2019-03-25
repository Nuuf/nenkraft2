/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Cache } from '../utility/cache';
import { Dispatcher } from '../event/dispatcher';
import { XHRLoader } from './xhr-loader';
import { ImageLoader } from './image-loader';
import { Tileset } from '../texture/tileset';

export class TilesetLoader {

  /**
   * 
   * @param {object[]?}  _objects 
   * @param {Function?} _onComplete 
   */
  constructor ( _objects, _onComplete ) {

    this.tilesetCache = new Cache( Tileset );
    this.mapDataLoader = new XHRLoader();
    this.setDataLoader = new XHRLoader();
    this.imageLoader = new ImageLoader();
    this.onComplete = new Dispatcher();
    this.onTilesetLoaded = new Dispatcher();
    this.toLoadCount = 0;
    this.loadedCount = 0;
    this.loading = false;

    this.mapDataLoader.onXHRLoaded.Add( this.OnPartMapDataLoaded, this );
    this.setDataLoader.onXHRLoaded.Add( this.OnPartSetDataLoaded, this );
    this.imageLoader.onImageLoaded.Add( this.OnPartImageLoaded, this );

    if ( _onComplete != null ) {

      this.onComplete.Once( _onComplete );
    
    }

    if ( _objects != null ) this.Load( _objects );
  
  }

  /**
   * 
   * @param {object[]?} _objects 
   * 
   * @return {void}
   */
  Load ( _objects ) {

    if ( this.loading === false ) {

      this.loading = true;
      this.loadedCount = 0;
      this.toLoadCount = 0;
    
    }

    const l = _objects.length;
    let item = _objects[ 0 ];

    this.toLoadCount += l;

    const mapData = [];
    const setData = [];
    const image = [];

    for ( var i = 0; i < _objects.length; item = _objects[ ++i ] ) {

      item.mapData.id = item.setData.id = item.image.id = item.id;
      mapData.push( item.mapData );
      setData.push( item.setData );
      image.push( item.image );

    }

    this.mapDataLoader.Load( mapData );
    this.setDataLoader.Load( setData );
    this.imageLoader.Load( image, true );
  
  }

  /**
   * 
   * @param {any} _id 
   * 
   * @return {void}
   */
  OnTilesetLoaded ( _id ) {

    const texture = this.imageLoader.GetBasicTextureById( _id );
    const mapData = this.mapDataLoader.GetDataById( _id );
    const setData = this.setDataLoader.GetDataById( _id );
    const tileset = new Tileset( texture, mapData, setData );

    this.tilesetCache.StoreSafe( tileset );

    this.onTilesetLoaded.Dispatch( tileset, { loadedCount: ++this.loadedCount } );

    if ( this.loadedCount === this.toLoadCount ) {

      this.loading = false;
      this.onComplete.Dispatch( this, {
        spritesheetCache: this.spritesheetCache
      } );
    
    }
  
  }

  /**
   * 
   * @param {Event} _event
   * 
   * @return {void} 
   */
  OnPartMapDataLoaded ( _event ) {

    const id = _event.target.data.id;

    if ( 
      this.imageLoader.imageCache.Contains( null, id ) &&
      this.setDataLoader.dataCache.Contains( null, id )
    ) {

      this.OnTilesetLoaded( id );
    
    }

  }

  /**
   *
   * @param {Event} _event
   *
   * @return {void} 
   */
  OnPartSetDataLoaded ( _event ) {

    const id = _event.target.data.id;

    if ( 
      this.imageLoader.imageCache.Contains( null, id ) &&
      this.mapDataLoader.dataCache.Contains( null, id )
    ) {

      this.OnTilesetLoaded( id );
    
    }
  
  }

  /**
   * 
   * @param {Event} _event
   * 
   * @return {void} 
   */
  OnPartImageLoaded ( _event ) {

    const id = _event.target.id;

    if ( 
      this.mapDataLoader.dataCache.Contains( null, id ) &&
      this.setDataLoader.dataCache.Contains( null, id )
    ) {

      this.OnTilesetLoaded( id );
    
    }
  
  }

  /**
   * 
   * @param {any} _id
   * 
   * @return {Tileset|null} 
   */
  GetTilesetById ( _id ) {

    return this.tilesetCache.GetById( _id );
  
  }

}
