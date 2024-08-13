import { FormControl, ValidationErrors } from "@angular/forms";

export class FormValidator {

    // below defined notOnlyWhiteSpace is a custom validator
    // takes input FormControl and return ValidationErrors
    // if only whitespaces are there in field, then return method name and true
    // not required to return only method name, you can return any other random text
    // but good practice
    // if whitespaces not contained then return null 
    static notOnlyWhiteSpace(control: FormControl): ValidationErrors {
        console.log("inside FormValidator.notOnlyWhiteSpace");
        // check if string only contains whitespace
        if ((control.value != null) && (control.value.trim().length === 0)) {
            // invalid, return error object
            return { 'notOnlyWhiteSpace': true };
        }
        else {
            // valid, return null
            return null;
        }
    }
}
