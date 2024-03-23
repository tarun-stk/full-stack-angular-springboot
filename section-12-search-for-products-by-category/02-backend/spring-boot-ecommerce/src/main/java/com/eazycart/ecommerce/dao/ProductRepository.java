package com.eazycart.ecommerce.dao;

import com.eazycart.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

//Origin is protocol+hostname+port
//same origin http://localhost:4200 = http://localhost:4200
//different origin http://localhost:4200 = http://localhost:8080
//Adding crossorigin becauce this app won't allow request coming from browser which is executing javascript
@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "products", path = "products")
public interface ProductRepository extends JpaRepository<Product, Long> {

//    findByCategoryId -> query method, spring boot will create query by defalt
//    this method will be availabler under enpoint:
//    hostname:port/api/products/search/findByCategoryId?id=1 -> match by "id"
//    base endpoint: search/<querymethodname>?listofparams
//    Page is like a sublist inside list
//    if list has 100 objs, we can get 10 by using page return type

    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

    //    this method will be availabler under enpoint:
//    hostname:port/api/products/search/findByNameContaining?name=python -> match by "name"
//    base endpoint: search/<querymethodname>?listofparams
//    if no val given for param then return default all products of size 20 which is default
//    because empty val matches with all prods
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);
}
