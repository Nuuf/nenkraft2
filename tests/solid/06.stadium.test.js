import { CreateTest } from '../testBP';
import * as nk2 from '../../src/fe.index';

export default () => {

  CreateTest( 'Stadium', ( conf ) => {

    const W = 600;
    const H = 400;
    const options = {
      className: 'mcnvs',
      width: W,
      height: H,
      mode: '2d',
      x: 0,
      y: 0,
      fill: false
    };
    const stadium = conf.stadium = new nk2.Stadium( options );

    stadium.CreateStage2D( 'stage1' );
    stadium.CreateStage2D( 'stage2' );
    stadium.CreateStage2D( 'stage3' );
    stadium.CreateStage2D( 'stage4' );

    stadium.GetStages( 'stage1', 'stage2', 'stage3' ).forEach( ( stage ) => {

      let i = 10;
        
      while ( i-- ) {

        const child = stage.AddChild(
          new nk2.Graphic2D(
            nk2.Utility.RandomFloat( 100, 500 ),
            nk2.Utility.RandomFloat( 50, 350 ),
            new nk2.Path.Circle( 0, 0, nk2.Utility.RandomInteger( 10, 50 ) )
          )
        );

        child.data.velocity = new nk2.Vector2D(
          nk2.Utility.RandomFloat( -1, 1 ),
          nk2.Utility.RandomFloat( -1, 1 )
        );
        child.data.torque = nk2.Utility.RandomFloat( -nk2.Math.RADIAN, nk2.Math.RADIAN );

      }

      stage.onProcess.Add( Move, stage );

    } );

    function Move () {

      this.children.forEach( ChildMove );
    
    }

    function ChildMove ( child ) {

      child.position.AddV( child.data.velocity );
      child.data.velocity.Rotate( child.data.torque );

      // console.log( child.position.y );
    
    }

  } );

};
