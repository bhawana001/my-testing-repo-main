package com.shopkart.demo;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;

import java.util.List;

/**
 * Supported links:
 *   shopkart://home
 *   shopkart://search?q=shoes
 *   shopkart://product/p101
 *   shopkart://cart
 *   shopkart://cart?add=p101&qty=2
 */
final class DeepLinks {
    static Intent resolve(Context context, Uri uri) {
        if (uri == null || uri.getHost() == null) return null;
        List<String> segments = uri.getPathSegments();
        switch (uri.getHost()) {
            case "home":
                return new Intent(context, HomeActivity.class);
            case "search":
                return new Intent(context, HomeActivity.class)
                    .putExtra(HomeActivity.EXTRA_QUERY, uri.getQueryParameter("q"));
            case "product":
                if (segments.isEmpty()) return null;
                return new Intent(context, ProductActivity.class)
                    .putExtra(ProductActivity.EXTRA_ID, segments.get(0));
            case "cart":
                String add = uri.getQueryParameter("add");
                if (add != null && Catalog.find(add) != null) {
                    new Cart(context).add(add, parseQty(uri.getQueryParameter("qty")));
                }
                return new Intent(context, CartActivity.class);
            default:
                return null;
        }
    }

    private static int parseQty(String raw) {
        try {
            return Math.max(1, Integer.parseInt(raw));
        } catch (NumberFormatException e) {
            return 1;
        }
    }
}
