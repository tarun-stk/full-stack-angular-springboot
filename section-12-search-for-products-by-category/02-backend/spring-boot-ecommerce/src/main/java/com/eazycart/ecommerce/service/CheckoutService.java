package com.eazycart.ecommerce.service;

import com.eazycart.ecommerce.dto.Purchase;
import com.eazycart.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
