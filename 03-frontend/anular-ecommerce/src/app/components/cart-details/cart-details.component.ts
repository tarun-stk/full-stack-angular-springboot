import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/commons/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartItems();
  }

  listCartItems() {
    // updated cartitems
    this.cartItems = this.cartService.cartItems;
    
    // subscribe to totalprice from service
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to totalQuantity from service
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.updateCartTotals();
  }

  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementCartItem(theCartItem);
  }

  remove(theCartItem: CartItem) {
    this.cartService.removeCartItem(theCartItem);  
  }

}
