/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class Tileset {

  /**
   * 
   * @param {BasicTexture2D} _basicTexture 
   * @param {object} _mapData 
   * @param {object} _setData 
   */
  constructor ( _basicTexture, _mapData, _setData ) {

    this.id = _basicTexture.id;
    this.basicTexture = _basicTexture;
    this.mapData = _mapData;
    this.setData = _setData;
    this.pc = null;
  
  }

}
