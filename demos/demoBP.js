export const CreateDemo = function ( _id, _callback ) {

  const buttonContainer = document.getElementById( 'buttons' );
  const button = document.createElement( 'input' );
  const backButton = document.getElementById( 'back-button' );

  button.setAttribute( 'value', _id );
  button.setAttribute( 'type', 'button' );
  button.addEventListener( 'click', Run );
  buttonContainer.appendChild( button );

  let conf = {
    canvas: null,
    stage: null,
    stadium: null
  };

  function Run () {

    buttonContainer.style.display = 'none';
    backButton.onclick = Back;

    _callback( conf );
  
  }

  function Back () {

    if ( conf.canvas ) {

      conf.canvas.parentNode.removeChild( conf.canvas );
    
    }

    if ( conf.stage ) {

      conf.stage.Destroy();
    
    }

    if ( conf.stadium ) {

      conf.stadium.stages.forEach( ( stage ) => {

        stage.canvas.parentNode.removeChild( stage.canvas );
    
      } );

      conf.stadium.Destroy();
    
    }

    if ( conf.canvasManager ) {

      conf.canvasManager.Destroy();
    
    }

    backButton.onclick = null;
    buttonContainer.style.display = null;
  
  }

};
