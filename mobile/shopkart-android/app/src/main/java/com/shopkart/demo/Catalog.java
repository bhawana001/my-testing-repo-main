package com.shopkart.demo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

/** Fixed product list so test runs always see the same data. */
final class Catalog {
    static final List<Product> PRODUCTS = Arrays.asList(
        new Product("p101", "Aurora Wireless Headphones", "Electronics", 2499, 4999, 4.3, 0xFF3F51B5,
            "Over-ear Bluetooth headphones with 30-hour battery and active noise cancellation."),
        new Product("p102", "Pulse Smartwatch S2", "Electronics", 3999, 6999, 4.1, 0xFF00897B,
            "1.8\" AMOLED display, heart-rate tracking, and 7-day battery life."),
        new Product("p103", "Stride Running Shoes", "Fashion", 1799, 2999, 4.4, 0xFFE53935,
            "Lightweight mesh running shoes with cushioned sole. Available in sizes 6-11."),
        new Product("p104", "Classic Denim Jacket", "Fashion", 1499, 2499, 4.0, 0xFF1E88E5,
            "Stonewashed cotton denim jacket with a relaxed fit."),
        new Product("p105", "BrewMaster Coffee Maker", "Home", 3299, 4599, 4.2, 0xFF6D4C41,
            "12-cup drip coffee maker with programmable timer and keep-warm plate."),
        new Product("p106", "Nimbus Cotton Bedsheet", "Home", 899, 1599, 4.5, 0xFF8E24AA,
            "King-size 100% cotton bedsheet with two pillow covers."),
        new Product("p107", "PowerCell 20000mAh Power Bank", "Electronics", 1299, 2199, 4.3, 0xFF43A047,
            "Fast-charging power bank with USB-C in/out and two USB-A ports."),
        new Product("p108", "Trail Backpack 30L", "Fashion", 1199, 1999, 4.2, 0xFFF4511E,
            "Water-resistant 30L backpack with padded laptop sleeve.")
    );

    static Product find(String id) {
        if (id == null) return null;
        for (Product p : PRODUCTS) {
            if (p.id.equalsIgnoreCase(id)) return p;
        }
        return null;
    }

    static List<Product> search(String query) {
        if (query == null || query.trim().isEmpty()) return PRODUCTS;
        String q = query.trim().toLowerCase(Locale.ROOT);
        List<Product> out = new ArrayList<>();
        for (Product p : PRODUCTS) {
            if (p.name.toLowerCase(Locale.ROOT).contains(q) || p.category.toLowerCase(Locale.ROOT).contains(q)) {
                out.add(p);
            }
        }
        return out;
    }

    static String rupees(int amount) {
        return "₹" + String.format(Locale.US, "%,d", amount);
    }
}
