import { Stadium } from '../../src/fe.index';

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

    const stadium = conf.stadium = new Stadium( {
      width: 600,
      height: 400,
      className: 'mcnvs',
      mode: '2d',
      fill: false
    } );

    stadium.CreateStage2D( 'stage1' );
    stadium.CreateStage2D( 'stage2' );
    stadium.CreateStage2D( 'stage3' );
    
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
