/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Cache } from '../utility/cache';
import { Dispatcher } from '../event/dispatcher';
import { XHRLoader } from './xhr-loader';
import { ImageLoader } from './image-loader';
import { Tileset } from '../texture/tileset';

export class TilesetLoader {

  constructor ( _objects, _onComplete ) {

    this.tilesetCache = new Cache( Tileset );
    this.xhrLoader = new XHRLoader();
    this.imageLoader = new ImageLoader();
    this.onComplete = new Dispatcher();
    this.onTilesetLoaded = new Dispatcher();
    this.count = 0;
    this.loading = false;
    this.toLoad = null;
    this.pairCount = 0;
    this.tempBasicTexture = null;
    this.tempData = null;

    this.xhrLoader.onXHRLoaded.Add( this.OnPartXHRLoaded, this );
    this.imageLoader.onImageLoaded.Add( this.OnPartImageLoaded, this );

    if ( _onComplete != null ) {

      this.onComplete.Add( _onComplete, this, true );
    
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
      this.onComplete.Dispatch( this, { tilesetCache: this.tilesetCache } );
    
    }
  
  }

  OnPartLoaded () {

    if ( ++this.pairCount === 2 ) {
  
      const tileset = new Tileset( this.tempBasicTexture, this.tempData );
  
      this.tilesetCache.StoreSafe( tileset );
  
      this.pairCount = 0;
      this.onTilesetLoaded.Dispatch( tileset, { count: this.count } );
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

  GetTilesetById ( _id ) {

    return this.tilesetCache.GetById( _id );
  
  }

}
