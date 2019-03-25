/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Cache } from '../utility/cache';
import { Dispatcher } from '../event/dispatcher';
import { BasicTexture2D } from '../texture/basic-texture2d';

export class ImageLoader {

  /**
   * 
   * @param {object[]?} _objects 
   * @param {boolean?}  _createTextures 
   * @param {Function?} _onComplete 
   */
  constructor ( _objects, _createTextures, _onComplete ) {

    this.imageCache = new Cache( Image );
    this.basicTextureCache = new Cache( BasicTexture2D );
    this.onImageLoaded = new Dispatcher();
    this.onComplete = new Dispatcher();
    this.onError = new Dispatcher();
    this.toLoadCount = 0;
    this.loadedCount = 0;
    this.loading = false;
    this.createTextures = false;

    if ( _onComplete != null ) {

      this.onComplete.Once( _onComplete );
    
    }

    if ( _objects != null ) this.Load( _objects, _createTextures );
  
  }

  /**
   *
   * @param {object[]?} _objects 
   * @param {boolean?}  _createTextures 
   * 
   * @return {void}
   */
  Load ( _objects, _createTextures ) {

    if ( this.loading === false ) {

      this.loading = true;
      this.loadedCount = 0;
      this.toLoadCount = 0;
    
    }

    this.createTextures = !!_createTextures;

    const l = _objects.length;
    let item = _objects[ 0 ];

    this.toLoadCount += l;

    for ( var i = 0; i < _objects.length; item = _objects[ ++i ] ) {

      const image = new Image();

      image.onload = this.OnLoad.bind( this );
      image.onerror = this.OnError.bind( this );
      image.id = item.id;
      image.data = Object.create( null );
      image.data.w = item.w;
      image.data.h = item.h;
      image.data.fw = item.fw;
      image.data.fh = item.fh;
      image.src = item.src;

    }

  }

  /**
   * 
   * @param {Event} _event 
   * 
   * @return {void}
   */
  OnLoad ( _event ) {
  
    const t = _event.currentTarget;

    delete t.onload;
    delete t.onerror;

    this.imageCache.StoreSafe( t );

    if ( this.createTextures === true ) {

      this.basicTextureCache.StoreSafe( 
        new BasicTexture2D( t, null, t.data.w, t.data.h, t.data.fw, t.data.fh )
      );
    
    }

    this.onImageLoaded.Dispatch( t, { loadedCount: ++this.loadedCount } );

    if ( this.loadedCount === this.toLoadCount ) {

      this.loading = false;
      this.onComplete.Dispatch( this, { 
        imageCache: this.imageCache,
        basicTextureCache: this.basicTextureCache
      } );
    
    }

  }

  /**
   * 
   * @param {Event} _event 
   * 
   * @return {void}
   */
  OnError ( _event ) {

    this.onError.Dispatch( null, _event );
  
  }

  /**
   * 
   * @param {any} _id 
   * 
   * @return {Image|null}
   */
  GetImageById ( _id ) {

    return this.imageCache.GetById( _id );
  
  }

  /**
   * 
   * @param {any} _id
   * 
   * @return {BasicTexture2D|null} 
   */
  GetBasicTextureById ( _id ) {

    return this.basicTextureCache.GetById( _id );
  
  }

}
