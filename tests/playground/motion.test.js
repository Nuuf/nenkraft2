import { Sprite, Motion, Stage2D, Camera2D, Vector2D, Container2D, CanvasManager } from '../../src/fe.index';

export default () => {

  const buttonContainer = document.getElementById( 'buttons' );
  const button = document.createElement( 'input' );
  const backButton = document.getElementById( 'back-button' );

  button.setAttribute( 'value', 'Motion' );
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

    const W = 1920;
    const H = 1080;
    const HW = W * 0.5;
    const HH = H * 0.5;
    const stage = conf.stage = new Stage2D( {
      canvas: c,
      x: 0,
      y: 0,
      halt: false
    } );
    const root = new Container2D( 0, 0 );
    const camera = new Camera2D( new Vector2D( 0, 0 ), { position: new Vector2D( 0, 0 ) } );
    const scene = new Container2D( HW, HH );

    stage.AddChild( root );
    root.AddChild( camera );
    camera.AddChild( scene );

    const canvasManager = new CanvasManager( c, W, H, CanvasManager.KEEP_ASPECT_RATIO_FIT );

    canvasManager
      .BindStage( stage )
      .BindRootContainer( root )
      .Trigger();

    const sprite = new Sprite( 0, 0, Sprite.DEFAULT_TEXTURE );

    sprite.motionManager = new Motion.Manager( sprite );
    const go = sprite.motionManager.Create( 'go', 'x', 500, 120, 'SineInOut' );
    const back = sprite.motionManager.Create( 'back', 'x', 0, 60, 'QuadOut' );

    go.onEnd.Add( () => {

      back.Start();
    
    } );

    back.onEnd.Add( () => {

      go.Start();
    
    } );

    go.Start();

    sprite.anchor.SetSame( 0.5 );

    scene.AddChild( sprite );

    stage.onProcess.Add( () => {

      camera.Process();
      sprite.motionManager.Process();
    
    } );

    stage.mouse.onDown.Add( ( event ) => {

      camera.target.position.SetV( 
        event.data.position
          .Copy()
          .SubtractV( scene.position )
          .SubtractV( camera.position )
      );

    } );
    
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
