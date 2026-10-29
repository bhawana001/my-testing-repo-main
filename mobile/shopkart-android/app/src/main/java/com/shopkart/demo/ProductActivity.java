package com.shopkart.demo;

import android.content.Intent;
import android.graphics.Paint;
import android.view.Gravity;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

public class ProductActivity extends ShopActivity {
    static final String EXTRA_ID = "id";

    @Override
    protected String screenTitle() {
        return "Product";
    }

    @Override
    protected boolean showBack() {
        return true;
    }

    @Override
    protected void render() {
        String id = getIntent().getStringExtra(EXTRA_ID);
        Product p = Catalog.find(id);
        if (p == null) {
            LinearLayout c = card();
            c.addView(text("Product not found", 18, TEXT, true));
            c.addView(text("No product with id \"" + id + "\".", 15, MUTED, false), topMargin(6));
            content.addView(c);
            return;
        }

        LinearLayout c = card();
        TextView image = thumbnail(p, 220);
        LinearLayout.LayoutParams imageLp = new LinearLayout.LayoutParams(-1, dp(220));
        image.setLayoutParams(imageLp);
        c.addView(image);

        c.addView(text(p.name, 20, TEXT, true), topMargin(14));
        c.addView(text("★ " + p.rating + "  ·  " + p.category, 14, MUTED, false), topMargin(4));

        LinearLayout priceRow = new LinearLayout(this);
        priceRow.setGravity(Gravity.BOTTOM);
        priceRow.addView(text(Catalog.rupees(p.price), 24, TEXT, true));
        TextView mrp = text("  " + Catalog.rupees(p.mrp), 15, MUTED, false);
        mrp.setPaintFlags(mrp.getPaintFlags() | Paint.STRIKE_THRU_TEXT_FLAG);
        priceRow.addView(mrp);
        priceRow.addView(text("  " + p.discountPercent() + "% off", 15, 0xFF388E3C, true));
        c.addView(priceRow, topMargin(10));

        c.addView(text(p.description, 15, TEXT, false), topMargin(12));
        c.addView(text("Product ID: " + p.id, 13, MUTED, false), topMargin(10));
        content.addView(c);

        int inCart = cart.items().containsKey(p.id) ? cart.items().get(p.id) : 0;
        Button add = button(inCart > 0 ? "Add another (" + inCart + " in cart)" : "Add to cart", ACCENT);
        add.setOnClickListener(v -> {
            cart.add(p.id, 1);
            refresh();
        });
        content.addView(add, topMargin(6));

        Button goToCart = button("Go to cart", BRAND);
        goToCart.setOnClickListener(v -> startActivity(new Intent(this, CartActivity.class)));
        content.addView(goToCart, topMargin(10));
    }
}
