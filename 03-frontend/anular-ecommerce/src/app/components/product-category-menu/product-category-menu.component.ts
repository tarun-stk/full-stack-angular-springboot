import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/commons/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[] = [];

  // inject ProductService
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // calling method on initializing this component
    this.listProductCategories();
  }
  
  listProductCategories() {
    // subscribing to the data given by method getProductCategories() from productService
    // getProductCategories -> calls backend api to get all product categories
    this.productService.getProductCategories().subscribe(
      data => {
        console.log("data = " + JSON.stringify(data));
        this.productCategories = data;
      }
    );  
  }

}
