// Fixed product catalog used by the e-commerce skins.
export const PRODUCTS = [
  { id: "p-earbuds-1", name: "AuraBuds Pro Wireless Earbuds", brand: "Aura", category: "Audio", price: 129.0, rating: 4.6, reviews: 12840, keywords: ["wireless", "earbuds", "audio"], variants: { color: ["Black", "White", "Navy"] } },
  { id: "p-earbuds-2", name: "SoundCore Lite Earbuds", brand: "SoundCore", category: "Audio", price: 49.99, rating: 4.3, reviews: 8123, keywords: ["wireless", "earbuds"], variants: { color: ["Black", "Teal"] } },
  { id: "p-earbuds-3", name: "Aura Studio Earbuds", brand: "Aura", category: "Audio", price: 79.0, rating: 4.4, reviews: 3210, keywords: ["wireless", "earbuds"], variants: { color: ["Graphite"] } },
  { id: "p-earbuds-4", name: "Bassline Sport Earbuds", brand: "Bassline", category: "Audio", price: 199.0, rating: 4.7, reviews: 990, keywords: ["wireless", "earbuds", "sport"], variants: { color: ["Red", "Black"] } },
  { id: "p-tee-1", name: "Everyday Cotton Tee", brand: "Basics", category: "Apparel", price: 18.0, rating: 4.5, reviews: 5401, keywords: ["tee", "shirt"], variants: { size: ["S", "M", "L", "XL"], color: ["Black", "White", "Olive"] }, priceBySize: { XL: 20.0 } },
  { id: "p-shoe-1", name: "Stride Runner 3", brand: "Stride", category: "Footwear", price: 89.0, rating: 4.4, reviews: 2210, keywords: ["running", "shoes"], variants: { size: ["7", "8", "9", "10", "11"], color: ["Black", "White"] } },
  { id: "p-shoe-2", name: "Velocity Racer", brand: "Velocity", category: "Footwear", price: 139.0, rating: 4.6, reviews: 1430, keywords: ["running", "shoes"], variants: { size: ["8", "9", "10"], color: ["Blue"] } },
  { id: "p-shoe-3", name: "TrailMax Grip", brand: "Stride", category: "Footwear", price: 59.0, rating: 4.1, reviews: 780, keywords: ["running", "shoes", "trail"], variants: { size: ["7", "8", "9"], color: ["Green"] } },
  { id: "p-phone-1", name: "Nova X2 Smartphone 128GB", brand: "Nova", category: "Phones", price: 24999, currency: "INR", rating: 4.5, reviews: 41200, keywords: ["phone", "smartphone"], exchange: { eligible: true, maxValue: 6500 } },
  { id: "p-mug-1", name: "Custom Name Ceramic Mug", brand: "ClayWorks", category: "Home", price: 22.0, rating: 4.8, reviews: 320, keywords: ["mug", "personalized"], personalization: true, shop: "ClayWorks Studio" },
  { id: "p-print-1", name: "Botanical Art Print A3", brand: "Fernhouse", category: "Art", price: 35.0, rating: 4.9, reviews: 110, keywords: ["print", "art"], shop: "Fernhouse Prints" },
  { id: "p-milk-1", name: "Organic Whole Milk 1L", brand: "Dairyland", category: "Grocery", price: 3.49, rating: 4.7, reviews: 900, keywords: ["milk", "grocery"] },
  { id: "p-banana-1", name: "Bananas (bunch)", brand: "Fresh", category: "Grocery", price: 1.29, rating: 4.5, reviews: 2100, keywords: ["banana", "grocery"] },
  { id: "p-bread-1", name: "Sourdough Loaf", brand: "Bakehouse", category: "Grocery", price: 4.99, rating: 4.8, reviews: 640, keywords: ["bread", "grocery"] },
  { id: "p-tv-1", name: "Vista 55\" 4K TV", brand: "Vista", category: "Electronics", price: 449.0, rating: 4.4, reviews: 3120, keywords: ["tv", "4k"] },
];
export function findProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}
export function searchProducts(q, { brand, minPrice, maxPrice, size } = {}) {
  const terms = String(q || "").toLowerCase().split(/\s+/).filter(Boolean);
  return PRODUCTS.filter((p) => {
    const hay = (p.name + " " + p.keywords.join(" ") + " " + p.category + " " + p.brand).toLowerCase();
    if (terms.length && !terms.every((t) => hay.includes(t))) return false;
    if (brand && p.brand !== brand) return false;
    if (minPrice != null && p.price < minPrice) return false;
    if (maxPrice != null && p.price > maxPrice) return false;
    if (size && !(p.variants?.size || []).includes(size)) return false;
    return true;
  });
}
