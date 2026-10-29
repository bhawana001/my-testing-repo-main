package com.shopkart.demo;

import android.content.Context;
import android.content.SharedPreferences;

import java.util.LinkedHashMap;
import java.util.Map;

/** Cart persisted as "id:qty,id:qty" so it survives app restarts. */
final class Cart {
    private static final String PREFS = "cart";
    private static final String KEY = "items";

    private final SharedPreferences prefs;

    Cart(Context context) {
        prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
    }

    Map<String, Integer> items() {
        Map<String, Integer> items = new LinkedHashMap<>();
        String raw = prefs.getString(KEY, "");
        if (raw.isEmpty()) return items;
        for (String entry : raw.split(",")) {
            String[] parts = entry.split(":");
            if (parts.length == 2 && Catalog.find(parts[0]) != null) {
                items.put(parts[0], Integer.parseInt(parts[1]));
            }
        }
        return items;
    }

    void add(String id, int qty) {
        Map<String, Integer> items = items();
        Integer current = items.get(id);
        items.put(id, (current == null ? 0 : current) + qty);
        save(items);
    }

    void setQty(String id, int qty) {
        Map<String, Integer> items = items();
        if (qty <= 0) items.remove(id); else items.put(id, qty);
        save(items);
    }

    void clear() {
        save(new LinkedHashMap<>());
    }

    int count() {
        int total = 0;
        for (int qty : items().values()) total += qty;
        return total;
    }

    int total() {
        int total = 0;
        for (Map.Entry<String, Integer> e : items().entrySet()) {
            total += Catalog.find(e.getKey()).price * e.getValue();
        }
        return total;
    }

    private void save(Map<String, Integer> items) {
        StringBuilder sb = new StringBuilder();
        for (Map.Entry<String, Integer> e : items.entrySet()) {
            if (sb.length() > 0) sb.append(',');
            sb.append(e.getKey()).append(':').append(e.getValue());
        }
        prefs.edit().putString(KEY, sb.toString()).apply();
    }
}
