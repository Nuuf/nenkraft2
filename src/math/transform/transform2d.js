/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../vector/vector2d';
import { Matrix2D } from '../matrix/matrix2d';

const Cos = Math.cos;
const Sin = Math.sin;

export class Transform2D {

  /**
   * 
   * @param {number} _x 
   * @param {number} _y 
   */
  constructor ( _x, _y ) {

    this.position = new Vector2D( _x, _y );
    this.scale = new Vector2D( 1, 1 );
    this.skew = new Vector2D( 0, 0 );
    this.pivot = new Vector2D( 0, 0 );
    this.localTransform = new Matrix2D();
    this.globalTransform = new Matrix2D();
    this.rotation = 0;
    this.skewCX = 1;
    this.skewSX = 0;
    this.skewCY = 0;
    this.skewSY = 1;
  
  }

  /**
   * 
   * @param {Matrix2D} _matrix 
   * 
   * @return {this}
   */
  SetMatrix ( _matrix ) {

    _matrix.Decompose( this );
    this.UpdateSkew();

    return this;
  
  }

  /**
   * 
   * @return {this}
   */
  UpdateLocal () {

    const { localTransform } = this;
    const { position } = this;
    const { scale } = this;
    const { pivot } = this;

    localTransform.a = this.skewCX * scale.x;
    localTransform.b = this.skewSX * scale.x;
    localTransform.c = this.skewCY * scale.y;
    localTransform.d = this.skewSY * scale.y;

    localTransform.e = position.x - pivot.x * localTransform.a + pivot.y * localTransform.c;
    localTransform.f = position.y - pivot.y * localTransform.b + pivot.y * localTransform.d;

    return this;
  
  }

  /**
   * 
   * @param {Matrix2D} _matrix 
   * 
   * @return {this}
   */
  UpdateGlobal ( _matrix ) {

    const { localTransform } = this;
    const { globalTransform } = this;
    const { position } = this; 
    const { scale } = this; 
    const { pivot } = this;

    localTransform.a = this.skewCX * scale.x;
    localTransform.b = this.skewSX * scale.x;
    localTransform.c = this.skewCY * scale.y;
    localTransform.d = this.skewSY * scale.y;

    localTransform.e = position.x - pivot.x * localTransform.a + pivot.y * localTransform.c;
    localTransform.f = position.y - pivot.y * localTransform.b + pivot.y * localTransform.d;

    globalTransform.a = localTransform.a * _matrix.a + localTransform.b * _matrix.c;
    globalTransform.b = localTransform.a * _matrix.b + localTransform.b * _matrix.d;
    globalTransform.c = localTransform.c * _matrix.a + localTransform.d * _matrix.c;
    globalTransform.d = localTransform.c * _matrix.b + localTransform.d * _matrix.d;
    globalTransform.e = 
      localTransform.e * _matrix.a + localTransform.f * _matrix.c + _matrix.e;
    globalTransform.f = 
      localTransform.e * _matrix.b + localTransform.f * _matrix.d + _matrix.f;

    return this;
  
  }

  /**
   * 
   * @return {this}
   */
  UpdateSkew () {

    const { skew } = this;
    const { rotation } = this;

    this.skewCX = Cos( rotation + skew.y );
    this.skewSX = Sin( rotation + skew.y );
    this.skewCY = -Sin( rotation - skew.x );
    this.skewSY = Cos( rotation - skew.x );

    return this;
  
  }

  /**
   * 
   * @param {CanvasRenderingContext2D} _rc 
   * 
   * @return {this}
   */
  ApplyGlobal ( _rc ) {

    this.globalTransform.ApplyToContext( _rc );

    return this;
  
  }

}
