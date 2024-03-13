import {Shape} from './Shape';
import {Circle} from './Circle';
import {Rectangle} from './Rectangle';

let myCircle = new Circle(10, 10, 5);

let myRectangle = new Rectangle(10, 10, 10, 1);

// declare array of shapes
let theShapes: Shape[] = [];
theShapes.push(myCircle);
theShapes.push(myRectangle);
// theShapes.push("myRectangle");  -> can't do because it will acceot only shape

for(let tempShape of theShapes){
    console.log(tempShape.getInfo());
    console.log(tempShape.calculateArea());
    console.log();
}