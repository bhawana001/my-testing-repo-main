package com.shopkart.demo;

import android.content.Intent;
import android.view.Gravity;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import java.util.Map;

public class CartActivity extends ShopActivity {
    private String placedOrderId;
    private int placedTotal;

    @Override
    protected String screenTitle() {
        return "My Cart";
    }

    @Override
    protected boolean showBack() {
        return true;
    }

    @Override
    protected void render() {
        if (placedOrderId != null) {
            LinearLayout c = card();
            c.setGravity(Gravity.CENTER_HORIZONTAL);
            c.addView(text("✔", 48, 0xFF388E3C, true));
            c.addView(text("Order placed!", 22, TEXT, true));
            c.addView(text("Order ID: " + placedOrderId, 16, TEXT, false), topMargin(8));
            c.addView(text("Amount paid: " + Catalog.rupees(placedTotal), 16, TEXT, false), topMargin(4));
            content.addView(c);
            Button home = button("Continue shopping", BRAND);
            home.setOnClickListener(v -> startActivity(new Intent(this, HomeActivity.class)
                .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP)));
            content.addView(home, topMargin(6));
            return;
        }

        Map<String, Integer> items = cart.items();
        if (items.isEmpty()) {
            LinearLayout c = card();
            c.setGravity(Gravity.CENTER_HORIZONTAL);
            c.addView(text("Your cart is empty", 18, TEXT, true));
            c.addView(text("Add items to it now.", 15, MUTED, false), topMargin(6));
            content.addView(c);
            Button shop = button("Shop now", BRAND);
            shop.setOnClickListener(v -> finish());
            content.addView(shop, topMargin(6));
            return;
        }

        for (Map.Entry<String, Integer> e : items.entrySet()) {
            content.addView(cartRow(Catalog.find(e.getKey()), e.getValue()));
        }

        LinearLayout summary = card();
        summary.addView(text("Price details", 16, TEXT, true));
        summary.addView(text("Items: " + cart.count(), 15, TEXT, false), topMargin(8));
        summary.addView(text("Delivery: FREE", 15, 0xFF388E3C, false), topMargin(4));
        TextView total = text("Total: " + Catalog.rupees(cart.total()), 18, TEXT, true);
        total.setContentDescription("Cart total " + cart.total());
        summary.addView(total, topMargin(8));
        content.addView(summary);

        Button place = button("Place order", ACCENT);
        place.setOnClickListener(v -> {
            placedTotal = cart.total();
            placedOrderId = "SK" + (100000 + (int) (System.currentTimeMillis() % 900000));
            cart.clear();
            refresh();
        });
        content.addView(place);
    }

    private LinearLayout cartRow(Product p, int qty) {
        LinearLayout row = card();
        row.setOrientation(LinearLayout.HORIZONTAL);
        row.setGravity(Gravity.CENTER_VERTICAL);
        row.addView(thumbnail(p, 64));

        LinearLayout info = new LinearLayout(this);
        info.setOrientation(LinearLayout.VERTICAL);
        info.setPadding(dp(12), 0, 0, 0);
        info.addView(text(p.name, 15, TEXT, true));
        info.addView(text(Catalog.rupees(p.price * qty), 15, TEXT, false));

        LinearLayout stepper = new LinearLayout(this);
        stepper.setGravity(Gravity.CENTER_VERTICAL);
        stepper.addView(stepButton("−", "Decrease " + p.name, () -> cart.setQty(p.id, qty - 1)));
        TextView q = text(String.valueOf(qty), 16, TEXT, true);
        q.setContentDescription("Quantity of " + p.name + " " + qty);
        q.setPadding(dp(14), 0, dp(14), 0);
        stepper.addView(q);
        stepper.addView(stepButton("+", "Increase " + p.name, () -> cart.setQty(p.id, qty + 1)));
        TextView remove = text("Remove", 14, BRAND, true);
        remove.setContentDescription("Remove " + p.name);
        remove.setPadding(dp(18), dp(6), 0, dp(6));
        remove.setOnClickListener(v -> {
            cart.setQty(p.id, 0);
            refresh();
        });
        stepper.addView(remove);
        info.addView(stepper, topMargin(6));

        row.addView(info, new LinearLayout.LayoutParams(0, -2, 1));
        return row;
    }

    private TextView stepButton(String label, String description, Runnable action) {
        TextView b = text(label, 18, TEXT, true);
        b.setGravity(Gravity.CENTER);
        b.setContentDescription(description);
        b.setBackground(rounded(DIVIDER, 16));
        b.setLayoutParams(new LinearLayout.LayoutParams(dp(32), dp(32)));
        b.setOnClickListener(v -> {
            action.run();
            refresh();
        });
        return b;
    }
}
