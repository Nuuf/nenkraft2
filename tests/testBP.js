// import * as nk2 from '../../src/fe.index';

export default () => {

  const buttonContainer = document.getElementById( 'buttons' );
  const button = document.createElement( 'input' );
  const backButton = document.getElementById( 'back-button' );
  button.setAttribute( 'value', 'BP' );
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
    backButton.onclick = Back;
  
  }

  function Back () {

    conf.canvas.forEach( ( c ) => {

      c.parentNode.removeChild( c );
    
    } );

    conf.canvas.length = 0;

    backButton.onclick = null;
  
  }

};
