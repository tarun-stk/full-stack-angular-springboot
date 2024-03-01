class Customer{

    private _firstName: string;
    private _lastName: string;

    constructor(_firstName: string, _lastName: string){
        this._firstName = _firstName;
        this._lastName = _lastName;
    }

    // these are getters and setters in java
    // Known as Accessors.
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }

    // no mention of public, because by default public
    get firstName(): string{
        return this._firstName;
    }
    set firstName(value: string){
        this._firstName = value;
    }

}


let myCustomer = new Customer("Susan", "Public");

// below is similar to myCustomer.set()
myCustomer.firstName = "Martin";
myCustomer.lastName = "Dixon";

// and below will call myCustomer.get()
console.log(myCustomer.firstName);
console.log(myCustomer.lastName);