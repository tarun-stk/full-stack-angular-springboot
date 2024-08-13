import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/commons/cart-item';
import { Product } from 'src/app/commons/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      () => {
        this.productView();
      }
    );

  }

  productView() {
    const productId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(productId).subscribe(
      data => {
        console.log(data);
        this.product = data;
      }
    );
  }

  addToCart(tempProduct: Product) {
    console.log(`Adding product to cart, ${this.product.name}`);
    const cartItem: CartItem = new CartItem(tempProduct);
    this.cartService.addToCart(cartItem);
  }

}
