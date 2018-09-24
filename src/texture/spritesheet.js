/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Cache } from '../utility/cache';
import { Frame } from '../animator/frame';

export class Spritesheet {

  constructor ( _basicTexture, _data ) {

    this.id = _basicTexture.id;
    this.basicTexture = _basicTexture;
    this.data = _data;
    this.frameCache = new Cache( Frame );
  
  }

  GenerateFrames () {

    let frame;
    let frameData;
    let frameTag;
    const data = this.data;
    const frames = data.frames;
    const frameTags = data.meta.frameTags;

    for ( var i = 0; i < frames.length; ++i ) {

      frame = frames[i];
      frameData = frame.frame;
      frameTag = frameTags[i];
      this.frameCache.Store( new Frame(
        frameData.x,
        frameData.y,
        frameData.w,
        frameData.h,
        frame.duration,
        frameTag ? frameTag.name : null
      ) ); 
    
    }

  }

  GetFrameById ( _id ) {

    return this.frameCache.GetById( _id );
  
  }

}
