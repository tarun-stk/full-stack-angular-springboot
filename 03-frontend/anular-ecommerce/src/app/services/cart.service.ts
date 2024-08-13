import { Injectable } from '@angular/core';
import { CartItem } from '../commons/cart-item';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  // Subject is a subclass of Observable, we can use subject to publish events in our code
  // the event will be sent to all our subscribers.
  // BehaviorSubject is a subclass of subject
  // it allows to get last occured event in the publish list
  // REplaySubject is a subclass of subject, which allows to retrieve all the
  // list of all past occured events from publisher 
  // ReplaySubject & BehaviorSubject both allow to get events which occured b4 subscribing. 
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(theCartItem: CartItem) {

    // check if we already have this item in our cart
    let alreadyExistingInCart: boolean = false;
    // let existingCartItem: CartItem;
    let existingCartItem: CartItem | undefined;

    if (this.cartItems.length > 0) {
      // find the item in cart based on our id
      // for (let tempCartItem of this.cartItems) {
      //   if (tempCartItem.id == theCartItem.id) {
      //     existingCartItem = tempCartItem;
      //     alreadyExistingInCart = true;
      //     break;
      //   }
      // }
      // short form of doing above
      // condition -> tempCartItem == theCartItem
      // returns first occurency if found, else returns undefined
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id == theCartItem.id);
      if(existingCartItem != undefined){
        alreadyExistingInCart = true;
      }
    }

    // check if we found it
    // alreadyExistingInCart = (alreadyExistingInCart != null);

    if (alreadyExistingInCart && existingCartItem) {
      existingCartItem.quantity++;
    }
    else{
      this.cartItems.push(theCartItem);
    }

    this.updateCartTotals();
  }

  updateCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let tempCartItem of this.cartItems){
      totalPriceValue += tempCartItem.quantity * tempCartItem.unitPrice;
      totalQuantityValue += tempCartItem.quantity;
    }

    // here we're publishing new values, all subs will receive new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCart();
  }

  decrementCartItem(theCartItem: CartItem) {
    theCartItem.quantity --;
    if(theCartItem.quantity == 0){
      this.removeCartItem(theCartItem);
    }
    else{
      this.updateCartTotals();
    }
  }

  removeCartItem(theCartItem: CartItem) {

    // this returns index of item if the item found
    // if no item found then return -1.
    const index: number = this.cartItems.findIndex(tempCartItem => tempCartItem.id == theCartItem.id); 
    if(index > -1){
      // splice removes element at specified index
      // , 1 indicates remove 1 item.
      this.cartItems.splice(index, 1);
      this.updateCartTotals();
    }
  }

  logCart(){
    for(let tempCartItem of this.cartItems){
      console.log(`Cart Item: ${tempCartItem.name}, qty: ${tempCartItem.quantity}, subtotal: ${tempCartItem.quantity}*${tempCartItem.unitPrice}`);
    }
  }

}
