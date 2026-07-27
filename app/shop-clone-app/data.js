// Product catalog for the shop clone. Emojis stand in for product images so the
// app is fully self-contained (no external assets). Shared by the UI and the
// /api/shop/products route.
export const PRODUCTS = [
  // School
  { id: "sku_backpack", title: "Classic Rolling Backpack for School", price: 45.99, category: "school", emoji: "🎒", rating: 4.5, ratingCount: 1203, about: ["Durable water-resistant fabric", "Fits 15.6\" laptops", "Ergonomic padded straps"] },
  { id: "sku_notebook", title: "College-Ruled Notebook 5-Pack", price: 12.49, category: "school", emoji: "📓", rating: 4.7, ratingCount: 980, about: ["200 pages each", "Perforated sheets", "Assorted colors"] },
  { id: "sku_pencils", title: "Pre-Sharpened #2 Pencils (30 ct)", price: 6.99, category: "school", emoji: "✏️", rating: 4.8, ratingCount: 2210, about: ["Smooth graphite core", "Latex-free erasers", "Bulk classroom pack"] },
  { id: "sku_calculator", title: "Scientific Calculator 240 Functions", price: 18.0, category: "school", emoji: "🧮", rating: 4.6, ratingCount: 640, about: ["Exam approved", "Dual power", "Slide-on hard case"] },

  // Gaming
  { id: "sku_console", title: "NextGen Gaming Console 1TB", price: 499.99, category: "gaming", emoji: "🎮", rating: 4.9, ratingCount: 5400, about: ["4K 120fps", "Ultra-fast SSD", "Includes wireless controller"] },
  { id: "sku_headset", title: "Wireless Gaming Headset 7.1", price: 79.99, category: "gaming", emoji: "🎧", rating: 4.4, ratingCount: 3120, about: ["Surround sound", "20hr battery", "Noise-cancelling mic"] },
  { id: "sku_keyboard", title: "Mechanical RGB Gaming Keyboard", price: 64.99, category: "gaming", emoji: "⌨️", rating: 4.6, ratingCount: 1890, about: ["Hot-swappable switches", "Per-key RGB", "Aluminum frame"] },
  { id: "sku_mouse", title: "Ultralight Gaming Mouse 26K DPI", price: 39.99, category: "gaming", emoji: "🖱️", rating: 4.5, ratingCount: 1450, about: ["58g ultralight", "Optical switches", "Braided cable"] },

  // Toys
  { id: "sku_blocks", title: "Building Blocks Creative Set 500 pcs", price: 29.99, category: "toys", emoji: "🧱", rating: 4.8, ratingCount: 2760, about: ["Compatible bricks", "Storage box included", "Ages 4+"] },
  { id: "sku_teddy", title: "Giant Plush Teddy Bear", price: 34.5, category: "toys", emoji: "🧸", rating: 4.9, ratingCount: 4100, about: ["Super soft", "3 feet tall", "Machine washable"] },
  { id: "sku_puzzle", title: "1000-Piece Jigsaw Puzzle", price: 14.99, category: "toys", emoji: "🧩", rating: 4.7, ratingCount: 890, about: ["Premium cardboard", "Poster included", "Family fun"] },
  { id: "sku_car", title: "Remote Control Race Car", price: 42.0, category: "toys", emoji: "🏎️", rating: 4.3, ratingCount: 1120, about: ["2.4GHz control", "Rechargeable", "All-terrain tires"] },

  // Home & Kitchen
  { id: "sku_mug", title: "Handcrafted Stoneware Mug", price: 24.0, category: "home", emoji: "☕", rating: 4.6, ratingCount: 730, about: ["12oz capacity", "Microwave safe", "Reactive glaze"] },
  { id: "sku_lamp", title: "Modern LED Desk Lamp", price: 27.99, category: "home", emoji: "💡", rating: 4.5, ratingCount: 1340, about: ["Adjustable brightness", "USB charging port", "Touch control"] },
  { id: "sku_blender", title: "High-Speed Countertop Blender", price: 59.99, category: "home", emoji: "🥤", rating: 4.4, ratingCount: 2050, about: ["1200W motor", "6 blades", "Dishwasher safe jar"] },
  { id: "sku_pan", title: "Non-Stick Frying Pan 12\"", price: 32.49, category: "home", emoji: "🍳", rating: 4.7, ratingCount: 3300, about: ["PFOA-free coating", "Oven safe", "Stay-cool handle"] },

  // Fashion
  { id: "sku_sneakers", title: "Everyday Running Sneakers", price: 68.0, category: "fashion", emoji: "👟", rating: 4.5, ratingCount: 2600, about: ["Breathable mesh", "Cushioned sole", "Unisex sizing"] },
  { id: "sku_watch", title: "Minimalist Analog Watch", price: 89.99, category: "fashion", emoji: "⌚", rating: 4.6, ratingCount: 1780, about: ["Genuine leather strap", "Water resistant", "Japanese movement"] },
  { id: "sku_sunglasses", title: "Polarized Aviator Sunglasses", price: 21.99, category: "fashion", emoji: "🕶️", rating: 4.3, ratingCount: 940, about: ["UV400 protection", "Metal frame", "Case included"] },
  { id: "sku_bag", title: "Canvas Tote Shoulder Bag", price: 18.5, category: "fashion", emoji: "👜", rating: 4.4, ratingCount: 610, about: ["Roomy interior", "Reinforced straps", "Eco cotton"] },

  // Beauty
  { id: "sku_serum", title: "Vitamin C Brightening Serum", price: 16.99, category: "beauty", emoji: "🧴", rating: 4.5, ratingCount: 5200, about: ["Hyaluronic acid", "Cruelty-free", "For all skin types"] },
  { id: "sku_lipstick", title: "Matte Liquid Lipstick Set", price: 22.0, category: "beauty", emoji: "💄", rating: 4.6, ratingCount: 3400, about: ["Long-wearing", "6 shades", "Non-drying formula"] },
  { id: "sku_perfume", title: "Eau de Parfum Signature 50ml", price: 48.0, category: "beauty", emoji: "🌸", rating: 4.7, ratingCount: 1290, about: ["Floral notes", "Long lasting", "Elegant bottle"] },
  { id: "sku_brush", title: "Pro Makeup Brush Kit (12 pc)", price: 19.99, category: "beauty", emoji: "🖌️", rating: 4.4, ratingCount: 870, about: ["Synthetic bristles", "Travel pouch", "Soft blend"] },

  // Computers
  { id: "sku_ssd", title: "1TB Portable SSD USB-C", price: 92.99, category: "computers", emoji: "💾", rating: 4.8, ratingCount: 4600, about: ["1050MB/s reads", "Shock resistant", "Pocket sized"] },
  { id: "sku_monitor", title: '27" 144Hz Gaming Monitor', price: 219.0, category: "computers", emoji: "🖥️", rating: 4.6, ratingCount: 2100, about: ["1ms response", "QHD resolution", "HDR support"] },
  { id: "sku_webcam", title: "1080p Streaming Webcam", price: 44.99, category: "computers", emoji: "📷", rating: 4.3, ratingCount: 1560, about: ["Auto light correction", "Built-in mic", "Clip mount"] },
  { id: "sku_hub", title: "7-in-1 USB-C Hub", price: 29.99, category: "computers", emoji: "🔌", rating: 4.5, ratingCount: 1980, about: ["4K HDMI", "SD card reader", "100W passthrough"] },

  // Travel / Fitness
  { id: "sku_suitcase", title: "Hardshell Carry-On Suitcase", price: 79.0, category: "travel", emoji: "🧳", rating: 4.6, ratingCount: 1420, about: ["Spinner wheels", "TSA lock", "Expandable"] },
  { id: "sku_bottle", title: "Insulated Water Bottle 32oz", price: 24.99, category: "fitness", emoji: "🚰", rating: 4.7, ratingCount: 3900, about: ["24hr cold", "Leakproof", "BPA free"] },
  { id: "sku_dumbbell", title: "Adjustable Dumbbell 25lb", price: 129.0, category: "fitness", emoji: "🏋️", rating: 4.5, ratingCount: 880, about: ["Quick-select weight", "Space saving", "Durable grip"] },
  { id: "sku_mat", title: "Non-Slip Yoga Mat", price: 27.5, category: "fitness", emoji: "🧘", rating: 4.6, ratingCount: 2400, about: ["6mm thick", "Eco TPE", "Carry strap"] },
];

