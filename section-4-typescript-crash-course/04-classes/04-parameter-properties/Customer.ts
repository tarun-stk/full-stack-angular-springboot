class Customer{

    // modern constructor which reduces boilerplate code
    // this also initializes the class level params & also assigns them
    constructor(private _firstName: string, private _lastName: string){
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

console.log(myCustomer.firstName);
console.log(myCustomer.lastName);