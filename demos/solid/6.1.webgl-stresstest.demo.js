import { CreateDemo } from '../demoBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateDemo( 'WebGLStresstest', ( conf ) => {

    const W = window.innerWidth;
    const H = window.innerHeight;
    const HW = W * 0.5;
    const HH = H * 0.5;
    const c = conf.canvas = document.createElement( 'canvas' );

    document.body.appendChild( c );
    c.setAttribute( 'width', W );
    c.setAttribute( 'height', H );
    c.style.display = 'initial';
    c.style.position = 'absolute';

    let gl = c.getContext( 'webgl2' );

    if ( !gl ) {

      gl = c.getContext( 'webgl' );
    
    }

    if ( !gl ) {

      gl = c.getContext( 'experimental-webgl' );
    
    }

    const container = new nk2.VisualContainer2D( 0, 0 );
    const ticker = conf.ticker = new nk2.Time.Ticker( Update, 1000, true );
    let numTimes = 20;
    const hold = 20;
    let holdCounter = 0;
    const fps = 40;
    let am = 35;
    const childrenMDC = [];
    const spritePool = new nk2.Pool( nk2.Sprite );
    const timer = new nk2.Time.Timer();
    const pc = new nk2.Controller.ProgramController.GLTexture2DProgramController( gl );

    pc.BindBasicTexture( nk2.Sprite.DEFAULT_TEXTURE, gl.NEAREST );
    
    container.scale.Set( 2 / W, -2 / H );
    container.position.Add( -1 + 1, -1 + 1 );
    container.UpdateTransform( container.parent );

    spritePool.Flood( () => {

      const sprite = new nk2.Sprite(
        Math.random() * W - HW,
        Math.random() * H - HH,
        pc
      );

      sprite.transformAutomaticUpdate = false;

      return sprite;
    
    }, 40000 );

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
          console.log( childrenMDC, '\nMIN: ' + childrenMDC[ 0 ], 'MED: ' + childrenMDC[ Math.round( childrenMDC.length / 2 ) ], 'MAX: ' + childrenMDC[ childrenMDC.length - 1 ] );

        }
      
      }

    }, timer );

    ticker.Start();
    timer.Start( 120 );

    function Update () {

      gl.viewport( 0, 0, W, H );
      gl.clear( gl.COLOR_BUFFER_BIT );
      gl.enable( gl.BLEND );
      gl.disable( gl.DEPTH_TEST );
      gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
      container.GLRender( gl );
      timer.Process();
      // gl.flush();

    }

  } );

};
