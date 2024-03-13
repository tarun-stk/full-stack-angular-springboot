"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Shape_1 = require("./Shape");
const Circle_1 = require("./Circle");
const Rectangle_1 = require("./Rectangle");
let myShape = new Shape_1.Shape(10, 20);
let myCircle = new Circle_1.Circle(10, 10, 5);
let myRectangle = new Rectangle_1.Rectangle(10, 10, 10, 1);
// declare array of shapes
let theShapes = [];
theShapes.push(myShape);
theShapes.push(myCircle);
theShapes.push(myRectangle);
// theShapes.push("myRectangle");  -> can't do because it will acceot only shape
for (let tempShape of theShapes) {
    console.log(tempShape.getInfo());
}
