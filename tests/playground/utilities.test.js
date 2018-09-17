import { Cipher, Assert, Cache, Glob, Maker, Vector2D } from '../../src/fe.index';

export default () => {

  const buttonContainer = document.getElementById( 'buttons' );
  const button = document.createElement( 'input' );
  const backButton = document.getElementById( 'back-button' );

  button.setAttribute( 'value', 'Utility' );
  button.setAttribute( 'type', 'button' );
  button.addEventListener( 'click', Run );
  buttonContainer.appendChild( button );
  
  let conf = {
    canvas: [
  
    ]
  };
  
  function Run () {
  
    const c = document.createElement( 'canvas' );

    document.body.appendChild( c );
    c.setAttribute( 'width', window.innerWidth );
    c.setAttribute( 'height', window.innerHeight );
    c.style.display = 'initial';
    c.style.position = 'absolute';
    conf.canvas.push( c );
    buttonContainer.style.display = 'none';
    backButton.onclick = Back;

    let A = 'a string';
    let B = Cipher.CCH1( A, 1 );
    let C = Cipher.CCH1Decipher( B, 1 );

    console.log( A, B, C );

    // Assert.Assign(); assign to global scope
    Assert.LOG = true;

    Assert( A, 'IST' /* Assert.IS_SAME_TYPE */, 'another string' );

    const item = {
      id: '1'
    };
    const cache = new Cache();

    cache.StoreSafe( item );

    Glob.Assign();
    Glob.Create( 'newGlob' );
    window.newGlob.Mark( Glob.FUNCTION, 'newFunction' );
    window.newGlob.Define( Glob.FUNCTION, 'newFunction', () => {

      console.log( window.newGlob );
    
    } );
    window.newGlob.Get( Glob.FUNCTION, 'newFunction' )();

    console.log( new Maker()
      .Many( 1000 )
      .Make( Vector2D, '@i(*|10)', '@i(*|5)' )
      .Mass() );
    
  }
  
  function Back () {

    buttonContainer.style.display = null;
  
    conf.canvas.forEach( ( c ) => {
  
      c.parentNode.removeChild( c );
      
    } );
  
    conf.canvas.length = 0;
  
    backButton.onclick = null;
    
  }
  
};
