import {Shape} from './Shape';
import {Circle} from './Circle';
import {Rectangle} from './Rectangle';

let myShape = new Shape(10, 20);
console.log(myShape.getInfo());

let myCircle = new Circle(10, 10, 5);
console.log(myCircle.getInfo());

let myRectangle = new Rectangle(10, 10, 10, 1);
console.log(myRectangle.getInfo());