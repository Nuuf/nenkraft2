import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'Stresstest', ( conf ) => {

    const W = window.innerWidth;
    const H = window.innerHeight;
    const c = conf.canvas = document.createElement( 'canvas' );

    document.body.appendChild( c );
    c.setAttribute( 'width', W );
    c.setAttribute( 'height', H );
    c.style.display = 'initial';
    c.style.position = 'absolute';

    const rc = c.getContext( '2d' );
    const container = new nk2.VisualContainer2D( 0, 0 );
    const ticker = conf.ticker = new nk2.Time.Ticker( Update, 1000, true );
    let numTimes = 20;
    const hold = 20;
    let holdCounter = 0;
    const fps = 40;
    let am = 35;
    const childrenMDC = [];
    const spritePool = new nk2.Pool();
    const timer = new nk2.Time.Timer();

    spritePool.Flood( () => {

      const sprite = new nk2.Sprite(
        Math.random() * W,
        Math.random() * H
      );

      sprite.transformAutomaticUpdate = false;

      return sprite;
    
    }, 10000 );

    timer.onFinish.Add( function () {

      let i = am;

      am = am < 3 ? 3 : am--;

      while ( i-- ) {

        container.AddChild( spritePool.Retrieve() );

      }

      if ( ticker.GetTPS() > fps || holdCounter++ < hold ) {
  
        this.Start( 1 );
        
      } else {
  
        var numChildren = container.children.length;

        console.log( numChildren, ticker.GetTPS() );
        container.children.forEach( function ( child ) {
  
          spritePool.Store( child );
          
        } );
        container.Dump();
        holdCounter = 0;
        childrenMDC.push( numChildren );
        numTimes--;
  
        if ( numTimes > 0 ) {
  
          this.Start( 120 );
          
        } else {
  
          childrenMDC.sort( function ( a, b ) {
  
            return a - b;
            
          } );
          console.log( 
            childrenMDC,
            '\nMIN: ' + childrenMDC[ 0 ],
            'MED: ' + childrenMDC[ Math.round( childrenMDC.length / 2 ) ],
            'MAX: ' + childrenMDC[ childrenMDC.length - 1 ]
          );

        }
      
      }

    }, timer );

    ticker.Start();
    timer.Start( 120 );

    function Update () {

      rc.setTransform( 1, 0, 0, 1, 0, 0 );
      rc.fillStyle = 'rgba(0,0,0,1)';
      rc.fillRect( 0, 0, W, H );
      container.Render( rc );
      timer.Process();

    }

  } );

};
