var Customer = /** @class */ (function () {
    function Customer() {
    }
    Object.defineProperty(Customer.prototype, "lastName", {
        // these are getters and setters in java
        // Known as Accessors.
        get: function () {
            return this._lastName;
        },
        set: function (value) {
            this._lastName = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "firstName", {
        // no mention of public, because by default public
        get: function () {
            return this._firstName;
        },
        set: function (value) {
            this._firstName = value;
        },
        enumerable: false,
        configurable: true
    });
    return Customer;
}());
var myCustomer = new Customer();
// below is similar to myCustomer.set()
myCustomer.firstName = "Martin";
myCustomer.lastName = "Dixon";
// and below will call myCustomer.get()
console.log(myCustomer.firstName);
console.log(myCustomer.lastName);
