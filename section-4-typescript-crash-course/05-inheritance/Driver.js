"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Shape_1 = require("./Shape");
const Circle_1 = require("./Circle");
let myShape = new Shape_1.Shape(10, 20);
console.log(myShape.getInfo());
let myCircle = new Circle_1.Circle(10, 10, 5);
console.log(myCircle.getInfo());
