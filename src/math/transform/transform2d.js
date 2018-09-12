/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Vector2D } from '../vector/vector2d';
import { Matrix2D } from '../matrix/matrix2d';

const Cos = Math.cos;
const Sin = Math.sin;

export class Transform2D {

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

  Set ( _matrix ) {

    _matrix.Decompose( this );
    this.UpdateSkew();
  
  }

  UpdateLocal () {

    const localTransform = this.localTransform;
    const position = this.position;
    const scale = this.scale;
    const pivot = this.pivot;

    localTransform.a = this.skewCX * scale.x;
    localTransform.b = this.skewSX * scale.x;
    localTransform.c = this.skewCY * scale.y;
    localTransform.d = this.skewSY * scale.y;

    localTransform.e = position.x - pivot.x * localTransform.a + pivot.y * localTransform.c;
    localTransform.f = position.y - pivot.y * localTransform.b + pivot.y * localTransform.d;
  
  }

  UpdateGlobal ( _parentGlobalTransform ) {

    const localTransform = this.localTransform;
    const globalTransform = this.globalTransform;
    const position = this.position; 
    const scale = this.scale; 
    const pivot = this.pivot;

    localTransform.a = this.skewCX * scale.x;
    localTransform.b = this.skewSX * scale.x;
    localTransform.c = this.skewCY * scale.y;
    localTransform.d = this.skewSY * scale.y;

    localTransform.e = position.x - pivot.x * localTransform.a + pivot.y * localTransform.c;
    localTransform.f = position.y - pivot.y * localTransform.b + pivot.y * localTransform.d;

    globalTransform.a = localTransform.a * _parentGlobalTransform.a + localTransform.b * _parentGlobalTransform.c;
    globalTransform.b = localTransform.a * _parentGlobalTransform.b + localTransform.b * _parentGlobalTransform.d;
    globalTransform.c = localTransform.c * _parentGlobalTransform.a + localTransform.d * _parentGlobalTransform.c;
    globalTransform.d = localTransform.c * _parentGlobalTransform.b + localTransform.d * _parentGlobalTransform.d;

    globalTransform.e = localTransform.e * _parentGlobalTransform.a + localTransform.f * _parentGlobalTransform.c + _parentGlobalTransform.e;
    globalTransform.f = localTransform.e * _parentGlobalTransform.b + localTransform.f * _parentGlobalTransform.d + _parentGlobalTransform.f;
  
  }

  UpdateSkew () {

    const skew = this.skew;
    const rotation = this.rotation;

    this.skewCX = Cos( rotation + skew.y );
    this.skewSX = Sin( rotation + skew.y );
    this.skewCY = -Sin( rotation - skew.x );
    this.skewSY = Cos( rotation - skew.x );
  
  }

  ApplyGlobal ( _rc ) {

    this.globalTransform.ApplyToContext( _rc );
  
  }

}