export function byCategory(cat, n = 4) {
  return PRODUCTS.filter((p) => p.category === cat).slice(0, n);
}

// Grid cards (4-item and single-item promos) — mirror the provided layout.
export const GRID_CARDS = [
  { title: "Back to school essentials", link: "Shop school supplies", category: "school" },
  { title: "Get your game on", link: "Shop Gaming", category: "gaming", single: true },
  { title: "Shop activity toys", link: "Explore toys", category: "toys" },
  { title: "New home arrivals under $50", link: "Shop home arrivals", category: "home" },
  { title: "Kitchen appliances", link: "Explore kitchen", category: "home", single: true },
  { title: "Fashion brands you like", link: "Shop fashion", category: "fashion" },
  { title: "Level up your beauty routine", link: "Shop beauty", category: "beauty" },
  { title: "Wireless Tech", link: "Explore wireless", category: "computers" },
];

// Horizontal sliders (best-sellers style).
export const SLIDERS = [
  { title: "Best Sellers in Home & Kitchen", link: "See more", category: "home" },
  { title: "Best Sellers in Computers & Accessories", link: "Shop now", category: "computers" },
  { title: "Best Sellers in Beauty & Personal Care", link: "See details", category: "beauty" },
  { title: "Best Sellers in Toys & Games", link: "Shop toys", category: "toys" },
];
