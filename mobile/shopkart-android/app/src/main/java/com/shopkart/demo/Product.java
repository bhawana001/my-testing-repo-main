package com.shopkart.demo;

final class Product {
    final String id;
    final String name;
    final String category;
    final int price;
    final int mrp;
    final double rating;
    final int color;
    final String description;

    Product(String id, String name, String category, int price, int mrp, double rating, int color, String description) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.mrp = mrp;
        this.rating = rating;
        this.color = color;
        this.description = description;
    }

    int discountPercent() {
        return Math.round((mrp - price) * 100f / mrp);
    }
}
