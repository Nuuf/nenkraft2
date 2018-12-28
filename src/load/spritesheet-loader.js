/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Cache } from '../utility/cache';
import { Dispatcher } from '../event/dispatcher';
import { XHRLoader } from './xhr-loader';
import { ImageLoader } from './image-loader';
import { Spritesheet } from '../texture/spritesheet';

export class SpritesheetLoader {

  constructor ( _objects, _onComplete ) {

    this.spritesheetCache = new Cache( Spritesheet );
    this.xhrLoader = new XHRLoader();
    this.imageLoader = new ImageLoader();
    this.onComplete = new Dispatcher();
    this.onSpritesheetLoaded = new Dispatcher();
    this.count = 0;
    this.loading = false;
    this.toLoad = null;
    this.pairCount = 0;
    this.tempBasicTexture = null;
    this.tempData = null;

    this.xhrLoader.onXHRLoaded.Add( this.OnPartXHRLoaded, this );
    this.imageLoader.onImageLoaded.Add( this.OnPartImageLoaded, this );

    if ( _onComplete != null ) {

      this.onComplete.Once( _onComplete );
    
    }

    if ( _objects != null ) this.Load( _objects );
  
  }

  Load ( _objects ) {

    if ( this.toLoad === null ) this.toLoad = [];

    this.toLoad.push.apply( this.toLoad, _objects );

    if ( this.loading === false ) {

      this.count = 0;
      this.loading = true;
      this.Haul( this.count );
    
    }
  
  }

  Haul ( _count ) {

    const item = this.toLoad[ _count ];

    if ( item != null ) {

      item.data.id = item.image.id = item.id;
      this.xhrLoader.Load( [ item.data ] );
      this.imageLoader.Load( [ item.image ], true );
      
    } else {

      this.count = 0;
      this.loading = false;
      this.toLoad = null;
      this.tempBasicTexture = null;
      this.tempData = null;
      this.xhrLoader.onXHRLoaded.Dump();
      this.imageLoader.onImageLoaded.Dump();
      this.onComplete.Dispatch( this, { spritesheetCache: this.spritesheetCache } );
    
    }
  
  }

  OnPartLoaded () {

    if ( ++this.pairCount === 2 ) {

      const spritesheet = new Spritesheet( this.tempBasicTexture, this.tempData );
  
      this.spritesheetCache.StoreSafe( spritesheet );
  
      this.pairCount = 0;
      this.onSpritesheetLoaded.Dispatch( spritesheet, { count: this.count } );
      this.Haul( ++this.count );
      
    }
  
  }

  OnPartXHRLoaded ( _event ) {

    this.tempData = this.xhrLoader.GetDataById( _event.target.data.id );
    this.OnPartLoaded();
  
  }

  OnPartImageLoaded ( _event ) {

    this.tempBasicTexture = this.imageLoader.GetBasicTextureById( _event.target.id );
    this.OnPartLoaded();
  
  }

  GetSpritesheetById ( _id ) {

    return this.spritesheetCache.GetById( _id );
  
  }

}
