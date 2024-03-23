package com.eazycart.ecommerce.config;

import com.eazycart.ecommerce.entity.Product;
import com.eazycart.ecommerce.entity.ProductCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
@Slf4j
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }

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

        // call an internal helper method
        exposeIds(config);

    }

//    By default we're not getting id's displayed inside product categories
//    to expose them in each category we do following.

    private void exposeIds(RepositoryRestConfiguration config) {

        // expose entity ids

        // - get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // - create an array of the entity types
        List<Class> entityClasses = new ArrayList<>();

        // - get the entity types for the entities
        for (EntityType tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
            log.info("tempEntityType.getJavaType() {}", tempEntityType.getJavaType());
        }

        // - expose the entity ids for the array of entity/domain types
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
