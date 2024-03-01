// add export to use this class in other file
export class Customer{

    constructor(private _firstName: string, private _lastName: string){
        this._firstName = _firstName;
        this._lastName = _lastName;
    }

    public get lastName(): string {
        return this._lastName;
    }
    get firstName(): string{
        return this._firstName;
    }

}
