/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Cache } from '../utility/cache';
import { Frame } from '../animator/frame';

export class Spritesheet {

  /**
   * 
   * @param {BasicTexture2D} _basicTexture 
   * @param {object}         _data 
   */
  constructor ( _basicTexture, _data ) {

    this.id = _basicTexture.id;
    this.basicTexture = _basicTexture;
    this.data = _data;
    this.frameCache = new Cache( Frame );
  
  }

  /**
   * 
   * @return {void}
   */
  GenerateFrames () {

    let frame;
    let frameData;
    let frameTag;
    let sSource;
    let source;
    const { data } = this;
    const { frames } = data;
    const { frameTags } = data.meta;

    for ( var i = 0; i < frames.length; ++i ) {

      frame = frames[ i ];
      frameData = frame.frame;
      sSource = frame.spriteSourceSize;
      source = frame.sourceSize;
      frameTag = frameTags[ i ];

      this.frameCache.Store( new Frame(
        frameData.x,
        frameData.y,
        frameData.w,
        frameData.h,
        frame.duration,
        frameTag ? frameTag.name : frames[ i ].filename,
        sSource.x, sSource.y,
        source.w, source.h
      ) );
    
    }

  }

  /**
   * 
   * @param {string} _id
   * 
   * @return {Frame} 
   */
  GetFrameById ( _id ) {

    return this.frameCache.GetById( _id );
  
  }

}
