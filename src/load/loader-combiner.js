/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Dispatcher } from '../event/dispatcher';

export class LoaderCombiner {

  /**
   * 
   * @param {Loader[]}  _loaders 
   * @param {Function?} _onComplete 
   */
  constructor ( _loaders, _onComplete ) {

    this.loaders = _loaders;
    this.loaderCount = 0;
    this.onComplete = new Dispatcher();

    if ( _onComplete != null ) {

      this.onComplete.Once( _onComplete );
    
    }
  
  }

  /**
   * 
   * @return {void}
   */
  Load () {

    const loaders = this.loaders;
    let loader = loaders[ 0 ];

    for ( var i = 0; i < loaders.length; loader = loaders[ ++i ] ) {

      loader.loader.onComplete.Once( this.OnLoaderComplete, this );
      loader.loader.Load.apply( loader.loader, loader.args );

    }
  
  }

  /**
   * 
   * @return {void}
   */
  OnLoaderComplete () {

    if ( ++this.loaderCount === this.loaders.length ) {

      const loaders = this.loaders;
      let loader = loaders[ 0 ];

      for ( var i = 0; i < loaders.length; loader = loaders[ ++i ] ) {

        loaders[ i ] = loader.loader;

      }

      this.onComplete.Dispatch();

    }
  
  }

}
