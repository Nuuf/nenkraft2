/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Cache } from '../utility/cache';
import { Dispatcher } from '../event/dispatcher';
import { BasicTexture2D } from '../texture/basic-texture2d';

export class ImageLoader {

  constructor ( _objects, _createTextures, _onComplete ) {

    this.imageCache = new Cache( Image );
    this.basicTextureCache = new Cache( BasicTexture2D );
    this.onImageLoaded = new Dispatcher();
    this.onComplete = new Dispatcher();
    this.onError = new Dispatcher();
    this.count = 0;
    this.loading = false;
    this.toLoad = null;
    this.createTextures = false;

    if ( _onComplete != null ) {

      this.onComplete.Once( _onComplete );
    
    }

    if ( _objects != null ) this.Load( _objects, _createTextures );
  
  }

  Load ( _objects, _createTextures ) {

    if ( this.toLoad === null ) this.toLoad = [];
    
    this.toLoad.push.apply( this.toLoad, _objects );

    if ( _createTextures != null ) {

      this.createTextures = _createTextures;
    
    }

    if ( this.loading === false ) {

      this.count = 0;
      this.loading = true;
      this.Haul( this.count );
    
    }
  
  }

  Haul ( _count ) {

    const item = this.toLoad[ _count ];

    if ( item != null ) {

      const image = new Image();

      image.onload = this.OnLoad.bind( this );
      image.onerror = this.OnError.bind( this );
      image.src = item.src;
      image.id = item.id;
      image.data = Object.create( null );
      image.data.w = item.w;
      image.data.h = item.h;
      image.data.fw = item.fw;
      image.data.fh = item.fh;
    
    } else {

      this.count = 0;
      this.loading = false;
      this.toLoad = null;
      this.onComplete.Dispatch( this, { imageCache: this.imageCache, basicTextureCache: this.basicTextureCache } );
    
    }
  
  }

  OnLoad ( _event ) {

    const t = _event.currentTarget;

    t.onload = null;
    t.onerror = null;
    this.imageCache.StoreSafe( t );

    if ( this.createTextures === true ) {

      this.basicTextureCache.StoreSafe( new BasicTexture2D( t, null, t.data.w, t.data.h, t.data.fw, t.data.fh ) );
    
    }

    this.onImageLoaded.Dispatch( t, { count: this.count } );
    this.Haul( ++this.count );
  
  }

  OnError ( _event ) {

    this.onError.Dispatch( null, _event );
  
  }

  GetImageById ( _id ) {

    return this.imageCache.GetById( _id );
  
  }

  GetBasicTextureById ( _id ) {

    return this.basicTextureCache.GetById( _id );
  
  }

}
