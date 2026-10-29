package com.shopkart.demo;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Insets;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.os.Build;
import android.os.Bundle;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.WindowInsets;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;

/** Shared header (title, back, cart badge) and view helpers for every screen. */
abstract class ShopActivity extends Activity {
    static final int BRAND = 0xFF2874F0;
    static final int ACCENT = 0xFFFB641B;
    static final int TEXT = 0xFF212121;
    static final int MUTED = 0xFF757575;
    static final int DIVIDER = 0xFFEEEEEE;

    protected Cart cart;
    protected LinearLayout content;
    private TextView badge;

    protected abstract String screenTitle();

    protected abstract boolean showBack();

    /** Rebuilds {@link #content}; called on every resume so cart changes show up. */
    protected abstract void render();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        cart = new Cart(this);

        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setBackgroundColor(BRAND);
        root.addView(header());

        ScrollView scroll = new ScrollView(this);
        scroll.setBackgroundColor(0xFFF1F3F6);
        content = new LinearLayout(this);
        content.setOrientation(LinearLayout.VERTICAL);
        content.setPadding(dp(12), dp(12), dp(12), dp(24));
        scroll.addView(content);
        root.addView(scroll, new LinearLayout.LayoutParams(-1, 0, 1));

        // targetSdk 35 draws edge to edge, so keep content clear of the status and nav bars.
        root.setOnApplyWindowInsetsListener((v, insets) -> {
            if (Build.VERSION.SDK_INT >= 30) {
                Insets bars = insets.getInsets(WindowInsets.Type.systemBars() | WindowInsets.Type.ime());
                v.setPadding(bars.left, bars.top, bars.right, bars.bottom);
            } else {
                v.setPadding(insets.getSystemWindowInsetLeft(), insets.getSystemWindowInsetTop(),
                    insets.getSystemWindowInsetRight(), insets.getSystemWindowInsetBottom());
            }
            return insets;
        });
        setContentView(root);
    }

    @Override
    protected void onResume() {
        super.onResume();
        refresh();
    }

    /** Re-reads the cart and redraws the screen. */
    protected void refresh() {
        int count = cart.count();
        badge.setText(String.valueOf(count));
        badge.setVisibility(count > 0 ? View.VISIBLE : View.GONE);
        badge.setContentDescription("Cart count " + count);
        content.removeAllViews();
        render();
    }

    private View header() {
        LinearLayout bar = new LinearLayout(this);
        bar.setGravity(Gravity.CENTER_VERTICAL);
        bar.setPadding(dp(8), dp(10), dp(12), dp(10));

        if (showBack()) {
            TextView back = text("←", 22, Color.WHITE, false);
            back.setPadding(dp(8), 0, dp(12), 0);
            back.setContentDescription("Back");
            back.setOnClickListener(v -> finish());
            bar.addView(back);
        }

        TextView title = text(screenTitle(), 20, Color.WHITE, true);
        title.setPadding(showBack() ? 0 : dp(8), 0, 0, 0);
        bar.addView(title, new LinearLayout.LayoutParams(0, -2, 1));

        FrameLayout cartButton = new FrameLayout(this);
        cartButton.setContentDescription("Cart");
        TextView cartIcon = text("🛒", 22, Color.WHITE, false);
        cartIcon.setPadding(dp(6), dp(4), dp(10), dp(4));
        cartButton.addView(cartIcon);
        badge = text("0", 11, Color.WHITE, true);
        badge.setGravity(Gravity.CENTER);
        badge.setMinWidth(dp(18));
        badge.setBackground(rounded(ACCENT, 9));
        cartButton.addView(badge, new FrameLayout.LayoutParams(-2, dp(18), Gravity.TOP | Gravity.END));
        cartButton.setOnClickListener(v -> {
            if (!(this instanceof CartActivity)) startActivity(new Intent(this, CartActivity.class));
        });
        bar.addView(cartButton);
        return bar;
    }

    // ---- view helpers ----

    int dp(int value) {
        return Math.round(TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, value, getResources().getDisplayMetrics()));
    }

    TextView text(String s, int sp, int color, boolean bold) {
        TextView t = new TextView(this);
        t.setText(s);
        t.setTextSize(sp);
        t.setTextColor(color);
        if (bold) t.setTypeface(Typeface.DEFAULT_BOLD);
        return t;
    }

    Button button(String label, int color) {
        Button b = new Button(this);
        b.setText(label);
        b.setAllCaps(false);
        b.setTextColor(Color.WHITE);
        b.setTextSize(16);
        b.setTypeface(Typeface.DEFAULT_BOLD);
        b.setBackground(rounded(color, 6));
        b.setContentDescription(label);
        return b;
    }

    LinearLayout card() {
        LinearLayout c = new LinearLayout(this);
        c.setOrientation(LinearLayout.VERTICAL);
        c.setBackground(rounded(Color.WHITE, 8));
        c.setPadding(dp(14), dp(14), dp(14), dp(14));
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(-1, -2);
        lp.bottomMargin = dp(10);
        c.setLayoutParams(lp);
        return c;
    }

    /** Coloured square with the product's initials, standing in for a photo. */
    TextView thumbnail(Product p, int sizeDp) {
        String[] words = p.name.split(" ");
        String initials = words[0].substring(0, 1) + (words.length > 1 ? words[1].substring(0, 1) : "");
        TextView t = text(initials, sizeDp / 3, Color.WHITE, true);
        t.setGravity(Gravity.CENTER);
        t.setBackground(rounded(p.color, 8));
        t.setLayoutParams(new LinearLayout.LayoutParams(dp(sizeDp), dp(sizeDp)));
        return t;
    }

    GradientDrawable rounded(int color, int radiusDp) {
        GradientDrawable d = new GradientDrawable();
        d.setColor(color);
        d.setCornerRadius(dp(radiusDp));
        return d;
    }

    LinearLayout.LayoutParams topMargin(int dp) {
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(-1, -2);
        lp.topMargin = dp(dp);
        return lp;
    }
}
