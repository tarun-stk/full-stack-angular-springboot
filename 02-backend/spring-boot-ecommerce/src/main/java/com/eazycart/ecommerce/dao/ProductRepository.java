package com.eazycart.ecommerce.dao;

import com.eazycart.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

//Origin is protocol+hostname+port
//same origin http://localhost:4200 = http://localhost:4200
//different origin http://localhost:4200 = http://localhost:8080
//Adding crossorigin becauce this app won't allow request coming from browser which is executing javascript
@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "products", path = "products")
public interface ProductRepository extends JpaRepository<Product, Long> {
}
