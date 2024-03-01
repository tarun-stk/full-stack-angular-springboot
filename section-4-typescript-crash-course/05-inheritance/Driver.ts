import {Shape} from './Shape';
import {Circle} from './Circle';

let myShape = new Shape(10, 20);
console.log(myShape.getInfo());

let myCircle = new Circle(10, 10, 5);
console.log(myCircle.getInfo());