"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// importing this before we use it.
const Customer_1 = require("./Customer");
let myCustomer = new Customer_1.Customer("Susan", "Public");
console.log(myCustomer.firstName);
console.log(myCustomer.lastName);
