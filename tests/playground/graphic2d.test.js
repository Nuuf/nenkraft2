import { Graphic2D, Path, Geom } from '../../src/fe.index';
import { RADIAN } from '../../src/math';

export default () => {

  const buttonContainer = document.getElementById( 'buttons' );
  const button = document.createElement( 'input' );
  const backButton = document.getElementById( 'back-button' );
  button.setAttribute( 'value', 'Graphic2D' );
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

    const rc = c.getContext( '2d' );
 
    {

      const path = new Path.AABB2D( 0, 0, 50, 50 );

      const g = new Graphic2D( 0, 0, path );
      g.position.SetSame( 200 );
  
      g.Draw( rc );
    
    }

    {

      const path = new Path.Circle( 0, 0, 25 );

      const g = new Graphic2D( 0, 0, path );
      g.position.SetSame( 300 );
  
      g.Draw( rc );
    
    }

    {

      const path = new Path.Ray2D( 0, 0, 50, 50 );

      const g = new Graphic2D( 0, 0, path );
      g.position.SetSame( 400 );
  
      g.Draw( rc );
    
    }

    {

      const path = new Path.Polygon2D();
      Geom.PolygonConstruction.Butterfly( path, 0, 0, 5000, 50 );

      const g = new Graphic2D( 0, 0, path );
      g.position.SetSame( 600 );

      g.rotation = RADIAN * 45;
  
      g.Draw( rc );
    
    }
    
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
