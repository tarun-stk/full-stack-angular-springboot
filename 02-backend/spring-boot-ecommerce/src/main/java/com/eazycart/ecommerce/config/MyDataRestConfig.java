package com.eazycart.ecommerce.config;

import com.eazycart.ecommerce.entity.Product;
import com.eazycart.ecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = {HttpMethod.DELETE, HttpMethod.POST, HttpMethod.PUT};

//        disbale http methods for product POST, PUt & Delete
        config.getExposureConfiguration()
//                for Product
                .forDomainType(Product.class)
//                for single items
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
//                for collection of items
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));

        //        disbale http methods for ProductCategory POST, PUt & Delete
        config.getExposureConfiguration()
//                for ProductCategory
                .forDomainType(ProductCategory.class)
//                for single items
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
//                for collection of items
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));

    }
}
