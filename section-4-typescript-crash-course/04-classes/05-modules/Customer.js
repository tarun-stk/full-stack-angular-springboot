"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
// add export to use this class in other file
class Customer {
    constructor(_firstName, _lastName) {
        this._firstName = _firstName;
        this._lastName = _lastName;
        this._firstName = _firstName;
        this._lastName = _lastName;
    }
    get lastName() {
        return this._lastName;
    }
    get firstName() {
        return this._firstName;
    }
}
exports.Customer = Customer;
