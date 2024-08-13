package com.eazycart.ecommerce.controller;

import com.eazycart.ecommerce.dto.Purchase;
import com.eazycart.ecommerce.dto.PurchaseResponse;
import com.eazycart.ecommerce.service.CheckoutService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
@Slf4j
public class CheckoutController {

    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
        log.info("purchase: {}", purchase);
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }

}
