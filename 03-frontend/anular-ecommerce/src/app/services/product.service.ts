import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../commons/product';
import { ProductCategory } from '../commons/product-category';

// when mentioned below anno, angular will by default create an obj, and will inject it wherever it is used
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // by default spring data rest only returns 20 products, if you want custom size to be returned
  // follow below url
  // baseUrl: string = "http://localhost:8080/api/products?size=100";
  baseUrl: string = "http://localhost:8080/api/products";
  categoryUrl: string = "http://localhost:8080/api/product-category"

  // injecting HttpClient
  constructor(private httpClient: HttpClient) { }

  // getProductList(): Observable<Product[]>{
  //   // doing a get request on the baseurl
  //   return this.httpClient.get<GetResponse>(this.baseUrl)
  //   // pipe is nothing but converting json responsebody to product array.  
  //   .pipe(
  //       map(response => response._embedded.products)
  //     );
  // }
  getProductList(categoryId: number): Observable<Product[]> {
    // build cystomUrl based on categoryId
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl)
      // pipe is nothing but converting json responsebody to product array.  
      .pipe(
        map(response => response._embedded.products)
      );
  }

  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl)
      // pipe is nothing but converting json responsebody to product array.  
      .pipe(
        // map the spring json data from spring rest to ProductCategory array.
        map(response => response._embedded.productCategory)
      );
  }


}

interface GetResponseProductCategory {
  _embedded: {
    // unwraps json from sring data rest _embedded entry
    productCategory: ProductCategory[];
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

// sample response
// "_embedded": {
//   "products": [
//     {
//       "sku": "BOOK-TECH-1000",
//       "name": "JavaScript - The Fun Parts",
//       "description": "Learn JavaScript",
//       "unitPrice": 19.99,
//       "imageUrl": "assets/images/products/placeholder.png",
//       "active": true,
//       "unitsInStock": 100,
//       "dateCreated": "2024-03-15T16:50:44.000+00:00",
//       "lastUpdated": null,
//       "_links": {
//         "self": {
//           "href": "http://localhost:8080/api/products/1"
//         },
//         "product": {
//           "href": "http://localhost:8080/api/products/1"
//         },
//         "category": {
//           "href": "http://localhost:8080/api/products/1/category"
//         }
//       }
//     },
//     {
//       "sku": "BOOK-TECH-1001",
//       "name": "Spring Framework Tutorial",
//       "description": "Learn Spring",
//       "unitPrice": 29.99,
//       "imageUrl": "assets/images/products/placeholder.png",
//       "active": true,
//       "unitsInStock": 100,
//       "dateCreated": "2024-03-15T16:50:56.000+00:00",
//       "lastUpdated": null,
//       "_links": {
//         "self": {
//           "href": "http://localhost:8080/api/products/2"
//         },
//         "product": {
//           "href": "http://localhost:8080/api/products/2"
//         },
//         "category": {
//           "href": "http://localhost:8080/api/products/2/category"
//         }
//       }
//     }
//   ]
// }
