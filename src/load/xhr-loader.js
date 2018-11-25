/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Cache } from '../utility/cache';
import { Event } from '../event/event';
import { XMLToJSON } from '../utility/browser-utility';
import { DeepClone } from '../utility';

export class XHRLoader {

  constructor ( _objects, _onComplete ) {

    this.XHRcache = new Cache( XMLHttpRequest );
    this.dataCache = new Cache();
    this.onXHRLoaded = new Event();
    this.onComplete = new Event();
    this.onNetworkError = new Event();
    this.onLoadError = new Event();
    this.count = 0;
    this.loading = false;
    this.toLoad = null;

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

      const xhr = new XMLHttpRequest();

      xhr.open( 'GET', item.src );

      switch ( item.type ) {

        case 'json':
          xhr.onreadystatechange = this.OnLoadJSON.bind( this );
          break;
        default:
          xhr.onreadystatechange = this.OnLoadXML.bind( this );
          break;
      
      }

      xhr.onerror = this.OnNetworkError.bind( this );

      if ( xhr.data != null ) {

        xhr.data.id = item.id;
      
      } else {

        xhr.data = {
          id: item.id
        };
      
      }

      xhr.send();
    
    } else {

      this.count = 0;
      this.loading = false;
      this.toLoad = null;
      this.onComplete.Dispatch( this, { XHRcache: this.XHRcache, dataCache: this.dataCache } );
    
    }
  
  }

  OnLoadXML ( _event ) {

    const t = _event.currentTarget;

    if ( ( t.status === 200 || t.responseText != null ) && t.readyState === 4 ) {

      t.onload = null;
      t.onerror = null;
      this.XHRcache.StoreSafe( t );
      this.dataCache.Store( {
        id: t.data.id,
        data: XMLToJSON( t.responseText, true )
      } );
      this.onXHRLoaded.Dispatch( t, { count: this.count } );
      this.Haul( ++this.count );

      t.abort();
    
    } else if ( t.status === 404 || t.status === 500 || t.status === 0 ) {

      this.onLoadError.Dispatch( t );

    }
  
  }

  OnLoadJSON ( _event ) {

    const t = _event.currentTarget;

    if ( ( t.status === 200 || t.responseText != null ) && t.readyState === 4 ) {

      t.onload = null;
      t.onerror = null;
      this.XHRcache.StoreSafe( t );
      this.dataCache.Store( {
        id: t.data.id,
        data: JSON.parse( t.responseText )
      } );
      this.onXHRLoaded.Dispatch( t, { count: this.count } );
      this.Haul( ++this.count );

      t.abort();
    
    } else if ( t.status === 404 || t.status === 500 || t.status === 0 ) {

      this.onLoadError.Dispatch( t );

    }
  
  }

  OnNetworkError ( _event ) {

    this.onNetworkError.Dispatch( null, _event );
  
  }

  GetXHRById ( _id ) {

    return this.XHRcache.GetById( _id );
  
  }

  GetDataById ( _id ) {

    return this.dataCache.GetById( _id ).data;
  
  }

  GetClonedDataById ( _id ) {

    return DeepClone( this.GetDataById( _id ) );

  }

}
