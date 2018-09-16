import { Stage2D, Graphic2D } from '../../src/fe.index';
import { Circle } from '../../src/path';

export default () => {

  const buttonContainer = document.getElementById( 'buttons' );
  const button = document.createElement( 'input' );
  const backButton = document.getElementById( 'back-button' );

  button.setAttribute( 'value', 'Stage2D' );
  button.setAttribute( 'type', 'button' );
  button.addEventListener( 'click', Run );
  buttonContainer.appendChild( button );
  
  let conf = {
    canvas: [
  
    ],
    stage: null
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

    const stage = conf.stage = new Stage2D( {
      canvas: c,
      x: 0,
      y: 0,
      halt: false
    } );
    const p = new Circle( 0, 0, 50 );
    const g = stage.AddChild( new Graphic2D( 100, 100, p ) );

    stage.onProcess.Add( () => {

      g.x++;
    
    } );
    
  }
  
  function Back () {

    buttonContainer.style.display = null;
  
    conf.canvas.forEach( ( c ) => {
  
      c.parentNode.removeChild( c );
      
    } );
  
    conf.canvas.length = 0;

    conf.stage.ticker.Stop();
  
    backButton.onclick = null;
    
  }
  
};
