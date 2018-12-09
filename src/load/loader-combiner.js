/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Dispatcher } from '../event/dispatcher';

export class LoaderCombiner {

  constructor ( _loaders ) {

    this.loaders = _loaders;
    this.count = 0;
    this.onComplete = new Dispatcher();
  
  }

  Load () {

    const loaders = this.loaders;
    let loader = loaders[ 0 ];

    for ( var i = 0; i < loaders.length; loader = loaders[ ++i ] ) {

      loader.loader.onComplete.Add( this.OnLoaderComplete, this, true );
      loader.loader.Load.apply( loader.loader, loader.args );

    }
  
  }

  OnLoaderComplete () {

    if ( ++this.count === this.loaders.length ) {

      const loaders = this.loaders;
      let loader = loaders[ 0 ];

      for ( var i = 0; i < loaders.length; loader = loaders[ ++i ] ) {

        loaders[ i ] = loader.loader;

      }

      this.onComplete.Dispatch();

    }
  
  }

}
