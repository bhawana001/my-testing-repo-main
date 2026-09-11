The ShopKart checkout in this repo failed its browser check. Below is the raw
kane-cli output from the failing run.

Fix the product code so the check passes on the next run.

Rules — a loop chasing green will cheat, so these are hard limits:

1. Do NOT edit the objective, the assertions, or anything under `demo/loop/`.
2. Do NOT mock, stub, intercept, or fake `/api/shop/pay` or `/api/shop/orders`.
3. Do NOT hardcode a charge ID, an order ID, or a success screen. The
   confirmation must render from the real response body the payment API
   returned.
4. Do NOT weaken or delete the decline path — card 4000 0000 0000 0002 must
   still be refused with a visible error and no success screen.
5. Change only `app/shop-clone-app/` and `app/api/shop/` source files.

Report the root cause in one sentence, then make the smallest change that fixes it.

--- kane-cli output ---
