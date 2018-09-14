import { Graphic2D, Path, Stadium2D } from '../../src/fe.index';

export default () => {

  const buttonContainer = document.getElementById( 'buttons' );
  const button = document.createElement( 'input' );
  const backButton = document.getElementById( 'back-button' );
  button.setAttribute( 'value', 'Stadium2D' );
  button.setAttribute( 'type', 'button' );
  button.addEventListener( 'click', Run );
  buttonContainer.appendChild( button );
  
  let conf = {
    stadium: null
  };
  
  function Run () {
  
    backButton.onclick = Back;
    buttonContainer.style.display = 'none';

    const stadium = conf.stadium = new Stadium2D( {
      width: 600,
      height: 400,
      className: 'mcnvs',
      mode: '2d',
      fill: false
    } );

    stadium.CreateStage( 'stage1' );
    stadium.CreateStage( 'stage2' );
    stadium.CreateStage( 'stage3' );
    
  }
  
  function Back () {

    buttonContainer.style.display = null;

    conf.stadium.ticker.Stop();

    conf.stadium.stages.forEach( ( stage ) => {

      stage.canvas.parentNode.removeChild( stage.canvas );
    
    } );
  
    backButton.onclick = null;
    
  }
  
};
