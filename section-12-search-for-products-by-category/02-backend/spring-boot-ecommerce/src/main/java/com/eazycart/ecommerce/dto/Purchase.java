package com.eazycart.ecommerce.dto;

import com.eazycart.ecommerce.entity.Address;
import com.eazycart.ecommerce.entity.Customer;
import com.eazycart.ecommerce.entity.Order;
import com.eazycart.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}