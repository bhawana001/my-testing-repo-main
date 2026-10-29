package com.shopkart.demo;

import android.content.Intent;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.inputmethod.EditorInfo;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;

import java.util.List;

public class HomeActivity extends ShopActivity {
    static final String EXTRA_QUERY = "query";

    private String query;

    @Override
    protected String screenTitle() {
        return "ShopKart";
    }

    @Override
    protected boolean showBack() {
        return false;
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        query = null;
    }

    @Override
    protected void render() {
        if (query == null) query = getIntent().getStringExtra(EXTRA_QUERY);

        LinearLayout searchRow = new LinearLayout(this);
        searchRow.setGravity(Gravity.CENTER_VERTICAL);
        EditText search = new EditText(this);
        search.setHint("Search for products");
        search.setContentDescription("Search for products");
        search.setSingleLine(true);
        search.setImeOptions(EditorInfo.IME_ACTION_SEARCH);
        search.setBackground(rounded(0xFFFFFFFF, 6));
        search.setPadding(dp(12), dp(10), dp(12), dp(10));
        if (query != null) search.setText(query);
        searchRow.addView(search, new LinearLayout.LayoutParams(0, -2, 1));
        TextView go = button("Search", BRAND);
        LinearLayout.LayoutParams goLp = new LinearLayout.LayoutParams(-2, -2);
        goLp.leftMargin = dp(8);
        searchRow.addView(go, goLp);
        content.addView(searchRow);

        Runnable runSearch = () -> {
            query = search.getText().toString();
            refresh();
        };
        go.setOnClickListener(v -> runSearch.run());
        search.setOnEditorActionListener((v, actionId, event) -> {
            if (actionId == EditorInfo.IME_ACTION_SEARCH
                || (event != null && event.getKeyCode() == KeyEvent.KEYCODE_ENTER)) {
                runSearch.run();
                return true;
            }
            return false;
        });

        List<Product> results = Catalog.search(query);
        String heading = (query == null || query.trim().isEmpty())
            ? "Top deals for you"
            : results.size() + (results.size() == 1 ? " result" : " results") + " for \"" + query.trim() + "\"";
        TextView h = text(heading, 17, TEXT, true);
        LinearLayout.LayoutParams headingLp = topMargin(16);
        headingLp.bottomMargin = dp(10);
        content.addView(h, headingLp);

        if (results.isEmpty()) {
            content.addView(text("No products match your search.", 15, MUTED, false), topMargin(12));
        }
        for (Product p : results) {
            content.addView(productRow(p));
        }
    }

    private LinearLayout productRow(Product p) {
        LinearLayout row = card();
        row.setOrientation(LinearLayout.HORIZONTAL);
        row.setGravity(Gravity.CENTER_VERTICAL);
        row.setContentDescription(p.name);
        row.addView(thumbnail(p, 72));

        LinearLayout info = new LinearLayout(this);
        info.setOrientation(LinearLayout.VERTICAL);
        info.setPadding(dp(14), 0, 0, 0);
        info.addView(text(p.name, 15, TEXT, true));
        info.addView(text("★ " + p.rating + "  ·  " + p.category, 13, MUTED, false));
        info.addView(text(Catalog.rupees(p.price) + "   " + p.discountPercent() + "% off", 16, TEXT, true));
        row.addView(info, new LinearLayout.LayoutParams(0, -2, 1));

        row.setOnClickListener(v -> startActivity(
            new Intent(this, ProductActivity.class).putExtra(ProductActivity.EXTRA_ID, p.id)));
        return row;
    }
}
