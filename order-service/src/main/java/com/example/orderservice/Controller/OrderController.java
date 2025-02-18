package com.example.orderservice.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @RequestMapping("/getOrder")
    public String status() {
        return "Order service is up and running";
    }
}
