/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class Pool {

  constructor ( _class ) {

    this.class = _class;
    this.objects = [];
    this.floodFunction = null;
    this.floodAmount = null;
    this.context = null;

  }

  Store ( _object ) {

    this.objects.push( _object );
  
  }

  PreRetrieve () {

    if ( this.objects.length === 0 ) {

      this.Flood();
    
    }
  
  }

  Retrieve () {

    this.PreRetrieve();

    return this.objects.pop();
  
  }

  Flood ( _function, _amount, _context ) {

    if ( _function ) this.floodFunction = _function;
    if ( _amount ) this.floodAmount = _amount;
    if ( _context ) this.context = _context;

    for ( var i = 0; i < this.floodAmount; ++i ) {

      if ( this.class != null ) {

        const object = new this.class();

        this.Store( object );
        this.floodFunction.call( this.context, object );
      
      } else {

        this.Store( this.floodFunction.call( this.context ) );
      
      }

    }
  
  } 

  Flush () {

    this.objects.length = 0;
  
  }

  Clean () {

    const amount = this.objects.length;

    this.Flush();
    this.Flood( undefined, amount );
  
  }

}
