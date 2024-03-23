import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/commons/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  // similar to @PostConstruct
  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    // getProductList() method inside productService will be invoked once subscribe is called on it 
    // subscribe will work asynchronously
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
