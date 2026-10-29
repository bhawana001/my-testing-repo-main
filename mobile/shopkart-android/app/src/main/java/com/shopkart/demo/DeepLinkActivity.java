package com.shopkart.demo;

import android.app.Activity;
import android.app.TaskStackBuilder;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

/** Invisible trampoline: routes the link, puts Home underneath so Back works, then exits. */
public class DeepLinkActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent target = DeepLinks.resolve(this, getIntent().getData());
        TaskStackBuilder stack = TaskStackBuilder.create(this);
        if (target == null) {
            Toast.makeText(this, "Link not recognised: " + getIntent().getData(), Toast.LENGTH_LONG).show();
            stack.addNextIntent(new Intent(this, HomeActivity.class));
        } else {
            if (!HomeActivity.class.getName().equals(target.getComponent().getClassName())) {
                stack.addNextIntent(new Intent(this, HomeActivity.class));
            }
            stack.addNextIntent(target);
        }
        stack.startActivities();
        finish();
    }
}
