// file name and class name can be different
// like in my file mydemo.ts we can have Customer class
// unlike in java classname must be of in filename
// ofcourse as part of good practice give Customer.ts if you've Customer class in it
class Customer{

    // by default all attributes are public
    firstName: string;
    lastName: string;

    // access modifiers:
    // public: can be accessed in all the classes
    // private: only inside class
    // protected: in current class and subclass

    // constructor
    constructor(theFirstName: string, theLastName: string){
        this.firstName = theFirstName;
        this.lastName = theLastName;
    }
}

// let  myCustomer = new Customer();
// myCustomer.firstName = "Martin";
// myCustomer.lastName = "Dixon";

// using constructor
let  myCustomer = new Customer("Martin", "Dixon");

console.log(myCustomer.firstName);
console.log(myCustomer.lastName);