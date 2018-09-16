import { Stage2D, CanvasManager, Container2D, Sprite, Camera2D, Vector2D, Tilesprite } from '../../src/fe.index';
import { RADIAN } from '../../src/math';
import { RandomFloat } from '../../src/utilities';

export default () => {

  const buttonContainer = document.getElementById( 'buttons' );
  const button = document.createElement( 'input' );
  const backButton = document.getElementById( 'back-button' );

  button.setAttribute( 'value', '1' );
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
    const camera = new Camera2D( new Vector2D( 10, 100 ), new Sprite( 0, 0, Sprite.DEFAULT_TEXTURE ) );
    const scene = new Container2D( HW, HH );
    const sprites = [];

    stage.AddChild( root );
    root.AddChild( camera );
    camera.AddChild( scene );
    scene.AddChild( camera.target );
    camera.target.anchor.SetSame( 0.5 );

    const canvasManager = new CanvasManager( c, 1920, 1080, CanvasManager.KEEP_ASPECT_RATIO_FIT );

    canvasManager
      .BindStage( stage )
      .BindRootContainer( root )
      .Trigger();
    
    {

      let i = 15;

      while ( i-- ) {

        const sprite = scene.AddChild( new Sprite( 0, 0, Sprite.DEFAULT_TEXTURE ) );

        sprite.anchor.SetSame( 0.5 );
        sprite.rotation = RandomFloat( -RADIAN * 180, RADIAN * 180 );
        sprite.scale.SetSame( 0.1 * i * 5 );
        sprites.push( sprite );
      
      }
    
    }

    const tSprite = new Tilesprite( 0, 0, Tilesprite.DEFAULT_TEXTURE );

    tSprite.GeneratePattern( stage.rc, 64 * 10, 64 * 10 );

    scene.AddChild( tSprite );

    console.log( stage );

    stage.onProcess.Add( () => {

      camera.Process();

      sprites.forEach( ( sprite ) => {

        sprite.rotation += RADIAN;
      
      } );

      tSprite.OffsetPattern( 1, 1 );
    
    } );

    stage.mouse.onDown.Add( ( event ) => {
    
      const newPos = event.data.position
        .Copy()
        .SubtractV( scene.position )
        .SubtractV( camera.position );

      camera.target.position.SetV( newPos );

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
