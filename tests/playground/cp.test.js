import { CP } from '../../src/fe.index';

export default () => {

  const buttonContainer = document.getElementById( 'buttons' );
  const button = document.createElement( 'input' );
  const backButton = document.getElementById( 'back-button' );

  button.setAttribute( 'value', 'CP' );
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

    const registry = new CP.Registry();

    registry.AddCommand( new CP.Command( 'myCommand', () => {

      console.log( 'hello command' );

    }, 'this is my command', true, '--' ) );

    registry.Parse( 'myCommand' );

    registry.GetCommandById( 'myCommand' ).AddOption( 'myOption', ( _dataStrs, _data, _staticData ) => {

      console.log( _dataStrs, _data, _staticData );
      console.log( 'hello option' );

    }, 'this is my option', 0, true ).filterNull = true;

    registry.Parse( 'myCommand --myOption someData=1 otherDataaa=helloWorld randomString aa a a' );
    
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
