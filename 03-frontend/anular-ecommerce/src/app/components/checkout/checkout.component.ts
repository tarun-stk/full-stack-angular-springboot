import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/commons/country';
import { Order } from 'src/app/commons/order';
import { OrderItem } from 'src/app/commons/order-item';
import { Purchase } from 'src/app/commons/purchase';
import { State } from 'src/app/commons/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FormService } from 'src/app/services/form.service';
import { FormValidator } from 'src/app/validators/form-validator';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  // this is main top level formgroup
  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];
  countries: Country[] = [];
  states: State[] = [];
  billingAddressStates: State[];
  shippingAddressStates: State[];

  constructor(private formBuilder: FormBuilder, private formService: FormService,
    private cartService: CartService, private checkoutService: CheckoutService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      // customer is subgroup inside checkoutFormGroup
      customer: this.formBuilder.group({
        // new FormControl(initial value, array of validators)
        firstName: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          FormValidator.notOnlyWhiteSpace]),
        lastName: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          FormValidator.notOnlyWhiteSpace]),
        email: new FormControl('',
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required, Validators.minLength(2), FormValidator.notOnlyWhiteSpace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), FormValidator.notOnlyWhiteSpace]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), FormValidator.notOnlyWhiteSpace]),
      }),
      billingAddress: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required, Validators.minLength(2), FormValidator.notOnlyWhiteSpace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), FormValidator.notOnlyWhiteSpace]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), FormValidator.notOnlyWhiteSpace]),
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), FormValidator.notOnlyWhiteSpace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3}')]),
        expirationMonth: new FormControl(''),
        expirationYear: new FormControl(''),
      })
    })
    // months are 0 indexed, so +1 at end
    let currMonth: number = new Date().getMonth() + 1;
    this.formService.getCredtitCardMonths(currMonth).subscribe(
      data => this.creditCardMonths = data
    );
    let currYear: number = new Date().getFullYear();
    this.formService.getCredtitCardYears(currYear).subscribe(
      data => this.creditCardYears = data
    );
    // get list of countries from formservice
    this.formService.getCountries().subscribe(
      data => {
        console.log('list of countries: ' + JSON.stringify(data));
        this.countries = data;
      }
    );

    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
      }
    )

    this.cartService.totalQuantity.subscribe(
      data => {
        this.totalQuantity = data
      }
    )
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }
  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }
  get creditCardExpirationMonth() { return this.checkoutFormGroup.get('creditCard.expirationMonth'); }
  get creditCardExpirationYear() { return this.checkoutFormGroup.get('creditCard.expirationYear'); }

  copyShippingAddressToBillingAddress(event) {
    console.log("checkbox triggered");
    if (event?.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      // copy shippingAddressstates to billingAddressStates
      this.billingAddressStates = this.shippingAddressStates;
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      // reset to emptty array
      this.billingAddressStates = [];
    }
  }

  onSubmit() {
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log("selected expirationMonth: " + this.checkoutFormGroup.get('creditCard')?.value.expirationMonth);

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // to get value of field specific
    console.log("email of the customer is: " + this.checkoutFormGroup.get('customer')?.value.email);

    // set up order
    const order = new Order(this.totalQuantity, this.totalPrice);

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderitems from cartitems
    // - long way
    let orderItems: OrderItem[] = [];
    // for(let i = 0; i < cartItems.length; i ++){
    //   orderItems[i] = new OrderItem(cartItems[i].imageUrl, cartItems[i].unitPrice, cartItems[i].quantity, cartItems[i].id);
    // }

    // - short way
    orderItems = cartItems.map(tempCartItem => new OrderItem(tempCartItem.imageUrl, tempCartItem.unitPrice, tempCartItem.quantity, tempCartItem.id))

    // set up purchase
    const purchase = new Purchase();

    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // populate purchase - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    console.log(`this.checkoutFormGroup.controls['shippingAddress'].value: ${JSON.stringify(purchase.shippingAddress)}`);
    // state and country are itself objs so create sep consts for strings
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;



    // populate purchase - billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    // populate purchase - order & orderitems
    purchase.order = order;
    purchase.orderItems = orderItems;

    console.log(JSON.stringify(purchase));

    // call REST API via checkoutservice
    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);

        // reset cart
        this.resetCart();
      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    })


  }
  resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    this.router.navigateByUrl("/products");
  }

  handleChangeMonthsAndYears() {

    console.log('handleChangeMonthsAndYears: triggered');
    const creditCardFormGroup = this.checkoutFormGroup.get("creditCard");

    let currentYear: number = new Date().getFullYear();
    let selectedYear: number = creditCardFormGroup.value.expirationYear;
    let startMonth: number;

    // if both selected year and curr year are same, then only display remaining months
    if (currentYear == selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    // eldse meeans future year, then show all months
    else {
      startMonth = 1;
    }

    this.formService.getCredtitCardMonths(startMonth).subscribe(
      data => this.creditCardMonths = data
    );

  }

  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const formGroupNameValue = formGroup.value;
    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(JSON.stringify(formGroupNameValue));

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.formService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName == 'shippingAddress') {
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }
        // select first item by default for state
        formGroup.get('state').setValue(data[0]);
      }

    );


  }

}
