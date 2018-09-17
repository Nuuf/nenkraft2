import { BitmapText } from '../../src/fe.index';

export default () => {

  const buttonContainer = document.getElementById( 'buttons' );
  const button = document.createElement( 'input' );
  const backButton = document.getElementById( 'back-button' );

  button.setAttribute( 'value', 'BitmapText' );
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
    c.style.backgroundColor = 'white';
    conf.canvas.push( c );
    buttonContainer.style.display = 'none';
    backButton.onclick = Back;

    const rc = c.getContext( '2d' );

    console.log( window.testData );

    const test = new BitmapText(
      100, 100,
      window.testData.imgloader.GetBasicTextureById( 'fontNoK' ),
      window.testData.xhrloader.GetDataById( 'fontNoK' ),
      'Lorem ipsum dolor sit amet, \nconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    );

    test.scale.SetSame( 0.5 );
    test.lineHeight -= 30;
    test.ComputeText();

    console.log( test );

    test.Draw( rc );
    
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
