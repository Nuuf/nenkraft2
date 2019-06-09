/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Cache } from '../utility/cache';
import { Dispatcher } from '../event/dispatcher';
import { XHRLoader } from './xhr-loader';
import { ImageLoader } from './image-loader';
import { Spritesheet } from '../texture/spritesheet';

export class SpritesheetLoader {

  /**
   * 
   * @param {object[]?}  _objects 
   * @param {Function?} _onComplete 
   */
  constructor ( _objects, _onComplete ) {

    this.spritesheetCache = new Cache( Spritesheet );
    this.xhrLoader = new XHRLoader();
    this.imageLoader = new ImageLoader();
    this.onComplete = new Dispatcher();
    this.onSpritesheetLoaded = new Dispatcher();
    this.toLoadCount = 0;
    this.loadedCount = 0;
    this.loading = false;

    this.xhrLoader.onXHRLoaded.Add( this.OnPartXHRLoaded, this );
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
    let [ item ] = _objects;

    this.toLoadCount += l;

    const data = [];
    const image = [];

    for ( var i = 0; i < _objects.length; item = _objects[ ++i ] ) {

      item.data.id = item.image.id = item.id;
      data.push( item.data );
      image.push( item.image );

    }

    this.xhrLoader.Load( data );
    this.imageLoader.Load( image, true );
  
  }

  /**
   * 
   * @param {any} _id 
   * 
   * @return {void}
   */
  OnSpritesheetLoaded ( _id ) {

    const texture = this.imageLoader.GetBasicTextureById( _id );
    const data = this.xhrLoader.GetDataById( _id );
    const spritesheet = new Spritesheet( texture, data );

    this.spritesheetCache.StoreSafe( spritesheet );

    this.onSpritesheetLoaded.Dispatch( spritesheet, { loadedCount: ++this.loadedCount } );

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
  OnPartXHRLoaded ( _event ) {

    const { id } = _event.target.data;

    if ( this.imageLoader.imageCache.Contains( null, id ) ) {

      this.OnSpritesheetLoaded( id );

    }

  }

  /**
   * 
   * @param {Event} _event
   * 
   * @return {void} 
   */
  OnPartImageLoaded ( _event ) {
  
    const { id } = _event.target;

    if ( this.xhrLoader.dataCache.Contains( null, id ) ) {

      this.OnSpritesheetLoaded( id );

    }
  
  }

  /**
   * 
   * @param {any} _id
   * 
   * @return {Spritesheet|null} 
   */
  GetSpritesheetById ( _id ) {

    return this.spritesheetCache.GetById( _id );
  
  }

}
