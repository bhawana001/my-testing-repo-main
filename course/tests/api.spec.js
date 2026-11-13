// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("ShopKart API", () => {
  test("GET /api/shop/products returns a non-empty product list", async ({ request }) => {
    const res = await request.get("/api/shop/products");
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);
    expect(body.count).toBe(body.products.length);
    expect(body.products[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        price: expect.any(Number),
        category: expect.any(String),
        inStock: true,
      })
    );
  });

  test("GET /api/shop/health returns 200", async ({ request }) => {
    const res = await request.get("/api/shop/health");
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toEqual(expect.objectContaining({ status: "ok", service: "shopkart" }));
  });
});

test.describe("ShopKart UI + API", () => {
  // The cart route only handles POST (GET returns 405) and keeps no server-side cart,
  // so the API side is checked on the POST the UI sends when adding to cart.
  test("adding a product in the UI posts it to /api/shop/cart", async ({ page }) => {
    await page.goto("/shop-clone-app");

    // Product cards have no role, so scope to the card by its title.
    const card = page.locator(".product-slider-card").filter({ hasText: "Handcrafted Stoneware Mug" }).first();
    const cartResponse = page.waitForResponse(
      (r) => r.url().endsWith("/api/shop/cart") && r.request().method() === "POST"
    );
    await card.getByRole("button", { name: "Add to Cart" }).click();
    const res = await cartResponse;

    expect(res.status()).toBe(201);
    expect(res.request().postDataJSON()).toEqual({ productId: "sku_mug", qty: 1 });
    const body = await res.json();
    expect(body.item).toEqual(
      expect.objectContaining({ id: "sku_mug", title: "Handcrafted Stoneware Mug", qty: 1 })
    );
    expect(body.lineTotal).toBe(24);

    await expect(page.getByRole("button", { name: "Cart, 1 items" })).toBeVisible();
  });
});
