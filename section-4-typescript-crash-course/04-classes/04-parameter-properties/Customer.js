"use strict";
class Customer {
    // modern constructor which reduces boilerplate code
    // this also initializes the class level params & also assigns them
    constructor(_firstName, _lastName) {
        this._firstName = _firstName;
        this._lastName = _lastName;
        this._firstName = _firstName;
        this._lastName = _lastName;
    }
    // these are getters and setters in java
    // Known as Accessors.
    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        this._lastName = value;
    }
    // no mention of public, because by default public
    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        this._firstName = value;
    }
}
let myCustomer = new Customer("Susan", "Public");
console.log(myCustomer.firstName);
console.log(myCustomer.lastName);
