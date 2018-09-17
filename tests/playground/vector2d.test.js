import { Vector2D } from '../../src/fe.index';

export default () => {

  const buttonContainer = document.getElementById( 'buttons' );
  const button = document.createElement( 'input' );
  const backButton = document.getElementById( 'back-button' );

  button.setAttribute( 'value', 'Vector2D' );
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
    buttonContainer.style.display = 'none';
    backButton.onclick = Back;

    const vA = new Vector2D( 1, 1 );
    const vB = new Vector2D( 1, 1 );

    console.log( vA.AddVC( vB ) );
    console.log( vA.SubtractVC( vB ) );
    console.log( vA.MultiplyVC( vB ) );
    console.log( vA.DivideVC( vB ) );
    console.log( vA.GetAngle() );
    console.log( vA.GetAngleBetweenV( vB ) );
    console.log( vA.GetProjectionOntoV( vB ) );

    conf.canvas.push( c );
  
  }

  function Back () {

    buttonContainer.style.display = null;

    conf.canvas.forEach( ( c ) => {

      c.parentNode.removeChild( c );
    
    } );

    conf.canvas.length = 0;
  
  }

};
