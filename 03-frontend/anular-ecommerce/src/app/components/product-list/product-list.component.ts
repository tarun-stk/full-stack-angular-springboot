import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  // ActivatedRoute -> allows to access current route params
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  // similar to @PostConstruct
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
    
  }

  handleSearchProducts() {
    
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    );

  }

  handleListProducts(){
    // route: ActivatedRoute
    // snapshot: state of the route at this given moment of time
    // paramMap: Map of the route params
    // has: similar to containsKey in map of java
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      // read the string id, then convert it to nuymber usign + symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }

    // getProductList() method inside productService will be invoked once subscribe is called on it 
    // subscribe will work asynchronously
    
    // this.productService.getProductList().subscribe(
    //   data => {
    //     this.products = data;
    //   }
    // )
    // now get products for givne cat id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );
  }

}
