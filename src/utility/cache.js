/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Assert } from './assert';

export class Cache {

  constructor ( _type ) {

    this.type = _type;
    this.items = [];
  
  }

  Store ( _item ) {

    let valid = false;

    if ( _item == null ) {

      console.warn( 'Item is null.' );

      return null;
      
    }
  
    if ( _item.id != null && _item.id !== '' ) {
  
      valid = !this.Contains( _item, _item.id );
      
    } else if ( _item.data ) {
  
      if ( _item.data.id != null && _item.data.id !== '' ) {
  
        valid = !this.Contains( _item, _item.data.id );
        
      }
      
    }
  
    if ( valid === false ) {
  
      console.warn( 'Invalid item. Check the item id. The item has not been stored' );

      return false;
      
    }
  
    this.items.push( _item );

    return true;

  }

  StoreSafe ( _item ) {

    if ( this.type != null ) {

      Assert( _item, Assert.IS_INSTANCE_OF, this.type );
      
    }
  
    Assert( _item, Assert.IS_SAME_TYPE, PS_object );
  
    if ( _item.id ) {
  
      Assert( _item.id, Assert.IS_SAME_TYPE, PS_string );
      Assert( _item.id, Assert.IS_NOT, '' );
      
    } else {
  
      Assert( _item.data, Assert.IS_SAME_TYPE, PS_object );
      Assert( _item.data.id, Assert.IS_SAME_TYPE, PS_string );
      Assert( _item.data.id, Assert.IS_NOT, '' );
      
    }
  
    return this.Store( _item );
  
  }

  GetById ( _id ) {

    const items = this.items;
    let item = items[ 0 ];

    for ( var i = 0; i < items.length; item = items[ ++i ] ) {

      if ( item != null ) {
  
        if ( item.id === _id || ( item.data != null && item.data.id === _id ) ) {
  
          return item;
          
        }
        
      }
      
    }
  
    return null;
  
  }

  Contains ( _item, _id ) {

    const items = this.items;
    let item = items[ i ];

    for ( var i = 0 ; i < items.length; item = items[ ++i ] ) {

      if ( item != null ) {
  
        if ( item === _item ) {
  
          return true;
          
        }
  
        if ( item.id === _id ) {
  
          return true;
          
        }
  
        if ( item.data != null ) {
  
          if ( item.data.id === _id ) {
  
            return true;
            
          }
          
        }
        
      }
      
    }
  
    return false;
  
  }

}

// Private Static ----->
const PS_object = Object.create( null );
const PS_string = 'string';
// <----- Private Static
