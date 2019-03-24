/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Cache } from '../utility/cache';
import { Dispatcher } from '../event/dispatcher';
import { XMLToJSON } from '../utility/browser-utility';
import { DeepClone } from '../utility';

export class XHRLoader {

  /**
   * 
   * @param {object[]?} _objects 
   * @param {Function?} _onComplete 
   */
  constructor ( _objects, _onComplete ) {

    this.XHRcache = new Cache( XMLHttpRequest );
    this.dataCache = new Cache();
    this.onXHRLoaded = new Dispatcher();
    this.onComplete = new Dispatcher();
    this.onNetworkError = new Dispatcher();
    this.onLoadError = new Dispatcher();
    this.toLoadCount = 0;
    this.loadedCount = 0;
    this.loading = false;

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

    for ( var i = 0; i < _objects.length; item = _objects[ ++i ] ) {

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

        xhr.data = Object.create( null );
        xhr.data.id = item.id;
      
      }

      xhr.send();

    }

  }

  /**
   * 
   * @param {Event} _event
   * 
   * @return {void} 
   */
  OnDataLoaded ( _event ) {

    const t = _event.currentTarget;

    this.onXHRLoaded.Dispatch( t, { loadedCount: ++this.loadedCount } );
    
    if ( this.loadedCount === this.toLoadCount ) {

      this.loading = false;
      this.onComplete.Dispatch( this, { 
        XHRcache: this.XHRcache,
        dataCache: this.dataCache
      } );
    
    }

  }

  /**
   * 
   * @param {Event} _event
   * 
   * @return {void} 
   */
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
      this.OnDataLoaded( _event );

      t.abort();
    
    } else if ( t.status === 404 || t.status === 500 || t.status === 0 ) {

      this.onLoadError.Dispatch( t );

    }
  
  }

  /**
   * 
   * @param {Event} _event
   * 
   * @return {void} 
   */
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
      this.OnDataLoaded( _event );

      t.abort();
    
    } else if ( t.status === 404 || t.status === 500 || t.status === 0 ) {

      this.onLoadError.Dispatch( t );

    }
  
  }

  /**
   * 
   * @param {Event} _event
   * 
   * @return {void} 
   */
  OnNetworkError ( _event ) {

    this.onNetworkError.Dispatch( null, _event );
  
  }

  /**
   * 
   * @param {any} _id
   * 
   * @return {XMLHttpRequest|null} 
   */
  GetXHRById ( _id ) {

    return this.XHRcache.GetById( _id );
  
  }

  /**
   * 
   * @param {any} _id
   * 
   * @return {object|null} 
   */
  GetDataById ( _id ) {

    return this.dataCache.GetById( _id ).data;
  
  }

  /**
   * 
   * @param {any} _id
   * 
   * @return {object|null} 
   */
  CloneDataById ( _id ) {

    return DeepClone( this.GetDataById( _id ) );

  }

}
