/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

Array.prototype.indexPop = function ( index ) {

  const last = this.length - 1;

  if ( last > 1 && index <= last && index >= 0 ) {
  
    const temp = this[last];
    this[last] = this[index];
    this[index] = temp;
  
    return this.pop();
    
  }

  return this.pop();
  
};

Array.prototype.indexShift = function ( index ) {
  
  if ( this.length > 1 && index <= this.length - 1 && index >= 0 ) {
  
    const temp = this[0];
    this[0] = this[index];
    this[index] = temp;

    return this.shift();
    
  }

  return this.shift();
  
};

Array.prototype.popSplice = function ( index ) {

  const l = this.length - 1;
  if ( l < 1 ) return;
  const returnee = this[index];

  while ( index < l ) {
 
    this[index] = this[index + 1]; 
    index++; 
    
  }

  this.pop();

  return returnee;
  
};

Array.prototype.shiftSplice = function ( index ) {

  if ( this.length < 1 ) return;
  const returnee = this[index];

  while ( index > 0 ) {

    this[index] = this[index - 1];
    index--;
    
  }

  this.shift();

  return returnee;
  
};

Array.prototype.fickleSplice = function ( index ) {

  if ( index > ( this.length * 0.5 ) | 0 ) {

    return this.popSplice( index );
    
  }

  return this.shiftSplice( index );
  
};
