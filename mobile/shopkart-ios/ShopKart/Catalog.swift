import SwiftUI

struct Product: Identifiable, Hashable {
    let id: String
    let name: String
    let category: String
    let price: Int
    let mrp: Int
    let rating: Double
    let color: Color
    let description: String

    var discountPercent: Int { Int((Double(mrp - price) * 100 / Double(mrp)).rounded()) }

    var initials: String {
        name.split(separator: " ").prefix(2).compactMap { $0.first }.map(String.init).joined()
    }
}

/// Fixed product list so test runs always see the same data. Matches the Android app.
enum Catalog {
    static let products: [Product] = [
        Product(id: "p101", name: "Aurora Wireless Headphones", category: "Electronics", price: 2499, mrp: 4999, rating: 4.3,
                color: Color(hex: 0x3F51B5), description: "Over-ear Bluetooth headphones with 30-hour battery and active noise cancellation."),
        Product(id: "p102", name: "Pulse Smartwatch S2", category: "Electronics", price: 3999, mrp: 6999, rating: 4.1,
                color: Color(hex: 0x00897B), description: "1.8\" AMOLED display, heart-rate tracking, and 7-day battery life."),
        Product(id: "p103", name: "Stride Running Shoes", category: "Fashion", price: 1799, mrp: 2999, rating: 4.4,
                color: Color(hex: 0xE53935), description: "Lightweight mesh running shoes with cushioned sole. Available in sizes 6-11."),
        Product(id: "p104", name: "Classic Denim Jacket", category: "Fashion", price: 1499, mrp: 2499, rating: 4.0,
                color: Color(hex: 0x1E88E5), description: "Stonewashed cotton denim jacket with a relaxed fit."),
        Product(id: "p105", name: "BrewMaster Coffee Maker", category: "Home", price: 3299, mrp: 4599, rating: 4.2,
                color: Color(hex: 0x6D4C41), description: "12-cup drip coffee maker with programmable timer and keep-warm plate."),
        Product(id: "p106", name: "Nimbus Cotton Bedsheet", category: "Home", price: 899, mrp: 1599, rating: 4.5,
                color: Color(hex: 0x8E24AA), description: "King-size 100% cotton bedsheet with two pillow covers."),
        Product(id: "p107", name: "PowerCell 20000mAh Power Bank", category: "Electronics", price: 1299, mrp: 2199, rating: 4.3,
                color: Color(hex: 0x43A047), description: "Fast-charging power bank with USB-C in/out and two USB-A ports."),
        Product(id: "p108", name: "Trail Backpack 30L", category: "Fashion", price: 1199, mrp: 1999, rating: 4.2,
                color: Color(hex: 0xF4511E), description: "Water-resistant 30L backpack with padded laptop sleeve."),
    ]

    static func find(_ id: String) -> Product? {
        products.first { $0.id.caseInsensitiveCompare(id) == .orderedSame }
    }

    static func search(_ query: String) -> [Product] {
        let q = query.trimmingCharacters(in: .whitespaces).lowercased()
        if q.isEmpty { return products }
        return products.filter { $0.name.lowercased().contains(q) || $0.category.lowercased().contains(q) }
    }

    static func rupees(_ amount: Int) -> String {
        let f = NumberFormatter()
        f.numberStyle = .decimal
        f.locale = Locale(identifier: "en_US")
        return "\u{20B9}" + (f.string(from: NSNumber(value: amount)) ?? "\(amount)")
    }
}

extension Color {
    static let brand = Color(hex: 0x2874F0)
    static let accent = Color(hex: 0xFB641B)
    static let page = Color(hex: 0xF1F3F6)

    init(hex: UInt32) {
        self.init(red: Double((hex >> 16) & 0xFF) / 255, green: Double((hex >> 8) & 0xFF) / 255, blue: Double(hex & 0xFF) / 255)
    }
}
