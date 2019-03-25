/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export class NewClass {

  constructor () {

    this.definedValue = PS_privateStaticSomething;
  
  }

  static get staticMaybe () {

    return PS_privateStaticSomething;
  
  }

  static WhyNot () {

    console.log( 0 );
  
  }

  SomeMethod () {

    console.log( this.definedValue );
  
  }

}

// Private Static ----->
const PS_privateStaticSomething = 'someValue';
// <----- Private Static
