import Foundation

/// Cart persisted in UserDefaults so it survives app restarts. Keeps insertion order.
final class Cart: ObservableObject {
    struct Line: Codable, Equatable {
        let id: String
        var qty: Int
    }

    private static let key = "cart.lines"

    @Published private(set) var lines: [Line] {
        didSet { UserDefaults.standard.set(try? JSONEncoder().encode(lines), forKey: Cart.key) }
    }

    init() {
        let data = UserDefaults.standard.data(forKey: Cart.key)
        let saved = data.flatMap { try? JSONDecoder().decode([Line].self, from: $0) } ?? []
        lines = saved.filter { Catalog.find($0.id) != nil }
    }

    var count: Int { lines.reduce(0) { $0 + $1.qty } }

    var total: Int { lines.reduce(0) { $0 + (Catalog.find($1.id)?.price ?? 0) * $1.qty } }

    func qty(of id: String) -> Int { lines.first { $0.id == id }?.qty ?? 0 }

    func add(_ id: String, qty: Int = 1) {
        setQty(id, self.qty(of: id) + qty)
    }

    func setQty(_ id: String, _ qty: Int) {
        if let i = lines.firstIndex(where: { $0.id == id }) {
            if qty <= 0 { lines.remove(at: i) } else { lines[i].qty = qty }
        } else if qty > 0 {
            lines.append(Line(id: id, qty: qty))
        }
    }

    func clear() { lines = [] }
}
