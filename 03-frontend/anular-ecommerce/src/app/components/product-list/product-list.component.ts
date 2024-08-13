import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/commons/cart-item';
import { Product } from 'src/app/commons/product';
import { CartService } from 'src/app/services/cart.service';
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
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  

  // new props for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = "";

  // ActivatedRoute -> allows to access current route params
  constructor(private productService: ProductService, private route: ActivatedRoute,
                  private cartService: CartService) { }

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
    console.log("searchWord from ProductListComponent: " + theKeyword);

    // this.productService.searchProducts(theKeyword).subscribe(
    //   data => {
    //     this.products = data;
    //   }
    // );

    // update to pagination support
    if(this.previousKeyword != theKeyword){
      this.thePageNumber = 1;
    }
    this.previousKeyword = theKeyword;
    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);
    this.productService.searchProductsPaginate(this.thePageNumber-1, this.thePageSize, theKeyword).subscribe(
      this.processResult()
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
    // this.productService.getProductList(this.currentCategoryId).subscribe(
    //   data => {
    //     this.products = data;
    //   }
    // );
    // now pagination
//    if category changed then show first page to the user for new cateogry
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    // adding and subtracting 1 because 
    // spring boot uses 0 indexing and angular using 1 indexing
    // so adjusting
    this.productService.getProductListPaginate(this.thePageNumber-1, this.thePageSize, this.currentCategoryId).subscribe(
      data => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number+1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;

      }
    );
  }

  public updatePageSize(pageSize: string) {
    console.log("updatePageSize method invoked");
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    // re-invoke to launch prods again
    this.listProducts();
  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number+1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  addToCart(tempProduct: Product) {
    console.log(`Adding product to cart: ${tempProduct.name}, ${tempProduct.unitPrice}`);

    // Add to cart yet to be done
    const tempCartItem: CartItem = new CartItem(tempProduct);
    this.cartService.addToCart(tempCartItem);

  }

}
